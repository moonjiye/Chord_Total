package com.projectBackend.project.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MusicHeartDto {
    private Long heartCheckerId;
    private Long musicId;
    private Long id;
    private String userEmail;
}
