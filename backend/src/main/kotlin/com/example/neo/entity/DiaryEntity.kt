package com.example.neo.entity

import com.example.neo.dto.DiaryRequest
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.GenerationType
import java.time.LocalDate

@Entity
class DiaryEntity (

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false)
    val date: LocalDate,

    @Column(nullable = false)
    val username: String,

) {
    constructor(diaryRequest: DiaryRequest) : this(

        date = diaryRequest.date,
        username = diaryRequest.username

    )
}