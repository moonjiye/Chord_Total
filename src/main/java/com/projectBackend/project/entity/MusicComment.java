package com.projectBackend.project.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@Getter
@Setter
@ToString
@Table(name = "musiccomment")
@NoArgsConstructor
public class MusicComment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long musiccommentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "music_id") // 외래키
    private Music music;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id") // 외래키
    private Member member;


    @Column(length = 1000)
    private String content;
}
