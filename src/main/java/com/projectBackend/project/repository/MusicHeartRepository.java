package com.projectBackend.project.repository;

import com.projectBackend.project.entity.MusicHeart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface MusicHeartRepository extends JpaRepository<MusicHeart, Long> {
    List<MusicHeart> findByMusic_MusicId(Long musicId);
    List<MusicHeart> findByMember_UserGen(String userGen);

    @Transactional
    @Modifying
    @Query("DELETE FROM MusicHeart mh WHERE mh.music.id = :musicId AND mh.member.id = :userId")
    void deleteByMusic_MusicIdAndMember_UserId(@Param("musicId")Long musicId, @Param("userId") Long userId);

}