package com.projectBackend.project.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.projectBackend.project.entity.News;
import com.projectBackend.project.repository.NewsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class NewsScheduledService {
//    @Value("${api.news.url}")
//    private final String newsUrl;
    String newsUrl = "http://localhost:5000/api/news";
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final NewsService newsService;
    private final NewsRepository newsRepository;

    @Scheduled(fixedRate = 6000000)
    public void newsCrawling() throws JsonProcessingException {
        try {
            ResponseEntity<String> response = restTemplate.getForEntity(newsUrl, String.class);
            String newsData = response.getBody();
            log.info("product data {} :", newsData);
            List<Map<String, String>> newsDtoList = objectMapper.readValue(newsData, new TypeReference<List<Map<String, String>>>() {});
            System.out.println(newsDtoList);
            // 데이터가 쌓이지 않고 최신화 시켜주기 위해 사용.
            newsRepository.deleteAll();
            for (Map<String, String> data : newsDtoList) {
                News news = new News();
                news.setNewsTitle(data.get("title"));
                news.setNewsImage(data.get("image"));
                news.setNewsLikes(data.get("likes"));
                news.setNewsLink(data.get("link"));
                newsRepository.save(news);
            }
            System.out.println("success!!!!!");
        } catch (Exception e) {
            System.out.println("크롤링 실패!!!!!!!");
        }
    }
}


