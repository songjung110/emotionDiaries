package com.example.neo.service

import com.example.neo.dto.MessageRequest
import com.example.neo.entity.DiaryMessageEntity
import com.example.neo.repository.DiaryMessageRepository
import org.springframework.ai.chat.model.ChatModel
import org.springframework.stereotype.Service

import org.springframework.ai.chat.messages.AssistantMessage
import org.springframework.ai.chat.messages.Message
import org.springframework.ai.chat.messages.UserMessage
import org.springframework.ai.chat.prompt.Prompt
import org.springframework.ai.content.Media
import org.springframework.ai.openai.OpenAiChatModel
import org.springframework.util.MimeTypeUtils
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import reactor.core.scheduler.Schedulers
import java.util.Base64
import org.springframework.core.io.ByteArrayResource

@Service
class DiaryAiService(
    private val openAiChatModel: OpenAiChatModel,
    private val diaryMessageRepository: DiaryMessageRepository
) {

    companion object {
        const val DIARY_SYSTEM_PROMPT = """
        너는 감정 일기 AI야.
        사용자가 그린 그림을 바탕으로 사용자의 감정을 공감해주고,
        이해해주며, 오늘 하루를 추측해서 부드럽게 대화를 이어가.
        
        규칙:
        - 판단하지 않는다
        - 감정을 부정하지 않는다
        - 친구처럼 말한다
        - 너무 길지 않게 응답한다
        """
    }

    fun chatStream(req: MessageRequest): Flux<String> {

        return Mono.fromCallable {
            diaryMessageRepository.findByDiaryIdOrderByIdAsc(req.diaryId)
        }
            .subscribeOn(Schedulers.boundedElastic())
            .flatMapMany { history ->

                val messages = mutableListOf<Message>()

                history
                    .takeLast(10)
                    .forEach {
                        if (it.username == "AI") {
                            messages.add(AssistantMessage(it.message))
                        } else {
                            messages.add(UserMessage(it.message))
                        }
                    }

                if (req.type == "IMG") {

                    val imageBytes = Base64.getDecoder().decode(req.message)

                    val imageResource = ByteArrayResource(imageBytes)

                    messages.add(
                        UserMessage.builder()
                            .text(DIARY_SYSTEM_PROMPT)
                            .media(
                                listOf(
                                    Media(
                                        MimeTypeUtils.IMAGE_PNG,
                                        imageResource
                                    )
                                )
                            )
                            .build()
                    )
                }
                else {
                    messages.add(UserMessage(req.message))
                }

                Mono.fromCallable {
                    diaryMessageRepository.save(DiaryMessageEntity(req))
                }
                    .subscribeOn(Schedulers.boundedElastic())
                    .subscribe()

                val prompt = Prompt(messages)
                val aiBuffer = StringBuilder()

                openAiChatModel
                    .stream(prompt)
                    .mapNotNull { response ->
                        response.result.output.text
                    }
                    .doOnNext { chunk ->
                        aiBuffer.append(chunk)
                    }
                    .doOnComplete {
                        Mono.fromCallable {
                            diaryMessageRepository.save(
                                DiaryMessageEntity(
                                    diaryId = req.diaryId,
                                    type = "MSG",
                                    username = "AI",
                                    message = aiBuffer.toString()
                                )
                            )
                        }
                            .subscribeOn(Schedulers.boundedElastic())
                            .subscribe()
                    }
                    .share()
            }
    }
}