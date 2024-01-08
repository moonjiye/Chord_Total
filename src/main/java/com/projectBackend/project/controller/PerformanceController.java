package com.projectBackend.project.controller;


import com.projectBackend.project.dto.PerformanceDto;
import com.projectBackend.project.dto.UserResDto;
import com.projectBackend.project.entity.Member;
import com.projectBackend.project.service.AuthService;
import com.projectBackend.project.service.PerformanceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//import static com.projectBackend.project.utils.Common.CORS_ORIGIN;



@Slf4j
@RestController
@RequestMapping("/performance")
@RequiredArgsConstructor
public class PerformanceController {
    private final PerformanceService performanceService;
    private final AuthService authService;

    // 공연 전체 조회 -
    @GetMapping("/list")
    public ResponseEntity<List<PerformanceDto>> performanceList() {
        System.out.println("컨트롤러 performanceList");
        List<PerformanceDto> list = performanceService.getPerformanceList();
        return ResponseEntity.ok(list);
    }

    // 공연 등록
    @PostMapping("/new")
    public ResponseEntity<Boolean> performanceRegister(@RequestBody PerformanceDto performanceDto) {
        System.out.println("PerformanceController 공연 등록");
        boolean isTrue = performanceService.savePerformance(performanceDto);
        return ResponseEntity.ok(isTrue);
    }


    // 공연 전체 삭제
//    @DeleteMapping("/delete")
//    public ResponseEntity<Boolean> performanceDelete() {
//        System.out.println("PerformanceController 공연 삭제");
//        performanceService.deleteAll();
//        return ResponseEntity.ok(true);
//    }

    // 공연 삭제
    @DeleteMapping("/delete/{performanceId}")
    public ResponseEntity<Boolean> performanceDelete(@PathVariable Long performanceId) {
        System.out.println("PerformanceController 공연 삭제");
        performanceService.deletePerformance(performanceId);
        return ResponseEntity.ok(true);
    }

    // 페이지네이션 -
    @GetMapping("/list/page")
    public ResponseEntity<List<PerformanceDto>> performanceList(@RequestParam(defaultValue = "0") int page,
                                                                @RequestParam(defaultValue = "10") int size) {
        System.out.println("PerformanceController 페이지네이션");
        List<PerformanceDto> list = performanceService.getPerformanceList(page, size);
        log.info("list : {}", list);
        return ResponseEntity.ok(list);
    }

    // 페이지 수 조회 -
    @GetMapping("/list/count")
    public ResponseEntity<Integer> performancePage(@RequestParam(defaultValue = "0") int page,
                                                   @RequestParam(defaultValue = "10") int size) {
        System.out.println("PerformanceController 페이지수 조회");
        PageRequest pageRequest = PageRequest.of(page, size);
        int count = performanceService.getPerformancePage(pageRequest);
        return ResponseEntity.ok(count);
    }

    // 토큰으로 공연조회
//    @GetMapping("/infoByToken")
//    public UserResDto getUserInfoByToken(@RequestHeader("Authorization") String token) {
//        System.out.println("PerformanceController 토큰으로 공연조회");
//        return performanceService.getUserPerformanceInfo(token);
//    }

    // 이메일로 공연조회
    @GetMapping("/infoByEmail")
    public UserResDto getUserInfoByEmail(@RequestParam String email) {
        System.out.println("PerformanceController 이메일로 공연조회");
        return performanceService.getUserByEmail(email);
    }


    // 회원닉네임 전체조회
//    @GetMapping("/nick")
//    public ResponseEntity<List<UserDto>> performanceList() {
//        System.out.println("컨트롤러 performanceList");
//        List<PerformanceDto> list = performanceService.getPerformanceList();
//        return ResponseEntity.ok(list);
//    }

    // 장현준, 전체유저리스트
    @GetMapping("/userList")
    public ResponseEntity<List<Member>> userList() {
        System.out.println("컨트롤러 userList");
        List<Member> list = authService.getUserList();
        return ResponseEntity.ok(list);
    }

    // 전체유저리스트,노토큰
    @GetMapping("/userListNoToken")
    public ResponseEntity<List<Member>> userListNoToken() {
        System.out.println("컨트롤러 userList");
        List<Member> list = authService.getUserList();
        return ResponseEntity.ok(list);
    }

    // 장현준, 이메일로 유저조회
    @GetMapping("/userByEmail")
    public Member getUserByEmail(@RequestParam String email) {
        System.out.println("PerformanceController 이메일로 유저조회");
        return performanceService.getUserInfoByEmail(email);
    }

}



