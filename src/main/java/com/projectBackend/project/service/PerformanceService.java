package com.projectBackend.project.service;


import com.projectBackend.project.dto.PerformanceDto;
import com.projectBackend.project.dto.UserResDto;
import com.projectBackend.project.entity.Member;
import com.projectBackend.project.entity.Performance;
import com.projectBackend.project.entity.Performer;
import com.projectBackend.project.entity.Ticketer;
import com.projectBackend.project.jwt.TokenProvider;
import com.projectBackend.project.repository.PerformanceRepository;
import com.projectBackend.project.repository.PerformerRepository;
import com.projectBackend.project.repository.TicketerRepository;
import com.projectBackend.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class PerformanceService {
    private final PerformanceRepository performanceRepository;
    private final PerformerRepository performerRepository;
    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;
    private final TicketerRepository ticketerRepository;

    // 공연 조회
    public List<PerformanceDto> getPerformanceList() {
        List<Performance> performances = performanceRepository.findAll();
        List<PerformanceDto> performanceDtos = new ArrayList<>();
        System.out.println("서비스 getPerformanceList");
        for (Performance performance : performances) {
            performanceDtos.add(convertEntityToDto(performance));
        }
        return performanceDtos;

    }

    // 공연 등록
    public boolean savePerformance(PerformanceDto performanceDto) {
        boolean isTrue = false;
        try {
            Performance performance = new Performance();
            performance.setPerformanceName(performanceDto.getPerformanceName());
            performance.setVenue(performanceDto.getVenue());
            performance.setDetailVenue(performanceDto.getDetailVenue());
            performance.setPerformanceDate(performanceDto.getPerformanceDate());
            performance.setPrice(performanceDto.getPrice());
            performance.setDescription(performanceDto.getDescription());
            performance.setSeatCount(performanceDto.getSeatCount());
            performance.setPerformanceImage(performanceDto.getPerformanceImage());
            performance = performanceRepository.save(performance);

            for (String performerName : performanceDto.getPerformer()) {
                System.out.println("performerName : " + performerName);
                Member member = userRepository.findByUserNickname(performerName)
                        .orElseThrow(() -> new RuntimeException("해당 회원이 존재하지 않습니다."));
                Performer performer = new Performer();
                performer.setPerformance(performance);
                performer.setMember(member);
                performerRepository.save(performer);
            }

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
//        try {
//            Performance performance = new Performance();
////             멤버 검증 필요
//            Member member = userRepository.findByUserNickname(performanceDto.getPerformer().toString()).orElseThrow(
//                    () -> new RuntimeException("해당 회원이 존재하지 않습니다.")
//            );
//            performance.setPerformanceName(performanceDto.getPerformanceName());
//            performance.setVenue(performanceDto.getVenue());
//            performance.setDetailVenue(performanceDto.getDetailVenue());
//            performance.setPerformanceDate(performanceDto.getPerformanceDate());
//            performance.setPrice(performanceDto.getPrice());
//            performance.setDescription(performanceDto.getDescription());
//            performance.setSeatCount(performanceDto.getSeatCount());
//            performance.setPerformanceImage(performanceDto.getPerformanceImage());
//            performanceRepository.save(performance);
//            isTrue = true;
//            if (isTrue) {
//                Performer performer = new Performer();
//                performer.setPerformance(performance);
//                performer.setMember(member);
//                performerRepository.save(performer);
//            } else {
//                return false;
//            }
//
//
//            return true;
//        } catch (Exception e) {
//            e.printStackTrace();
//            return false;
//        }
//    }

//    // 공연 전체삭제
//    public void deleteAll() {
//        performanceRepository.deleteAll();
//    }

    // 공연 삭제
    public void deletePerformance(Long performanceId) {
        // 이 공연과 관련된 모든 공연자를 조회
        List<Performer> performers = performerRepository.findByPerformance_PerformanceId(performanceId);
        System.out.println("performers : " + performers);
        // 찾은 모든 공연자를 삭제
        for (Performer performer : performers) {
            performerRepository.delete(performer);
        }
        // 이 공연과 관련된 모든 티켓터를 찾습니다.
        List<Ticketer> ticketers = ticketerRepository.findByPerformance_PerformanceId(performanceId);

        // 이 공연의 정보를 찾습니다.
        Performance performance = performanceRepository.findById(performanceId)
                .orElseThrow(() -> new RuntimeException("잘못된 공연ID:" + performanceId));

        // 찾은 모든 티켓터에 대해
        for (Ticketer ticketer : ticketers) {
            // 티켓터의 유저를 찾습니다.
            Member member = ticketer.getMember();
            // 유저의 포인트를 증가시킵니다. 티켓의 가격만큼 포인트를 환불합니다.
            member.setUserPoint(member.getUserPoint() + performance.getPrice());
            // 변경된 포인트를 저장합니다.
            userRepository.save(member);
        }

        // 찾은 모든 티켓터를 삭제합니다.
        for (Ticketer ticketer : ticketers) {
            ticketerRepository.delete(ticketer);
        }

        // 공연 삭제
        performanceRepository.deleteById(performanceId);
    }


    // 페이지네이션
    public List<PerformanceDto> getPerformanceList(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<Performance> performances = performanceRepository.findAll(pageable).getContent();
        List<PerformanceDto> performanceDtos = new ArrayList<>();
        for (Performance performance : performances) {
            performanceDtos.add(convertEntityToDto(performance));
        }
        return performanceDtos;
    }

    // 페이지 수 조회
    public int getPerformancePage(Pageable pageable) {
        return performanceRepository.findAll(pageable).getTotalPages();
    }

    // 퍼포먼스 엔티티를 DTO로 변환
    private PerformanceDto convertEntityToDto(Performance performance) {
        PerformanceDto performanceDto = new PerformanceDto();
        performanceDto.setPerformanceId(performance.getPerformanceId());
        performanceDto.setPerformanceName(performance.getPerformanceName());
        performanceDto.setVenue(performance.getVenue());
        performanceDto.setDetailVenue(performance.getDetailVenue());
        performanceDto.setPerformanceDate(performance.getPerformanceDate());
        performanceDto.setPrice(performance.getPrice());
        performanceDto.setDescription(performance.getDescription());
        performanceDto.setSeatCount(performance.getSeatCount());
        performanceDto.setPerformanceImage(performance.getPerformanceImage());
        return performanceDto;
    }

    // 토큰으로 공연 조회
//    public UserResDto getUserPerformanceInfo(String token) {
//        String email = tokenProvider.getUserEmail(token); // 토큰에서 이메일 추출
//        Optional<Member> optionalMember = userRepository.findByUserEmail(email); // 이메일로 멤버 조회
//
//        if (optionalMember.isPresent()) { // 멤버가 존재하면
//            Member member = optionalMember.get();
//            Long id = member.getId(); // 멤버의 (PK)id 추출
//            //멤버의 PK로 연결된 공연 정보 조회
//            List<Performer> performers = performerRepository.findByMember_Id(id);
//            // Performer의 Performance를 가져와 리스트에 추가합니다.
//            List<Performance> performances = performers.stream()
//                    .map(Performer::getPerformance)
//                    .collect(Collectors.toList());
//
//            List<String> nicknames = new ArrayList<>();
//            // 각 공연에 참여한 멤버의 닉네임을 리스트에 추가합니다.
//            for (Performance performance : performances) {
//                // 공연에 참여한 멤버들을 조회합니다.
//                List<Performer> relatedPerformers =
//                    performerRepository.findByPerformance_PerformanceId(performance.getPerformanceId());
//                for (Performer performer : relatedPerformers) {
//                    nicknames.add(performer.getMember().getUserNickname());
//                }
//            }
//            // UserResDto 객체를 생성하고, 공연 정보와 닉네임 리스트를 설정합니다.
//            UserResDto userResDto = new UserResDto();
//            userResDto.setPerformances(performances);
//            userResDto.setNicknames(nicknames);
//            return userResDto;
//        } else {
//            // 멤버가 존재하지 않는 경우, 빈 UserResDto 객체를 반환합니다.
//            UserResDto userResDto = new UserResDto();
//            userResDto.setPerformances(Collections.emptyList());
//            userResDto.setNicknames(Collections.emptyList());
//            return userResDto;
//        }
//    }
    // 이메일으로 공연 조회
    public UserResDto getUserByEmail(String email) {
        Optional<Member> optionalMember = userRepository.findByUserEmail(email); // 이메일로 멤버 조회

        if (optionalMember.isPresent()) { // 멤버가 존재하면
            Member member = optionalMember.get();
            Long id = member.getId(); // 멤버의 (PK)id 추출
            //멤버의 PK로 연결된 공연 정보 조회
            List<Performer> performers = performerRepository.findByMember_Id(id);
            // Performer의 Performance를 가져와 리스트에 추가합니다.
            List<PerformanceDto> performanceDtos = performers.stream()
                    .map(performer -> {
                        Performance performance = performer.getPerformance();
                        Hibernate.initialize(performance); // 프록시 객체를 초기화합니다.
                        PerformanceDto performanceDto = convertEntityToDto(performance);
                        // 공연에 참여한 멤버들을 조회합니다.
                        List<Performer> relatedPerformers =
                                performerRepository.findByPerformance_PerformanceId(performance.getPerformanceId());
                        List<String> nicknames = relatedPerformers.stream()
                                .map(relatedPerformer -> relatedPerformer.getMember().getUserNickname())
                                .collect(Collectors.toList());
                        performanceDto.setNicknames(nicknames); // 닉네임 설정
                        return performanceDto;
                    })
                    .collect(Collectors.toList());
            // UserResDto 객체를 생성하고, 공연 정보를 설정합니다.
            UserResDto userResDto = new UserResDto();
            userResDto.setPerformances(performanceDtos);
//            // 다른 필드들을 null로 설정합니다.
//            userResDto.setUserEmail(null);
//            userResDto.setUserPasswword(null);
//            userResDto.setUserNickname(null);
//            userResDto.setUserName(null);
//            userResDto.setUserAddr(null);
//            userResDto.setUserPhone(null);
//            userResDto.setUserGen(null);
//            userResDto.setUserAge(null);
//            userResDto.setUserPoint(null);
//            userResDto.setAuthority(null);
//            userResDto.setBUSINESS_NUM(null);
            return userResDto;
        } else {
            // 멤버가 존재하지 않는 경우, 빈 UserResDto 객체를 반환합니다.
            UserResDto userResDto = new UserResDto();
            userResDto.setPerformances(Collections.emptyList());
            return userResDto;
        }
    }

    //이메일로 유저 조회
    public Member getUserInfoByEmail(String email) {
        Optional<Member> optionalMember = userRepository.findByUserEmail(email); // 이메일로 멤버 조회
        if (optionalMember.isPresent()) { // 멤버가 존재하면
            Member member = optionalMember.get();
            return member;
        } else {
            return null;
        }
    }

    // 조영준
    public List<PerformanceDto> getPerformanceComercial() {

        try {
            // 데이터 베이스 정보
            List<Performance> performanceList = performanceRepository.findAll();
            log.info("메인 페이지 광고 영역 : {}",performanceList);
            // DTO list
            List<PerformanceDto> performanceDtoList = new ArrayList<>();
            // nicknames


            // 리스트 안의 객체 하나하나 조회
            for (Performance performance : performanceList) {
                // 객체 하나의 아이디 값 참조
                Long id = performance.getPerformanceId();
                // 공연자 정보 조회
                List<Performer> performerList = performerRepository.findByPerformance_PerformanceId(id);
                System.out.println("performerList 공연자 리스트 : " + performerList);
                // 닉네임 리스트 생성
                List<String> nicknames = new ArrayList<>();
                for (Performer performer : performerList) {
                    // 공연자 개인의 닉네임 조회
                    String nickName = performer.getMember().getUserNickname();
                    nicknames.add(nickName);
                    System.out.println("공연자 닉네임 리스트 : " + nicknames);
                }
                // 엔티티를 DTO로 
                PerformanceDto performanceDto = convertEntityToDto(performance);
                performanceDto.setNicknames(nicknames);
                // DTO를 List 에 저장
                performanceDtoList.add(performanceDto);
            }


            log.info("performanceDtoList_mainpage : {}",performanceDtoList);
            return performanceDtoList;
        }
        catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
