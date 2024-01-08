package com.projectBackend.project.controller;

import com.projectBackend.project.dto.MusicHeartDto;
import com.projectBackend.project.service.MusicHeartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
//@CrossOrigin(origins = CORS_ORIGIN)
@RestController
@RequestMapping("/musiclike")
@RequiredArgsConstructor
public class MusicHeartController {

    private final MusicHeartService musicHeartService;



    @PostMapping("/like")
    public ResponseEntity<Integer> musicHeart(@RequestBody MusicHeartDto musicHeartDto) {

        int result = musicHeartService.likeMusic(musicHeartDto);
        return ResponseEntity.ok(result);

    }
}
