package com.projectBackend.project.controller;

import com.projectBackend.project.constant.Authority;
import com.projectBackend.project.dto.TokenDto;
import com.projectBackend.project.dto.UserReqDto;
import com.projectBackend.project.dto.UserResDto;
import com.projectBackend.project.entity.Member;
import com.projectBackend.project.entity.Token;
import com.projectBackend.project.jwt.TokenProvider;
import com.projectBackend.project.service.KakaoService;
import com.projectBackend.project.service.AuthService;
import com.projectBackend.project.service.MailService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;

import org.springframework.web.bind.annotation.*;


import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

import static com.projectBackend.project.service.MailService.EPW;

@Slf4j
@RestController
@Setter
@Getter
@ToString
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    private final KakaoService kakaoService;
    private final TokenProvider tokenProvider;
    private final MailService mailService;


    // 회원가입
    @PostMapping("/sign")
    public ResponseEntity<UserResDto> sign(@RequestBody UserReqDto memberReqDto) {
        log.warn("memberReqDto {} :", memberReqDto);
        UserResDto result = authService.signup(memberReqDto);
        System.out.println(result);
        return ResponseEntity.ok(result);
    }

    // 회원 가입 시 이메일 인증 + 중복 체크
    @PostMapping("/mailConfirm")
    public ResponseEntity<Boolean> mailConfirm(@RequestParam String email) throws Exception {
        boolean isTrue = mailService.sendSimpleMessage(email);
        System.out.println("인증코드 T or F : " + isTrue);
        return ResponseEntity.ok(isTrue);
    }

    // 인증 번호 체크, post 방식만 허용하는 듯.
    @GetMapping("/ePw")
    public ResponseEntity<Boolean> checkEpw(@RequestParam String epw) {
        System.out.println("프론트에서 날린 epw" + epw);
        if (epw.equals(EPW)) {
            return ResponseEntity.ok(true);
        }
        else {
            return ResponseEntity.ok(false);
        }
    }

    // 닉네임 중복 체크
    @GetMapping("/nickName")
    public ResponseEntity<Boolean> nickName(@RequestParam String nickName) {
        return ResponseEntity.ok(authService.isNickName(nickName));
    }

    // 카카오 로그인 및 이메일 발급
    @GetMapping("/kakao")
    public ResponseEntity<String> kakao(@RequestParam String code) {
        log.info("code {} : ", code);
        String email = kakaoService.kakaoToken(code);
        return ResponseEntity.ok(email);
    }

    // 카카오 로그인 이후 토큰 발급
    @GetMapping("/kakaoToken")
    public ResponseEntity<TokenDto> kakaoToken(@RequestParam String email) {
        TokenDto tokenDto = authService.kakaoLogin(email);
        return ResponseEntity.ok(tokenDto);
    }

    // 이메일 중복 체크
    @GetMapping("/email")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        boolean isTrue = authService.isEmail(email);
        return ResponseEntity.ok(isTrue);
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody UserReqDto userReqDto) {
        TokenDto tokenDto = authService.login(userReqDto);
        return ResponseEntity.ok(tokenDto);
    }


    // 관리자 로그인
    @PostMapping("/addmin")
    public ResponseEntity<TokenDto> adminLogin(@RequestBody UserReqDto userReqDto) {
        return ResponseEntity.ok(authService.admin(userReqDto));
    }

    // 이메일 찾기 -> 닉네임으로
    @GetMapping("/find")
    public ResponseEntity<String> findEmail(@RequestParam String nickname) {

        return ResponseEntity.ok(authService.getEmail(nickname));
    }

    // 비밀 번호 변경
    @PostMapping("/change/password")
    public ResponseEntity<Boolean> changePassword(@RequestBody UserReqDto userReqDto ) {
        return ResponseEntity.ok(authService.changePassword(userReqDto));
    }

    // accessToken 재발급
    @PostMapping("/refresh")
    public ResponseEntity<String> refreshToken(@RequestBody String refreshToken) {
        log.info("refreshToken: {}", refreshToken);
        return ResponseEntity.ok(authService.createAccessToken(refreshToken));
    }

    @GetMapping("/userList")
    public ResponseEntity<List<Member>> userList() {
        return ResponseEntity.ok(authService.getUserList());
    }

    // 길종환
    @GetMapping("/infoByToken")
    public UserResDto getUserInfoByToken(@RequestHeader("Authorization") String token) {
        return authService.getUserInfo(token);
    }

    @GetMapping("/infoByEmail")
    public Member getUserInfoByEmail(@RequestParam String email) {
        return authService.getUserByEmail(email);
    }


}
