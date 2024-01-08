package com.projectBackend.project.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "chat")
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_id")
    private Long chatId;

    @Column(name = "sender")
    private String sender;

    @Column(name = "message")
    private String message;

    @Column(name = "sent_at")
    private LocalDateTime sentAt;


    // chat와 chatRoom간에 순환참조가 일어나는걸 막아주는 JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
   @JoinColumn(name = "room_id")
    @JsonIgnore
    private ChatRoom chatRoom;
}
