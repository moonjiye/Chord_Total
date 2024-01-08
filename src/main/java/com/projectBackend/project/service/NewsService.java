package com.projectBackend.project.service;

import com.projectBackend.project.dto.NewsDto;
import com.projectBackend.project.entity.News;
import com.projectBackend.project.repository.NewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NewsService {

//    @Value("${api.news.url}")
//    private String newsUrl;

    private final NewsRepository newsRepository;

    public List<NewsDto> newslist() {
        List<NewsDto> newsDtos = new ArrayList<>();
        List<News> news1 = newsRepository.findAll();
        for(News news : news1) {
            NewsDto newsDto = new NewsDto();
            newsDto.setNewsTitle(news.getNewsTitle());
            newsDto.setNewsImage(news.getNewsImage());
            newsDto.setNewsLikes(news.getNewsLikes());
            newsDto.setNewsLink(news.getNewsLink());
            newsDtos.add(newsDto);
        }
        return newsDtos;
    }
}
