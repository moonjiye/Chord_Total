package com.projectBackend.project.service;

import com.projectBackend.project.dto.CommunityDTO;
import com.projectBackend.project.entity.*;
import com.projectBackend.project.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class CommunityService {
    private final CommunityRepository communityRepository;
    private final UserRepository memberRepository;
    private final CommentRepository commentRepository;
    private final CommunityCategoryRepository categoryRepository;
    private final CommunityViewRepository viewRepository;
    private final CommunityVoteRepository communityVoteRepository;

    public boolean saveCommunity(CommunityDTO communityDTO, HttpServletRequest request) {
        try{
            Community community = new Community();

            if (communityDTO.getEmail() != null && !communityDTO.getEmail().isEmpty()) {
                Member member = memberRepository.findByUserEmail(communityDTO.getEmail()).orElseThrow(
                        () -> new RuntimeException("해당 회원이 존재하지 않습니다.")
                );
                community.setMember(member);
                community.setEmail(member.getUserEmail());
            } else {
                String clientIp = request.getHeader("X-Forwarded-For");

                if (clientIp == null || clientIp.isEmpty() || "unknown".equalsIgnoreCase(clientIp)) {
                    clientIp = request.getRemoteAddr();
                }
                community.setIpAddress(clientIp);
                community.setNickName(communityDTO.getNickName());
                community.setPassword(communityDTO.getPassword());
            }
            CommunityCategory category = categoryRepository.findById(communityDTO.getCategoryId()).orElseThrow(
                    () -> new RuntimeException("해당 카테고리가 존재하지 않습니다.")
            );

            community.setTitle(communityDTO.getTitle());
            community.setCategory(category);
            community.setCategoryName(category.getCategoryName());
            community.setContent(communityDTO.getContent());
            community.setText(communityDTO.getText());

            communityRepository.save(community);

            return true;
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
    public List<CommunityDTO> getCommunityList(){
        List<Community> communities = communityRepository.findAll();
        List<CommunityDTO> communityDTOS = new ArrayList<>();
        for (Community community : communities){
            communityDTOS.add(convertEntityToDTO(community));
        }
        return communityDTOS;
    }
    public CommunityDTO getCommunityDetail(Long id , HttpServletRequest request){
        Community community = communityRepository.findById(id).orElseThrow(
                () -> new RuntimeException("해당 게시물이 존재하지 않습니다.")
        );
        String visitorIp = request.getHeader("X-Forwarded-For");
        if (visitorIp == null || visitorIp.isEmpty() || "unknown".equalsIgnoreCase(visitorIp)) {
            visitorIp = request.getRemoteAddr();
        }
        final String finalVisitorIp = visitorIp;
        List<CommunityView> communityViews = viewRepository.findByCommunity(community);
        if (communityViews.stream().noneMatch(view -> view.getIp().equals(finalVisitorIp))) {
            community.setViewCount(community.getViewCount() + 1);

            CommunityView communityView = new CommunityView();
            communityView.setCommunity(community);
            communityView.setIp(finalVisitorIp);
            viewRepository.save(communityView);
        }

        // Community 엔티티를 DTO로 변환
        CommunityDTO communityDTO = convertEntityToDTO(community);

        communityRepository.save(community);

        return communityDTO;
    }
    public boolean modifyCommunity(Long id, CommunityDTO communityDTO){
        try {
            Community community = communityRepository.findById(id).orElseThrow(
                    () -> new RuntimeException("해당 게시글이 존재하지 않습니다.")
            );
            community.setTitle(communityDTO.getTitle());
            community.setContent(communityDTO.getContent());
            community.setText(communityDTO.getText());

            communityRepository.save(community);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    // 게시글 삭제
    public boolean deleteCommunity(Long id) {
        try {
            communityRepository.deleteById(id);
            return true;
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
    // 게시글 검색
    public List<CommunityDTO> searchCommunity(String keyword){
        List<Community> communities = communityRepository.findByTitleContaining(keyword);
        List<CommunityDTO> communityDTOS = new ArrayList<>();
        for (Community community : communities) {
            communityDTOS.add(convertEntityToDTO(community));
        }
        return communityDTOS;
    }
    // 게시글 페이징
    public List<CommunityDTO> getCommunityList(int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        List<Community> communities= communityRepository.findAll(pageable).getContent();
        List<CommunityDTO> communityDTOS = new ArrayList<>();
        for (Community community : communities) {
            communityDTOS.add(convertEntityToDTO(community));
        }
        return communityDTOS;
    }
    // 카테고리별 게시글 페이징
    public List<CommunityDTO> getCommunityListByCategory(Long categoryId, int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        List<Community> communities= communityRepository.findByCategory_CategoryId(categoryId, pageable).getContent();
        List<CommunityDTO> communityDTOS = new ArrayList<>();
        for (Community community : communities) {
            communityDTOS.add(convertEntityToDTO(community));
        }
        return communityDTOS;
    }
    // 페이지 수 조회
    public int getCommunity(Pageable pageable){
        return communityRepository.findAll(pageable).getTotalPages();
    }
    // 카테고리에 따른 페이지 수 조회
    public int getCommunityTotalPagesByCategory(Long categoryId, Pageable pageable) {
        return communityRepository.findByCategory_CategoryId(categoryId, pageable).getTotalPages();
    }

    // 개념글 추천
    public void vote(Long communityId, String userEmail, String visitorIp, boolean isUpvote) {
        Optional<Community> communityOptional = communityRepository.findById(communityId);
        if (!communityOptional.isPresent()) {
            throw new IllegalArgumentException("해당 게시글이 존재하지 않습니다.");
        }

        Community community = communityOptional.get();

        // 로그인한 경우 이메일로 비로그인일 경우 IP로 중복 추천 체크
        Optional<CommunityVote> voteOptional;
        if (userEmail != null && !userEmail.isEmpty()) {
            voteOptional = communityVoteRepository.findByCommunityAndUserEmail(community, userEmail);
        } else {
            voteOptional = communityVoteRepository.findByCommunityAndIp(community, visitorIp);
        }

        // 이미 추천했는지 확인
        if (voteOptional.isPresent()) {
            throw new IllegalArgumentException("이미 추천하셨습니다.");
        }

        // 추천 수 증가 또는 감소
        if (isUpvote) {
            community.setVoteCount(community.getVoteCount() + 1);
        } else {
            community.setVoteCount(community.getVoteCount() - 1);
        }
        communityRepository.save(community);

        // 추천 기록 저장
        CommunityVote vote = new CommunityVote();
        vote.setCommunity(community);
        vote.setIp(visitorIp);
        vote.setUpvote(isUpvote);
        communityVoteRepository.save(vote);
    }

    // 조회수, 추천 수, 댓글 수를 고려한 복합 점수 계산
    private float calculateScore(Community post) {
        int commentCount = commentRepository.countByCommunity(post);  // 댓글 수를 구함
        return post.getViewCount() * 0.3f + post.getVoteCount() * 0.5f + commentCount * 0.2f;
    }
    // 실시간 랭킹
    public List<Community> getRealtimeRanking(String period) {
        // 최근 시간을 설정하고 가져옴
        LocalDateTime targetTime;

        switch (period) {
            case "realtime":
                targetTime = LocalDateTime.now().minusHours(1);
                break;
            case "weekly":
                targetTime = LocalDateTime.now().minusWeeks(1);
                break;
            case "monthly":
                targetTime = LocalDateTime.now().minusMonths(1);
                break;
            default:
                throw new IllegalArgumentException("Invalid period: " + period);
        }

        // 게시글을 불러옴
        List<Community> posts = communityRepository.findByRegDateAfter(targetTime);


        // 점수를 계산하여 랭킹을 매김
        posts.sort((post1, post2) -> Float.compare(calculateScore(post2), calculateScore(post1)));

        log.warn(posts.toString());

        // 상위 10개 게시글만 반환함
        return posts.subList(0, Math.min(10, posts.size()));
    }
    // 게시글 페이지네이션 검색
    public Page<CommunityDTO> searchByTitleAndText(String keyword, Pageable pageable) {
        Page<Community> communities = communityRepository.findByTitleContainingOrTextContaining(keyword, keyword, pageable);
        return communities.map(this::convertEntityToDTO);
    }

    public Page<CommunityDTO> searchByTitle(String keyword, Pageable pageable) {
        Page<Community> communities = communityRepository.findByTitleContaining(keyword, pageable);
        return communities.map(this::convertEntityToDTO);
    }

    public Page<CommunityDTO> searchByNickname(String keyword, Pageable pageable) {
        Page<Community> communities = communityRepository.findByNickNameContaining(keyword, pageable);
        return communities.map(this::convertEntityToDTO);
    }
    public Page<CommunityDTO> searchByComment(String keyword, Pageable pageable) {
        // 먼저 키워드를 포함하는 댓글
        Page<Comment> comments = commentRepository.findByContentContaining(keyword, pageable);

        // 찾은 댓글들이 속한 Community들을 찾기
        // 여기서 distinct()를 사용하여 중복을 제거하고, ID를 기준으로 정렬
        List<Community> uniqueCommunities = comments.getContent().stream()
                .map(Comment::getCommunity)
                .distinct()
                .sorted(Comparator.comparingLong(Community::getCommunityId))
                .collect(Collectors.toList());

        // Community들을 DTO로 변환
        // 중복 제거된 리스트를 사용
        List<CommunityDTO> communityDTOs = uniqueCommunities.stream()
                .map(this::convertEntityToDTO)
                .collect(Collectors.toList());

        // DTO 리스트를 페이지로 변환하여 반환
        // 총 요소의 수를 적절하게 계산하여 전달해야 함
        return new PageImpl<>(communityDTOs, pageable, communityDTOs.size());
    }
    // 게시글 엔티티를 DTO로 변환
    private CommunityDTO convertEntityToDTO(Community community) {
        CommunityDTO communityDTO = new CommunityDTO();
        communityDTO.setId(community.getCommunityId());
        communityDTO.setTitle(community.getTitle());
        communityDTO.setContent(community.getContent());
        communityDTO.setText(community.getText());
        communityDTO.setIpAddress(community.getIpAddress());
        communityDTO.setEmail(community.getEmail());
        communityDTO.setNickName(community.getNickName());
        communityDTO.setPassword(community.getPassword());
        communityDTO.setViewCount(community.getViewCount());
        communityDTO.setVoteCount(community.getVoteCount());
        communityDTO.setCategoryId(community.getCategory().getCategoryId());
        communityDTO.setCategoryName(community.getCategoryName());

        if (community.getMember() != null) {
            communityDTO.setEmail(community.getMember().getUserEmail());
        }
        communityDTO.setRegDate(community.getRegDate());

        return communityDTO;
    }
}
