package com.projectBackend.project.entity;



import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "music")
@Getter  @Setter @ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Music {
    @Id
    @Column(name = "music_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long musicId;

    @Column(name = "music_title")
    private String musicTitle;

    @Column(name = "lyricist")
    private String lyricist;

    @Column(name = "composer")
    private String composer;

    @Column(name = "genre")
    private String genre;

    @Column(name = "purchase_count")
    private int purchaseCount;

    @Column(name = "lyrics")
    private String lyrics;

    @Column(name = "release_date")
    private LocalDate releaseDate;

    @Column(name = "thumbnail_img")
    private String thumbnailImage;


    @Column(name = "heart_count")
    private int heartCount;

    @Column(name = "music_file")
    private String musicFile;

    @Column(name = "music_info")
    private String musicInfo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id") // 외래 키 지정
    private Member member;


}
