package com.example.neo.repository

import com.example.neo.entity.UserEntity
import org.springframework.data.repository.CrudRepository


interface UserRepository : CrudRepository<UserEntity, Long> {
    fun existsUserEntityByUsername(username: String): Boolean
}