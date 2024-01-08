package com.projectBackend.project.repository;

import com.projectBackend.project.entity.Member;
import com.projectBackend.project.entity.Music;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MusicRepository extends JpaRepository<Music, Long> {
    List<Music> findByMusicTitleContainingIgnoreCase(String keyword);
    List<Music> findByMember(Member member);
    // 음악 날짜 정렬
    List<Music> findAllByOrderByReleaseDateAsc();
    // 음악 판매순 정렬
    List<Music> findAllByOrderByPurchaseCountDesc();
    // 회원 아이디로 음악 조회
    List<Music> findByMemberId(Long id);


}
