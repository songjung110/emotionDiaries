package com.example.neo.repository

import com.example.neo.entity.DiaryMessageEntity
import org.springframework.data.repository.CrudRepository

interface DiaryMessageRepository : CrudRepository<DiaryMessageEntity,Long> {
    fun findByDiaryIdOrderByIdAsc(diaryId: Long): MutableList<DiaryMessageEntity>
}