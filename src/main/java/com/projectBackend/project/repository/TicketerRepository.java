package com.projectBackend.project.repository;

import com.projectBackend.project.entity.Ticketer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketerRepository extends JpaRepository<Ticketer, Long> {

    List<Ticketer> findByMember_Id(Long id);

    List<Ticketer> findByPerformance_PerformanceId(Long performanceId);
}
