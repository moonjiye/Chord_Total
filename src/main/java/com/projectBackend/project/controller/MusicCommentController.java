package com.projectBackend.project.controller;


import com.projectBackend.project.dto.MusicCommentDTO;
import com.projectBackend.project.service.MusicCommentService;
import com.projectBackend.project.service.MusicService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@Setter
@Getter
@ToString
@RequiredArgsConstructor
@RequestMapping("/musiccomment")
public class MusicCommentController {

    private final MusicCommentService musicCommentService;
    private final MusicService musicService;


    //댓글 등록
    @PostMapping("/new")
    public ResponseEntity<Boolean> musicCommentRegister(@RequestBody MusicCommentDTO musicCommentDTO) {
        log.info("musicCommentDto: {}", musicCommentDTO);
        boolean result = musicCommentService.MusicCommentRegister(musicCommentDTO);
        return ResponseEntity.ok(result);
    }

    //댓글 수정

    @PutMapping("/modify")
    public ResponseEntity<Boolean> musicCommentModify(@RequestBody MusicCommentDTO musicCommentDTO) {
        log.info("musicCommentDto: {}", musicCommentDTO);
        boolean result = musicCommentService.MusicCommentModify(musicCommentDTO);
        return ResponseEntity.ok(result);
    }


    // 댓글 삭제
    @DeleteMapping("/delete/{musicCommentId}")
    public ResponseEntity<Boolean> musicCommentDelete(@PathVariable Long musicCommentId) {
        log.info("musicCommentId: {}", musicCommentId);
        boolean result = musicCommentService.MusicCommentDelete(musicCommentId);
        return ResponseEntity.ok(result);
    }


    //댓글 목록 조회 -
    @GetMapping("/list/{musicId}")
    public ResponseEntity<List<MusicCommentDTO>> musicCommentList(@PathVariable Long musicId) {
        log.info("musicId: {}", musicId);
        List<MusicCommentDTO> musicCommentDTOList = musicCommentService.getMusicCommentList(musicId);
        return ResponseEntity.ok(musicCommentDTOList);
    }

    //댓글 검색 -
    @GetMapping("/search/{keyword}")
    public ResponseEntity<List<MusicCommentDTO>> musicCommentSearch(@PathVariable String keyword) {
        log.info("keyword : {}", keyword);
        List<MusicCommentDTO> list = musicCommentService.getMusicCommentSearch(keyword);
        return ResponseEntity.ok(list);
    }




}
