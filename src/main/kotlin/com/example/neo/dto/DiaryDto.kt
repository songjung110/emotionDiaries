package com.example.neo.dto

import com.example.neo.entity.DiaryEntity
import java.time.LocalDate

data class DiaryDto (
    val id: Long? = null,
    val date: LocalDate,
    val username: String = "",
) {
    constructor(diaryEntity: DiaryEntity) : this(
        id = diaryEntity.id,
        date = diaryEntity.date,
        username =  diaryEntity.username,
    )
}