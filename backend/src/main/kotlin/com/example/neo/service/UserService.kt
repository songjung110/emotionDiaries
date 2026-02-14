package com.example.neo.service

import com.example.neo.dto.UserRequest
import com.example.neo.dto.UserResponse
import com.example.neo.entity.UserEntity
import com.example.neo.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class UserService(
    private val userRepository: UserRepository
) {
    fun checkUsername(request: UserRequest): UserResponse {
        val result = userRepository.existsUserEntityByUsername(request.username)
        if(!result) { userRepository.save(UserEntity(username = request.username)) }
        return UserResponse(status = result)
    }
}