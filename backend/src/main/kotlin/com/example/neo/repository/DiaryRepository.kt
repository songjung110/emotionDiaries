package com.example.neo.repository

import com.example.neo.entity.DiaryEntity
import org.springframework.data.repository.CrudRepository


interface DiaryRepository : CrudRepository<DiaryEntity, Long> {
    fun findDiaryEntityByUsername(username: String): List<DiaryEntity>

}