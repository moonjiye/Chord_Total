package com.projectBackend.project.controller;

import com.projectBackend.project.dto.CommunityDTO;
import com.projectBackend.project.entity.Community;
import com.projectBackend.project.service.CommunityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.security.Principal;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/community")
@RequiredArgsConstructor
public class CommunityController {
    private final CommunityService communityService;
    // 게시글 작성
    @PostMapping("/new")
    public ResponseEntity<Boolean> saveCommunity(@RequestBody CommunityDTO communityDTO, HttpServletRequest request) {
        return ResponseEntity.ok(communityService.saveCommunity(communityDTO, request));
    }

    // 게시글 리스트 조회
    @GetMapping("/list")
    public ResponseEntity<List<CommunityDTO>> getCommunityList() {
        return ResponseEntity.ok(communityService.getCommunityList());
    }

    // 게시글 방 조회
    @GetMapping("/detail/{id}")
    public ResponseEntity<CommunityDTO> getCommunityDetail(@PathVariable Long id ,HttpServletRequest request) throws IOException {
        return ResponseEntity.ok(communityService.getCommunityDetail(id,request));
    }
    // 게시글 수정
    @PutMapping("/{id}")
    public ResponseEntity<Boolean> modifyCommunity(@PathVariable Long id, @RequestBody CommunityDTO communityDTO) {
        return ResponseEntity.ok(communityService.modifyCommunity(id, communityDTO));
    }

    // 게시글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteCommunity(@PathVariable Long id) {
        return ResponseEntity.ok(communityService.deleteCommunity(id));
    }
    // 게시글 목록 페이징
    @GetMapping("/list/page")
    public ResponseEntity<List<CommunityDTO>> boardList(@RequestParam(defaultValue = "0") int page,
                                                    @RequestParam(defaultValue = "10") int size) {
        List<CommunityDTO> list = communityService.getCommunityList(page, size);
        return ResponseEntity.ok(list);
    }
    // 카테고리별 게시글 목록 페이징
    @GetMapping("/list/page/category")
    public ResponseEntity<List<CommunityDTO>> boardListByCategory(@RequestParam Long categoryId,
                                                                  @RequestParam(defaultValue = "0") int page,
                                                                  @RequestParam(defaultValue = "10") int size) {
        List<CommunityDTO> list = communityService.getCommunityListByCategory(categoryId, page, size);
        return ResponseEntity.ok(list);
    }
    // 페이지 수 조회
    @GetMapping("/count")
    public ResponseEntity<Integer> listBoards(@RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "10") int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Integer pageCnt = communityService.getCommunity(pageRequest);
        return ResponseEntity.ok(pageCnt);
    }
    // 카테고리별 페이지 수 조회
    @GetMapping("/count/{categoryId}")
    public ResponseEntity<Integer> getCommunityTotalPagesByCategory(@PathVariable Long categoryId,
                                                                    @RequestParam(defaultValue = "0") int page,
                                                                    @RequestParam(defaultValue = "10") int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Integer pageCnt = communityService.getCommunityTotalPagesByCategory(categoryId, pageRequest);
        return ResponseEntity.ok(pageCnt);
    }
    // 개념글 추천
    @PostMapping("/vote/{id}/{isUpvote}")
    public ResponseEntity<String> vote(@PathVariable Long id, @PathVariable boolean isUpvote, HttpServletRequest request, Principal principal){
        String email = principal != null ? principal.getName() : null;
        String visitorIp = request.getRemoteAddr();
        try {
            communityService.vote(id, email, visitorIp, isUpvote);
            return ResponseEntity.ok(isUpvote ? "추천이 완료되었습니다." : "비추천이 완료되었습니다.");
        } catch (IllegalArgumentException e) {
            String message = isUpvote ? "이미 추천하셨습니다." : "이미 비추천하셨습니다.";
            return ResponseEntity.badRequest().body(message);
        }
    }
    // 개념글 랭킹 목록
    @GetMapping("/ranking/{period}")
    public ResponseEntity<List<Community>> getRealtimeRanking(@PathVariable String period) {
        return ResponseEntity.ok(communityService.getRealtimeRanking(period));
    }
    // 게시글 검색 기본(제목+내용)
    @GetMapping("/search/titleAndContent")
    public ResponseEntity<Page<CommunityDTO>> searchByTitleAndContent(@RequestParam String keyword, Pageable pageable) {
        Page<CommunityDTO> list = communityService.searchByTitleAndText(keyword, pageable);
        return ResponseEntity.ok(list);
    }
    // 제목으로 검색
    @GetMapping("/search/title")
    public ResponseEntity<Page<CommunityDTO>> searchByTitle(@RequestParam String keyword, Pageable pageable) {
        Page<CommunityDTO> list = communityService.searchByTitle(keyword, pageable);
        return ResponseEntity.ok(list);
    }
    // 닉네임으로 검색
    @GetMapping("/search/nickname")
    public ResponseEntity<Page<CommunityDTO>> searchByNickname(@RequestParam String keyword, Pageable pageable) {
        Page<CommunityDTO> list = communityService.searchByNickname(keyword, pageable);
        return ResponseEntity.ok(list);
    }
    // 댓글로 검색
    @GetMapping("/search/comment")
    public ResponseEntity<Page<CommunityDTO>> communitySearch(@RequestParam String keyword, Pageable pageable) {
        Page<CommunityDTO> list = communityService.searchByComment(keyword, pageable);
        return ResponseEntity.ok(list);
    }

}
