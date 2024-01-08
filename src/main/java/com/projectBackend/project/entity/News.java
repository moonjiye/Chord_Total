package com.projectBackend.project.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "news")
@Getter
@Setter
@ToString
public class News {
    // 해당 필드가 테이블의 기본 키임을 나타냄. 모든 엔티티 클래스에서 기본키 필드는 반드시 하나 있어야 하는데 @Id 어노테이션을 사용하여 이를 지정함.
    @Id
    // 'news_id' 컬럼은 'newsId' 필드에 매핑
    @Column(name = "news_id")
    // 테이블의 기본 키를 자동으로 생성하도록 지시
    // 기본 키에 대해 자동 생성을 원하는 경우, @Id와 @GeneratedValue를 함께 사용. 경우에 따라 @GeneratedValue는 생략가능.
    @GeneratedValue(strategy = GenerationType.SEQUENCE , generator = "news_seq")
    // 테이블의 컬럼들을 의미, 해당 컬럼의 데이터를 저장하거나 검색하는데 사용
    private Long newsId;
    private String newsTitle;
    private String newsImage;
    private String newsLikes;
    private String newsLink;
}