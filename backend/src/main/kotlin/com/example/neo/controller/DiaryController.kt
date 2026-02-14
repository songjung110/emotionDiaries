package com.example.neo.controller

import com.example.neo.dto.DiaryDto
import com.example.neo.dto.DiaryRequest
import com.example.neo.dto.MessageDto
import com.example.neo.dto.MessageRequest
import com.example.neo.dto.UserRequest
import com.example.neo.service.DiaryMessageService
import com.example.neo.service.DiaryService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux

@RestController
@RequestMapping("/diary")
class DiaryController(
    private val diaryService: DiaryService,
    private val diaryMessageService: DiaryMessageService
) {

    @PostMapping
    fun createDiary(
        @RequestBody diaryRequest: DiaryRequest
    ): DiaryDto {
        val response = diaryService.createDiary(diaryRequest)
        return response
    }

    @GetMapping("/{username}")
    fun getDiaries(
        @PathVariable username: String
    ): List<DiaryDto> {
        val response = diaryService.getDiaries(username)
        return response
    }

    @PostMapping(
        "/ai",
        produces = [MediaType.TEXT_EVENT_STREAM_VALUE]
    )
    fun createMessage(
        @RequestBody messageRequest: MessageRequest
    ): Flux<String> {
        val response = diaryMessageService.createMessage(messageRequest)
        return response
    }

    @GetMapping("/ai/{diaryId}")
    fun getDiaryMessages(
        @PathVariable diaryId: Long
    ): List<MessageDto>{
        val response = diaryMessageService.getMessages(diaryId)
        return response
    }
}