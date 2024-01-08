package com.projectBackend.project.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewsDto {
    private Long newsId;
    private String newsTitle;
    private String newsImage;
    private String newsLikes;
    private String newsLink;
}

