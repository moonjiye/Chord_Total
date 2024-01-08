package com.projectBackend.project.dto;

import com.projectBackend.project.constant.Authority;
import com.projectBackend.project.entity.Member;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Slf4j
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserReqDto {
    private String userEmail;
        private String userPassword;
    private String userNickname;
    private String userName;
    private String userAddr;
    private String userDetailAddr;

    private String userPhone;
    private String userGen;
    private int userAge;
    private int userPoint;

    private String profileImg;
    private String BUSINESS_NUM;
    @Enumerated(EnumType.STRING)
    private Authority authority;

    private PasswordEncoder passwordEncoder;

    // MemberReqDto -> Member
    public Member toEntity(PasswordEncoder passwordEncoder) {
        return Member.builder()
                .email(userEmail)
                .password(passwordEncoder.encode(userPassword))
                .name(userName)
                .addr(userAddr)
                .tel(userPhone)
                .nickName(userNickname)
                .age(userAge)
                .gender(userGen)
                .point(userPoint)
                .profileImg(profileImg)
                .BUSINESS_NUM(BUSINESS_NUM)
                .authority(Authority.ROLE_USER)
                .build();
    }

    public UsernamePasswordAuthenticationToken toAuthentication() {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userEmail, userPassword);
        System.out.println("승인 이메일 :" + userEmail);
        System.out.println("승인 비밀번호 :" + userPassword);
        System.out.println("승인 토큰 :" + authenticationToken.isAuthenticated());
        System.out.println("승인 토큰 :" + authenticationToken);
        log.warn("Authentication Token Created: {}", authenticationToken);
        return authenticationToken;
    }
}
