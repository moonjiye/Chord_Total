package com.projectBackend.project.service;

import com.projectBackend.project.dto.PerformerDto;
import com.projectBackend.project.entity.Performer;
import com.projectBackend.project.repository.PerformerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PerformerService {
    private final PerformerRepository performerRepository;

    // 공연자 조회
    public List<PerformerDto> getPerformerList() {
        List<Performer> performers = performerRepository.findAll();
        List<PerformerDto> performerDtos = new ArrayList<>();
        System.out.println("서비스 getPerformerList");
        for (Performer performer : performers) {
            performerDtos.add(convertEntityToDto(performer));
        }
        return performerDtos;

    }

    // 공연자 등록
//    public boolean savePerformer(PerformerDto performerDto) {
//        try {
//            Performer performer = new Performer();
//        }
//        return true;
//    }


    private PerformerDto convertEntityToDto(Performer performer) {
        PerformerDto performerDto = new PerformerDto();
        performerDto.setPerformerId(performer.getPerformerId());
        performerDto.setPerformanceId(performer.getPerformance().getPerformanceId().toString());
        performerDto.setPerformer(performer.getMember().getUserNickname());
        return performerDto;
    }
}
