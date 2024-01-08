package com.projectBackend.project.repository;

import com.projectBackend.project.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByUserEmail(String email);
    Optional<Member> findByUserNickname(String nickName);
    boolean existsByUserEmail(String email);
    Optional<Member> findByUserEmailAndUserPassword(String email, String password);
    boolean existsByUserNickname(String userNickname);

}
