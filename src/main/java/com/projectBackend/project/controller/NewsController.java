package com.projectBackend.project.controller;

import com.projectBackend.project.dto.NewsDto;
import com.projectBackend.project.service.NewsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import static com.projectBackend.project.utils.Common.CORS_ORIGIN;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("news")
@RequiredArgsConstructor
@CrossOrigin(origins = CORS_ORIGIN)
public class NewsController {
    private final NewsService newsService;
    @GetMapping("/newslist")
    public ResponseEntity<List<NewsDto>> newsBack(){
        List<NewsDto> list = newsService.newslist();
        return ResponseEntity.ok(list);
    }
}
