package com.projectBackend.project.repository;

import com.projectBackend.project.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {
    Optional<Token> findByMemberId(Long memberId);
    List<Token> findAllByMemberId(Long id);
    void deleteByMember_Id(Long memberId);
}

