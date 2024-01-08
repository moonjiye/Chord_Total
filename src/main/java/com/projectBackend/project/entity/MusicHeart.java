package com.projectBackend.project.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "musicheart")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MusicHeart {
    @Id
    @Column(name = "heartChecker_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long heartCheckerId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "music_id") // 외래키
    private Music music;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id") // 외래키
    private Member member;
}
