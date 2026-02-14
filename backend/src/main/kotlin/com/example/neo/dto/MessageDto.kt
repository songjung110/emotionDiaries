package com.example.neo.dto

import com.example.neo.entity.DiaryMessageEntity

data class MessageDto(
    val id: Long?,
    val diaryId: Long,
    val type: String,
    val username: String,
    val message: String,
) {
    constructor(diaryMessageEntity: DiaryMessageEntity) : this(
        id = diaryMessageEntity.id!!,
        diaryId = diaryMessageEntity.diaryId,
        type = diaryMessageEntity.type,
        username = diaryMessageEntity.username,
        message = diaryMessageEntity.message
    )
}