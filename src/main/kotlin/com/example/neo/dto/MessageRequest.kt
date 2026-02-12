package com.example.neo.dto

data class MessageRequest(
    val diaryId: Long,
    val type: String, // IMG(그럼), MSG(메시지)
    val username: String,
    val message: String,
)