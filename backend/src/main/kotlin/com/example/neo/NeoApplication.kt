package com.example.neo

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class NeoApplication

fun main(args: Array<String>) {
	runApplication<NeoApplication>(*args)
}
