package com.projectBackend.project.dto;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.projectBackend.project.service.ChatService;
import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.WebSocketSession;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Getter
@Slf4j
public class ChatRoomResDTO {
    private String roomId;
    private String name;
    private LocalDateTime regDate;
    private String ownerEmail;
    @JsonIgnore // 이 어노테이션으로 WebSocketSession의 직렬화 방지
    private Set<WebSocketSession> sessions;
    private int sessionCount;
    // 세션 수가 0인지 확인하는 메서드
    public boolean isSessionEmpty() {
        return this.sessions.isEmpty();
    }
    public int getSessionCount() {
        return this.sessions.size();
    }
    @Builder
    public ChatRoomResDTO(String roomId, String name, LocalDateTime regDate, String ownerEmail) {
        this.roomId = roomId;
        this.name = name;
        this.regDate = regDate;
        this.ownerEmail = ownerEmail;
        this.sessions = Collections.newSetFromMap(new ConcurrentHashMap<>());
    }


    public void handlerActions(WebSocketSession session, ChatMessageDTO chatMessage, ChatService chatService) {
        if (chatMessage.getType() != null && chatMessage.getType().equals(ChatMessageDTO.MessageType.ENTER)) {
            sessions.add(session);
            if (chatMessage.getSender() != null) {
                chatMessage.setMessage(chatMessage.getSender() + "님이 입장했습니다.");
            }
            log.debug("New session added: " + session);
        } else if(chatMessage.getType() != null && chatMessage.getType().equals(ChatMessageDTO.MessageType.CLOSE)) {
            sessions.remove(session);
            if (chatMessage.getSender() != null) {
                chatMessage.setMessage(chatMessage.getSender() + "님이 퇴장했습니다.");
            }
            log.debug("Session removed: " + session);
        } else {
            chatService.saveMessage(chatMessage.getRoomId(), chatMessage.getSender(), chatMessage.getMessage());
            log.debug("Message received: " + chatMessage.getMessage());
        }

        if (this.isSessionEmpty()) {
            // 채팅방이 빈 상태이면 채팅방을 제거
            chatService.removeRoom(this.roomId);
        }
        sendMessage(chatMessage, chatService);
    }
    public void handleSessionClosed(WebSocketSession session, ChatService chatService) {
        sessions.remove(session);
        log.debug("Session closed: " + session);

//        if (this.isSessionEmpty()) {
//            // 채팅방이 빈 상태이면 채팅방을 제거
//            chatService.removeRoom(this.roomId);
//        }
    }

    private <T> void sendMessage(T message, ChatService chatService) {
        for (WebSocketSession session : sessions) {
            try {
                chatService.sendMessage(session, message);
            } catch (Exception e) {
                log.error("Error sending message in ChatRoomResDto: ", e);
            }
        }
    }
}
