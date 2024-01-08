package com.projectBackend.project.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "chatRoom")
public class ChatRoom {
    @Id
    @Column(name = "room_id", length = 50)
    private String roomId;
    @Column(name = "room_name")
    private String roomName;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name = "session_count")
    private int sessionCount;

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Chat> chats = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private Member owner;
}
