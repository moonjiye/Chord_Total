package com.projectBackend.project.controller;

import com.projectBackend.project.dto.PerformerDto;
import com.projectBackend.project.service.PerformerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/performer")
@RequiredArgsConstructor
public class PerformerController {
    private final PerformerService performerService;
    //전체공연자조회
    @GetMapping("/list")
    public ResponseEntity<List<PerformerDto>> performerList() {
        System.out.println("컨트롤러 performerList");
        List<PerformerDto> list = performerService.getPerformerList();
        System.out.println("컨트롤러 performerList : " + list);
        return ResponseEntity.ok(list);
    }


}
