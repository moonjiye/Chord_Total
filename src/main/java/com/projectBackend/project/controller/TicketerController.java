package com.projectBackend.project.controller;

import com.projectBackend.project.dto.PerformanceDto;
import com.projectBackend.project.dto.TicketerDto;
import com.projectBackend.project.entity.Member;
import com.projectBackend.project.jwt.TokenProvider;
import com.projectBackend.project.service.AuthService;
import com.projectBackend.project.service.TicketerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/ticketer")
@RequiredArgsConstructor
public class TicketerController {
    private final TicketerService ticketerService;
    private final TokenProvider tokenProvider;
    private final AuthService authService;



    //전체티켓터 조회
    @GetMapping("/list")
    public ResponseEntity<List<TicketerDto>> ticketerList() {
        System.out.println("컨트롤러 ticketerList");
        List<TicketerDto> list = ticketerService.getTicketerList();
        System.out.println("컨트롤러 ticketerList : " + list);
        return ResponseEntity.ok(list);
    }
    //특정티켓터 조회
    @GetMapping("/list/{performanceId}")
    public ResponseEntity<List<TicketerDto>> ticketerListByPerformanceId(@PathVariable Long performanceId) {
        System.out.println("컨트롤러 ticketerListByPerformanceId");
        List<TicketerDto> list = ticketerService.getTicketerListByPerformanceId(performanceId);
        return ResponseEntity.ok(list);
    }
    //티켓터 등록
    @PostMapping("/new")
    public ResponseEntity<Boolean> newTicketer(@RequestBody TicketerDto ticketerDto) {
        boolean result = ticketerService.saveTicketer(ticketerDto);
        return ResponseEntity.ok(result);
    }

    // 토큰으로 유저조회
    @GetMapping("/tokenUser")
    public Member getUserInfoByToken(@RequestHeader("Authorization") String token) {
        System.out.println("PerformanceController 토큰으로 공연조회");
        String email = tokenProvider.getUserEmail(token);
        return authService.getUserByEmail(email);
    }

}

