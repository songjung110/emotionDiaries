package com.example.neo.service

import com.example.neo.dto.MessageRequest
import com.example.neo.entity.DiaryMessageEntity
import com.example.neo.repository.DiaryMessageRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux

@Service
class DiaryMessageService(
    private val diaryAiService: DiaryAiService
) {

    fun createMessage(messageRequest: MessageRequest): Flux<String>{

        return diaryAiService.chatStream(messageRequest)

    }
}