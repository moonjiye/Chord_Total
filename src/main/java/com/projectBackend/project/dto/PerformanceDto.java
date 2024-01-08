package com.projectBackend.project.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PerformanceDto {
    private Long performanceId;
    private String performanceName;
    private List<String> performer;
    private String venue;
    private String detailVenue;
    private String performanceDate;
    private Integer price;
    private String description;
    private int seatCount;
    private String performanceImage;
    private List<String> nicknames;

}
