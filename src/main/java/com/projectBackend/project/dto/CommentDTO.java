package com.projectBackend.project.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class CommentDTO {
    private Long commentId;
    private Long communityId;
    private String email;
    private String content;
    private LocalDateTime regDate;
    private Long parentCommentId;
    private List<CommentDTO> childComments;
    private String nickName;
    private String password;
    private String ipAddress;
}
