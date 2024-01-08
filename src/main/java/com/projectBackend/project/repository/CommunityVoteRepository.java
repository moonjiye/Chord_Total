package com.projectBackend.project.repository;

import com.projectBackend.project.entity.Community;
import com.projectBackend.project.entity.CommunityVote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommunityVoteRepository extends JpaRepository<CommunityVote, Long> {
    Optional<CommunityVote> findByCommunityAndIp(Community community, String ip);
    Optional<CommunityVote> findByCommunityAndUserEmail(Community community, String userEmail);

}
