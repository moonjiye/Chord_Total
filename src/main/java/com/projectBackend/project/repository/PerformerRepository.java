package com.projectBackend.project.repository;

import com.projectBackend.project.entity.Performer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PerformerRepository extends JpaRepository<Performer, Long> {

    List<Performer> findByMember_Id(Long id);

    List<Performer> findByPerformance_PerformanceId(Long performanceId);
}
