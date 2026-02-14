package com.example.neo.entity

import com.example.neo.dto.MessageRequest
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id

@Entity
class DiaryMessageEntity(

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id:Long? = null,

    val diaryId: Long,

    val type: String,

    val username: String,

    @Column(columnDefinition = "TEXT")
    val message: String,

) {
    constructor(messageRequest: MessageRequest) : this(
        diaryId = messageRequest.diaryId,
        type = messageRequest.type,
        username = messageRequest.username,
        message = messageRequest.message,
    )
}