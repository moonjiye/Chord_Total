package com.projectBackend.project.service;

import com.projectBackend.project.dto.MusicDTO;
import com.projectBackend.project.dto.MusicHeartDto;
import com.projectBackend.project.dto.MusicUserDto;
import com.projectBackend.project.dto.UserResDto;
import com.projectBackend.project.entity.Member;
import com.projectBackend.project.entity.Music;
import com.projectBackend.project.entity.MusicHeart;
import com.projectBackend.project.jwt.TokenProvider;
import com.projectBackend.project.repository.MusicHeartRepository;
import com.projectBackend.project.repository.MusicRepository;
import com.projectBackend.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MusicHeartService {

    private final MusicHeartRepository musicHeartRepository;
    private final MusicRepository musicRepository;
    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;
//    private final MusicDTO musicDTO;


    // 해당 사용자가 음악에 좋아요를 누를 때 실행되는 메서드
    public int likeMusic(MusicHeartDto musicHeartDto) {
        //회원을 인식하기 위해 프론트에서 넘어온 dto에서 이메일 값을 뽑아오기.
        String email = musicHeartDto.getUserEmail();
        log.info("email : {}",email);
        //이메일 값을 통해, 회원 객체를 뽑아오기(db row)
        Optional<Member> memberOptional = userRepository.findByUserEmail(email);
        log.info("memberOptional : {}",memberOptional);
        if (memberOptional.isPresent()) {
            Member memberdata = memberOptional.get();
            //객체 안에서 userid를 찾아오기.
            Long userId = memberdata.getId();
            log.info("userId : {}", userId);
            Long musicId = musicHeartDto.getMusicId();
            log.info("musicId : {}", musicId);
            // 음악 객체(DB row)

            Optional<Music> musicOptional = musicRepository.findById(musicId);
            Music music = musicOptional.get();
            Optional<Member> optionalMember = userRepository.findById(userId);
            Member member = optionalMember.get();

            // 하트 전체정보를 리스트로
            List<MusicHeart> musicHearts = musicHeartRepository.findByMusic_MusicId(musicId);
            log.info("music heart list : {}",musicHearts);
            // 중복 체크를 위한 user id 리스트
            List<Long> userIdList = new ArrayList<>();
            for (MusicHeart musicHeart : musicHearts) {
                Long memberId = musicHeart.getMember().getId();
                userIdList.add(memberId);
                log.info("userIdList : {}",userIdList);
            }
            if (userIdList.contains(userId)) {
                // 리스트안에 해당 아이디가 존재 => 이미 좋아요를 누른 상태
                log.info("isContain : {}",userIdList.contains(userId));
                // 좋아여 삭제
                musicHeartRepository.deleteByMusic_MusicIdAndMember_UserId(musicId,userId);
                // 삭제된 데이터 반영
                List<MusicHeart> newMusicHearts = musicHeartRepository.findByMusic_MusicId(musicId);
                log.info("newMusicHearts : {}",newMusicHearts);
                int heartCount = newMusicHearts.size();
                log.info("heartCount : {}", heartCount);
                return heartCount;
            }
            else {
                // 좋아요을 누르지 않은 상태
                System.out.println("isNotContain :" + userIdList.contains(userId));
                //좋아요 추가
                MusicHeart musicHeart = new MusicHeart();
                musicHeart.setMember(member);
                musicHeart.setMusic(music);
                musicHeartRepository.save(musicHeart);
                // 좋아요 추가 반영
                List<MusicHeart> newMusicHearts = musicHeartRepository.findByMusic_MusicId(musicId);
                log.info("newMusicHearts : {}",newMusicHearts);
                int heartCount = newMusicHearts.size();
                log.info("heartCount : {}", heartCount);
                return heartCount;
            }
        }
        else {
            return 0;
        }
    }

    // 조영준
    // 음악의 총 좋아요 수
    public int getAllHeart (Long musicId) {
        List<MusicHeart> musicHeartList = musicHeartRepository.findByMusic_MusicId(musicId);
        return musicHeartList.size();
    }


    // 조영준
    // 회원의 총 좋아요 수
    public int getUserAllHeart (String token) {
        // 토큰에서 이메일 파싱
        String email = tokenProvider.getUserEmail(token);
        // 이메일의 회원 id 조회
        Optional<Member> member = userRepository.findByUserEmail(email);
        if(member.isPresent()) {
            Member user = member.get();
            Long userId =  user.getId();
            // 회원 아이디로 등록된 음악들 조회
            List<Music> musics = musicRepository.findByMemberId(userId);
            // 음악들의 아이디를 조회하여 각각의 좋아요를 조회 및 리스트로 설정
            List<Long> musicIds = new ArrayList<>();
            for (Music music : musics) {
                Long musicId = music.getMusicId();
                musicIds.add(musicId);
            }
            // 음악 아이디 리스트의 아이디 값으로 좋아요 수를 조회
            int heartCount = 0;
            for (Long id : musicIds) {
                List<MusicHeart> musicHearts = musicHeartRepository.findByMusic_MusicId(id);
                int heart = musicHearts.size();
                heartCount += heart;
            }
            System.out.println("heartCount : " + heartCount);
            return heartCount;
        }
        else {
            return 0;
        }
    }

    // 조영준 회원의 성별 좋아요
    public List<MusicUserDto> getGenderList(String token) {
        // 로그인한 회원의 성별 조회
        // 토큰에서 이메일 파싱
        String email = tokenProvider.getUserEmail(token);
        Optional<Member> member = userRepository.findByUserEmail(email);
        if (member.isPresent()) {
            // 파싱한 이메일로 회원 정보 조회
            Member user = member.get();
            // 회원의 성별 조회
            String gender = user.getUserGen();

            // 회원의 성별과 동일한 성별의 좋아요 리스트
            List<MusicHeart> musicHearts = musicHeartRepository.findByMember_UserGen(gender);
            // 좋아요 리스트에서 음악 리스트로 변경
            List<MusicUserDto> musicUserDtos = new ArrayList<>();

            for (MusicHeart musicHeart : musicHearts) {
                Music music = musicHeart.getMusic();
                Member musician = musicHeart.getMember();
                UserResDto userResDto = UserResDto.of(musician);
                MusicDTO musicDTO = MusicDTO.of(music);

                MusicUserDto musicUserDto = new MusicUserDto();
                musicUserDto.setMusicDTO(musicDTO);
                musicUserDto.setUserResDto(userResDto);

                musicUserDtos.add(musicUserDto);
            }
            return musicUserDtos;
        }
        else {
            return null;
        }
    }





}
