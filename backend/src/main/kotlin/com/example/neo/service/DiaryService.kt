package com.example.neo.service

import com.example.neo.dto.DiaryDto
import com.example.neo.dto.DiaryRequest
import com.example.neo.dto.UserRequest
import com.example.neo.entity.DiaryEntity
import com.example.neo.repository.DiaryRepository
import org.springframework.stereotype.Service

@Service
class DiaryService(
    private val diaryRepository: DiaryRepository
) {

    fun createDiary(diaryRequest: DiaryRequest): DiaryDto {

        val diaryEntity = diaryRepository.save(DiaryEntity(diaryRequest))
        return DiaryDto(diaryEntity)

    }

    fun getDiaries(username: String): List<DiaryDto> {
        val diaryEntities  = diaryRepository.findDiaryEntityByUsername(username)
        return diaryEntities.map { DiaryDto(diaryEntity = it) }
    }
}