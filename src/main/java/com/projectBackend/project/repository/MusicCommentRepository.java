package com.projectBackend.project.repository;

import com.projectBackend.project.entity.MusicComment;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
public interface MusicCommentRepository extends JpaRepository<MusicComment, Long> {
    List<MusicComment> findByContentContaining(String keyword);
    List<MusicComment> findByMusic(Long musicId);

    List<MusicComment> findByMusic_MusicId(Long musicId);
    //findByMusic_MusicId' 메서드명으로 선언하여 Music ID를 기반으로 댓글을 조회

}
