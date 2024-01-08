package com.projectBackend.project.repository;

import com.projectBackend.project.entity.Community;
import com.projectBackend.project.entity.CommunityView;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommunityViewRepository extends JpaRepository<CommunityView, Long> {

    List<CommunityView> findByCommunity(Community community);
}
