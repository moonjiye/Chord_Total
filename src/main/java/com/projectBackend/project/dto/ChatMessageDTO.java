package com.projectBackend.project.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessageDTO {
    public enum MessageType {
        ENTER, TALK, CLOSE
    }
    private MessageType type;
    private String roomId;
    private String sender;
    private String message;
}
