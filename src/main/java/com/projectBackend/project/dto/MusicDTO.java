package com.projectBackend.project.dto;


import com.projectBackend.project.entity.Member;
import com.projectBackend.project.entity.Music;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MusicDTO {
    private Long id;

    private String musicTitle;
    private String userNickname;
    private String lyricist;
    private String composer;
    private String genre;
    private int purchaseCount;
    private String lyrics;
    private LocalDate releaseDate;
    private String thumbnailImage;
    private String musicFile;
    private int heartCount;
    private String musicInfo;


    // 생성자, 게터, 세터 등은 생략

    //MUSIC -> MUSICDTO
    public static MusicDTO of(Music music) {
        return MusicDTO.builder()
                .musicTitle(music.getMusicTitle())
                .userNickname(music.getMember().getUserNickname())
                .lyricist(music.getLyricist())
                .composer(music.getComposer())
                .genre(music.getGenre())
                .purchaseCount(music.getPurchaseCount())
                .lyrics(music.getLyrics())
                .releaseDate(music.getReleaseDate())
                .thumbnailImage(music.getThumbnailImage())
                .musicFile(music.getMusicFile())
                .heartCount(music.getHeartCount())
                .musicInfo(music.getMusicInfo())
                .build();
    }

    // MUSICDTO => MUSICENTITY
    public Music toEntity(Member member) {
        return Music.builder()
                .musicTitle(musicTitle)
                .lyricist(lyricist)
                .composer(composer)
                .genre(genre)
                .purchaseCount(purchaseCount)
                .lyrics(lyrics)
                .releaseDate(releaseDate) // LocalDate을 직접 사용합니다.
                .thumbnailImage(thumbnailImage)
                .musicFile(musicFile)
                .heartCount(heartCount) // 초기값은 0.
                .musicInfo(musicInfo)
                .member(member) // Member 객체를 이용하여 userNickname을 설정.
                .build();
    }



}



