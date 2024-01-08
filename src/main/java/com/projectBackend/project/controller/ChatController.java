package com.projectBackend.project.controller;

import com.projectBackend.project.dto.ChatMessageDTO;
import com.projectBackend.project.dto.ChatRoomReqDTO;
import com.projectBackend.project.dto.ChatRoomResDTO;
import com.projectBackend.project.entity.Chat;
import com.projectBackend.project.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
//@CrossOrigin(origins = CORS_ORIGIN)
@RequestMapping("/chat")
public class ChatController {
    private final ChatService chatService;
    // 새로운 방 만들기
    @PostMapping("/new")
    public ResponseEntity<String> createRoom(@RequestBody ChatRoomReqDTO chatRoomReqDTO) {
        log.warn("chatRoomDto : {}", chatRoomReqDTO);
        ChatRoomResDTO room = chatService.createRoom(chatRoomReqDTO.getName(), chatRoomReqDTO.getEmail());
        return new ResponseEntity<>(room.getRoomId(), HttpStatus.OK);
    }
    // ownerId로 채팅방 목록 가져오기
    @GetMapping("/rooms/owner/{ownerId}")
    public ResponseEntity<List<ChatRoomResDTO>> getRoomsByOwnerId(@PathVariable Long ownerId) {
        List<ChatRoomResDTO> chatRooms = chatService.findRoomsByOwnerId(ownerId);
        return ResponseEntity.ok(chatRooms);
    }
    @GetMapping("/room")
    public List<ChatRoomResDTO> getRooms() {
        return chatService.findAllRoom();
    }
    // 방 정보 가져오기
    @GetMapping("/room/{roomId}")
    public ChatRoomResDTO findRoomById(@PathVariable String roomId) {
        return chatService.findRoomById(roomId);
    }
    // 메세지 저장하기
    @PostMapping("/message")
    public ResponseEntity<Void> saveMessage(@RequestBody ChatMessageDTO chatMessageDTO) {
        chatService.saveMessage(chatMessageDTO.getRoomId(), chatMessageDTO.getSender(), chatMessageDTO.getMessage());
        return new ResponseEntity<>(HttpStatus.OK);
    }
    // 세션 수 가져오기
    @GetMapping("/room/{roomId}/sessioncount")
    public int getSessionCount(@PathVariable String roomId) {
        return chatService.getSessionCount(roomId);
    }
    // 이전 메세지 가져오기
    @GetMapping("/message/{roomId}")
    public List<Chat> getRecentMessages(@PathVariable String roomId) {
        return chatService.getRecentMessages(roomId);
    }
}
