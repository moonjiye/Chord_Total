package com.projectBackend.project.service;


import com.projectBackend.project.dto.MusicCommentDTO;
import com.projectBackend.project.entity.Member;
import com.projectBackend.project.entity.Music;
import com.projectBackend.project.entity.MusicComment;
import com.projectBackend.project.repository.MusicCommentRepository;
import com.projectBackend.project.repository.MusicRepository;
import com.projectBackend.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MusicCommentService {

    private final UserRepository userRepository;
    private final MusicRepository musicRepository;
    private final MusicCommentRepository musicCommentRepository;




    //댓글 등록
    public boolean MusicCommentRegister(MusicCommentDTO musicCommentDTO) {
        try {
            MusicComment musicComment = new MusicComment();
            //MusicComment 객체를 생성
            System.out.println("musiccom : " + musicComment);

            //musicRepository를 통해 주어진 musicId에 해당하는 음악찾기.
            Music music = musicRepository.findById(musicCommentDTO.getMusicId()).orElseThrow(
                    () -> new RuntimeException("해당 음악이 존재하지 않습니다.")
            );
            System.out.println("musicinfo : " + music);

            //userRepository를 통해 주어진 userEmail에 해당하는 회원찾기.
            String userEmail = musicCommentDTO.getUserEmail();
            Member member = userRepository.findByUserEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("해당 회원이 존재하지 않습니다."));
            System.out.println("member info : " + member);

            //찾은 음악, 회원, 그리고 MusicCommentDTO로부터 받은 내용으로 MusicComment 객체를 설정
            musicComment.setContent(musicCommentDTO.getContent());
            musicComment.setMember(member);
            musicComment.setMusic(music);
            musicComment.setMusiccommentId(musicComment.getMusiccommentId());

            musicCommentRepository.save(musicComment);
            //musicCommentRepository를 통해 새로 생성된 MusicComment 객체를 저장
            System.out.println("comment : " + musicComment);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }



    //댓글 수정

    public boolean MusicCommentModify(MusicCommentDTO musicCommentDTO) {
        try{
            MusicComment musicComment = musicCommentRepository.findById(musicCommentDTO.getMusiccommentId()).orElseThrow(
                    () -> new RuntimeException("해당 음악댓글이 존재하지 않습니다.")
            );

            musicComment.setContent(musicCommentDTO.getContent());
            musicCommentRepository.save(musicComment);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }



    //댓글 삭제
    public boolean MusicCommentDelete(Long musiccommentId) {
        try {
            MusicComment musicComment = musicCommentRepository.findById(musiccommentId).orElseThrow(
                    ()->new RuntimeException ( "해당 댓글이 존재하지 않습니다.")
            );
            musicCommentRepository.delete(musicComment);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    //댓글 목록 조회/
    public List<MusicCommentDTO> getMusicCommentList(Long musicId ) {
        try {
            // 주어진 musicId를 사용하여 음악을 찾음
            Music music = musicRepository.findById(musicId).orElseThrow(
                    () -> new RuntimeException("해당 음악이 존재하지 않습니다.")
            );
            // Music ID를 기반으로 음악 댓글을 가져오도록
            List<MusicComment> musicCommentList = musicCommentRepository.findByMusic_MusicId(musicId);
            // 댓글을 MusicCommentDTO로 변환하여 담을 리스트 생성
            List<MusicCommentDTO> musicCommentDTOList = new ArrayList<>();
            for (MusicComment musicComment : musicCommentList) {
                musicCommentDTOList.add(convertEntityToDto(musicComment));
            }
            return musicCommentDTOList; //MusicCommentDTO 리스트 반환
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    //댓글 검색
    public List<MusicCommentDTO> getMusicCommentSearch(String keyword) {
        List<MusicComment> musicCommentList = musicCommentRepository.findByContentContaining(keyword);
        List<MusicCommentDTO> musicCommentDTOList = new ArrayList<>();

        for (MusicComment musicComment : musicCommentList) {
            musicCommentDTOList.add(convertEntityToDto(musicComment));
        }
        return musicCommentDTOList;
    }


    //음악 댓글 엔티티를 Dto로 변환.
    private MusicCommentDTO convertEntityToDto(MusicComment musicComment) {
        // 새로운 MusicCommentDTO 객체 생성
        MusicCommentDTO musicCommentDTO = new MusicCommentDTO();

        // 음악 댓글의 정보를 MusicCommentDTO에 설정
        musicCommentDTO.setMusiccommentId(musicComment.getMusiccommentId()); // 댓글 ID 설정
        musicCommentDTO.setMusicId(musicComment.getMusic().getMusicId()); // 음악 ID 설정
        musicCommentDTO.setUserEmail(musicComment.getMember().getUserEmail()); // 사용자 이메일 설정
        musicCommentDTO.setUserNickname(musicComment.getMember().getUserNickname()); // 사용자 닉네임 설정
        musicCommentDTO.setContent(musicComment.getContent()); // 댓글 내용 설정
        // musicCommentDTO.setRegDate(musicComment.getRegDate()); // (비활성화된) 등록 날짜 설정

        return musicCommentDTO; // 설정된 MusicCommentDTO 반환
    }


    //음악 댓글 DTO를 MusicComment 객체로 변환
    private MusicComment convertToMusicComment(MusicCommentDTO musicCommentDTO) {
        // musicId를 사용하여 음악을 찾고, 없으면 예외 처리를 통해 메시지 출력
        Music music = musicRepository.findById(musicCommentDTO.getMusicId())
                .orElseThrow(() -> new RuntimeException("해당 음악이 존재하지 않습니다."));

        // userEmail을 사용하여 사용자를 찾고, 없으면 예외 처리를 통해 메시지 출력
        Member member = userRepository.findByUserEmail(musicCommentDTO.getUserEmail())
                .orElseThrow(() -> new RuntimeException("해당 회원이 존재하지 않습니다."));

        // 새로운 MusicComment 객체 생성
        MusicComment musicComment = new MusicComment();

        // 음악 댓글에 대한 정보 설정
        musicComment.setMusic(music); // 댓글이 속하는 음악 설정
        musicComment.setMember(member); // 댓글을 작성한 사용자 설정
        musicComment.setContent(musicCommentDTO.getContent()); // 댓글 내용 설정

        return musicComment; // 설정된 MusicComment 객체 반환
    }



}
