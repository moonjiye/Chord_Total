package com.projectBackend.project.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TicketerDto {
    private Long ticketerId;
    private Long performanceId;
    private Long userId;
    private Integer count;
    private Integer totalPrice;
    private Integer price;
    private String email;

}
