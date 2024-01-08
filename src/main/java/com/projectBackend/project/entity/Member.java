package com.projectBackend.project.entity;

import com.projectBackend.project.constant.Authority;
import lombok.*;

import javax.persistence.*;

// 해당 엔티티(클래스)의 이름은 User 가 아닌 Member
// 이미 jwt의 User가 존재하기 때문
@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "user")
public class Member {
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

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

    @Builder
    public Member(String email, String password, String nickName, String name, String addr, String userDetailAddr, String profileImg, String tel, String gender, String BUSINESS_NUM, int point, int age, Authority authority) {
        this.userEmail = email;
        this.userPassword = password;
        this.userNickname = nickName;
        this.userAddr = addr;
        this.userDetailAddr = userDetailAddr;
        this.userPhone = tel;
        this.BUSINESS_NUM = BUSINESS_NUM;
        this.userName = name;
        this.userGen = gender;
        this.userPoint = point;
        this.profileImg = profileImg;
        this.authority = authority;
        this.userAge = age;
    }


}
