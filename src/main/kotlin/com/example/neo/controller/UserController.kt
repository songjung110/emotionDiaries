package com.example.neo.controller

import com.example.neo.dto.UserRequest
import com.example.neo.dto.UserResponse
import com.example.neo.repository.UserRepository
import com.example.neo.service.UserService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/user")
class UserController(
    private val userService: UserService
) {

    @PostMapping
    fun checkUsername(
        @RequestBody request: UserRequest
    ): UserResponse {
        val response = userService.checkUsername(request)
        return response
    }
}