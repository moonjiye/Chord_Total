package com.projectBackend.project.controller;

import com.projectBackend.project.jwt.TokenProvider;
import com.projectBackend.project.service.AuthService;
import io.jsonwebtoken.Claims;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@Setter
@Getter
@ToString
@RequiredArgsConstructor
@RequestMapping("/test")
public class TestController {
    private final TokenProvider tokenProvider;

    // 이메일 테스트
    @GetMapping("/test/{accessToken}")
    public ResponseEntity<String> test (@PathVariable String accessToken) {
        return ResponseEntity.ok(tokenProvider.getUserEmail(accessToken));
    }
}
