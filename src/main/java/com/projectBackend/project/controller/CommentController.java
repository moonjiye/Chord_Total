package com.projectBackend.project.controller;

import com.projectBackend.project.dto.CommentDTO;
import com.projectBackend.project.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
@Slf4j
@RestController
@RequestMapping("/api/comment")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;
    // 댓글 등록
    @PostMapping("/new")
    public ResponseEntity<Boolean> commentRegister(@RequestBody CommentDTO commentDTO, HttpServletRequest request) {
        log.info("commentDto: {}", commentDTO);
        boolean result = commentService.commentRegister(commentDTO, request);
        return ResponseEntity.ok(result);
    }
    @PostMapping("/reply/new")
    public ResponseEntity<Boolean> replyRegister(@RequestBody CommentDTO commentDTO, HttpServletRequest request) {
        log.info("commentDto: {}", commentDTO);
        boolean result = commentService.replyRegister(commentDTO, request);
        return ResponseEntity.ok(result);
    }
    // 댓글 수정
    @PutMapping("/modify")
    public ResponseEntity<Boolean> commentModify(@RequestBody CommentDTO commentDTO) {
        boolean result = commentService.commentModify(commentDTO);
        return ResponseEntity.ok(result);
    }
    // 댓글 삭제
    @DeleteMapping("/delete/{commentId}")
    public ResponseEntity<Boolean> commentDelete(@PathVariable Long commentId) {
        boolean result = commentService.commentDelete(commentId);
        return ResponseEntity.ok(result);
    }
    // 댓글 목록 조회
    @GetMapping("/list/{communityId}")
    public ResponseEntity<List<CommentDTO>> commentList(@PathVariable Long communityId, @RequestParam(defaultValue = "최신순") String sortType, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        log.info("boardId: {}, sortType: {}, page: {}, size: {}", communityId, sortType, page, size);
        List<CommentDTO> list = commentService.getCommentList(communityId, sortType, page, size);
        return ResponseEntity.ok(list);
    }
    // 댓글 목록 페이징
    @GetMapping("/list/{communityId}/page")
    public ResponseEntity<Page<CommentDTO>> commentListPage(@PathVariable Long communityId,
                                                            @RequestParam(defaultValue = "최신순") String sortType, Pageable pageable) {
        Page<CommentDTO> list = commentService.getCommentListPage(communityId, sortType, pageable);
        return ResponseEntity.ok(list);
    }
    // 전체 댓글 수 조회
    @GetMapping("/count/{communityId}")
    public ResponseEntity<Integer> commentCount(@PathVariable Long communityId) {
        int count = commentService.getCommentCount(communityId);
        return ResponseEntity.ok(count);
    }
    // 댓글 검색
    @GetMapping("/search")
    public ResponseEntity<List<CommentDTO>> commentSearch(@RequestParam String keyword) {
        List<CommentDTO> list = commentService.getCommentList(keyword);
        return ResponseEntity.ok(list);
    }
}
