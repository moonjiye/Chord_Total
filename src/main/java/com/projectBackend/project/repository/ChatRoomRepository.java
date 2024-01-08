package com.projectBackend.project.repository;

import com.projectBackend.project.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, String> {
    List<ChatRoom> findByOwnerId(Long ownerId);
}
