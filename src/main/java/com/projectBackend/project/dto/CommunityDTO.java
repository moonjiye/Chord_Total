package com.projectBackend.project.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommunityDTO {
    private Long id;
    private String email;
    private Long categoryId;
    private String categoryName;
    private String title;
    private String content;
    private String text;
    private LocalDateTime regDate;
    private int viewCount;
    private int voteCount;
    private String ipAddress;
    private String nickName;
    private String password;
}
