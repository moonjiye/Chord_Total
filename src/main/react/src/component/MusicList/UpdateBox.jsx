import React, { useState } from "react";
import MusicAxiosApi from "../../axios/MusicAxios";
import { storage } from "../../api/firebase";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import firebase from "firebase/compat/app";
// import "firebase/compat/storage";
import styled from "styled-components";
import {
  UpdateZone,
  InputBox,
  Button,
  InputContainer,
  InputContainer02,
  InputContainer01,
  Terms,
  TermsTitle,
  Term01,
  Term02,
  SingName,
  Singer,
  Composer,
  Lyricist,
  Genre,
  Purpose,
  CategoryText,
  TitleText,
  GenreButtonBox,
  GenreButton,
  PurposeButtonBox,
  PurposeButton,
  Musicimg,
  Musicimg01,
  Musicfile,
  Musicfile01,
  TitleUploadButton,
  SingInfo,
  Lyrics,
  TextArea,
} from "../../style/music/MusicUpdateStyle";

const UploadButton = styled.button`
  background-color: #008bff;
  color: white;

  padding: 1rem 4rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const FileUploadButton = styled.button`
  background-color: #008bff;
  color: white;
  padding: 1rem 4rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const UpdateBox = () => {
  // 입력값 정보 저장
  const [inputSingName, setinputSingName] = useState(""); // 노래제목
  const [inputSinger, setinputSinger] = useState(""); // 활동명
  const [userNickName, setUserNickName] = useState(""); // 사용자 닉네임 상태
  const [inputComposer, setinputComposer] = useState(""); // 작곡가이름
  const [inputLyricist, setinputLyricist] = useState(""); // 작사가이름
  const [selectedGenre, setSelectedGenre] = useState(""); // 장르선택
  const [selectedPurpose, setSelectedPurpose] = useState(""); // 목적선택
  const [inputSingInfo, setinputSingInfo] = useState(""); // 곡소개
  const [inputLyrics, setinputLyrics] = useState(""); // 가사
  const userBusiness = window.localStorage.getItem("business_num");
  //앨범이미지 등록
  const [inputimgfile, setinputimgFile] = useState(""); //앨범 이미지 입력값
  const [imgfileName, setimgFileName] = useState(""); // 앨범 이미지 이름
  const [url, setUrl] = useState(""); // 앨범 이미지 url
  const [selectedFile, setFile] = useState(null);
  const [Titleimg, setTitleimg] = useState(""); // 앨범이미지
  const [previewImage, setPreviewImage] = useState(null); //미리보기

  //앨범노래 등록
  const [inputfile, setinputFile] = useState(""); //앨범 노래 입력값]

  const [isOpenModal, setIsOpenModal] = useState(false);
  //약관동의체크
  const [termsAgreed, setTermsAgreed] = useState(false);

  //등록시킨 음악 ID
  const [musicId, setMusicId] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  //장르 선택 기능
  const handleGenreSelection = (genre) => {
    if (selectedGenre === genre) {
      setSelectedGenre(""); // 이미 선택된 장르를 다시 클릭하면 선택 취소
    } else {
      setSelectedGenre(genre); // 선택되지 않은 장르를 선택하면 해당 장르로 변경
    }
  };

  //목적 선택 기능
  const handlePurposeSelection = (purpose) => {
    // 목적이 '영리'이면 모달 열기
    if (purpose === "영리") {
      setSelectedPurpose(purpose);
      alert("영리 목적은 사업자 등록이 필요합니다");
    } else {
      setSelectedPurpose(purpose); // 선택된 목적 업데이트
    }
  };

  //이미지 업로드 함수
  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadClick = async () => {
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(selectedFile.name);

      // 파일을 업로드하고 기다립니다.
      await fileRef.put(selectedFile);
      console.log("File uploaded successfully!");

      // 다운로드 URL을 가져오고 기다립니다.
      const url = await fileRef.getDownloadURL();

      console.log("저장경로 확인 : " + url);

      // 상태를 업데이트합니다.
      setUrl(url);
    } catch (error) {
      // 에러를 처리합니다.
      console.error("Upload failed", error);
    }
  };

  const handlefileUploadClick = async () => {
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(selectedFile.name);

      // 파일을 업로드하고 기다립니다.
      await fileRef.put(selectedFile);
      console.log("File uploaded successfully!");

      // 다운로드 URL을 가져오고 기다립니다.

      const inputfile = await fileRef.getDownloadURL();
      console.log("저장경로 확인: " + inputfile);

      // 상태를 업데이트합니다.

      setinputFile(inputfile);
    } catch (error) {
      // 에러를 처리합니다.
      console.error("Upload failed", error);
    }
  };

  // 음악 등록 버튼 활성화 여부
  const isMusicUploadEnabled =
    inputSingName &&
    inputSinger &&
    inputComposer &&
    inputLyricist &&
    selectedGenre &&
    selectedPurpose &&
    inputSingInfo &&
    inputLyrics &&
    termsAgreed;

  // 음악 등록 버튼 클릭시 실행되는 함수[등록방식 까먹지 말기..]
  const onClickSetMusic = async () => {
    if (isMusicUploadEnabled) {
      if (!termsAgreed) {
        alert("약관에 동의해주세요.");
        return;
      }

      try {
        const MusicUploadData = await MusicAxiosApi.addMusic(
          inputSingName,
          inputSinger,
          inputComposer,
          inputLyricist,
          selectedGenre,
          inputSingInfo,
          inputLyrics,
          url,
          inputfile
        );
        console.log("음악 등록 결과:", MusicUploadData);
        const id = MusicUploadData.id;

        // 음악 등록 성공 시 알림창 표시
        if (
          window.confirm(
            "음악이 성공적으로 등록되었습니다. 음악 리스트로 이동하시겠습니까?"
          )
        ) {
          navigate("/music-list"); // 확인을 누를 경우 music-list 페이지로 이동
        }
      } catch (error) {
        alert("음악 등록 중 오류가 발생했습니다.");
        console.error("음악 등록 오류:", error.message);
      }
    } else {
      alert("빠진 입력 사항이 없는지 확인해주세요.");
      console.error("음악 등록이 불가능합니다. 필수 입력값을 확인해주세요.");
    }
  };

  return (
    <>
      <UpdateZone>
        <h1>음원 등록하기</h1>
        <InputContainer>
          <InputContainer01>
            <SingName>
              <CategoryText>노래명</CategoryText>
              <InputBox
                placeholder="등록할 노래 제목 입력"
                value={inputSingName}
                onChange={(e) => setinputSingName(e.target.value)}
              />
              {inputSingName.length > 0 && inputSingName.length < 8}
            </SingName>

            <Singer>
              <CategoryText>가수</CategoryText>
              <InputBox
                placeholder="여러분의 닉네임을 적어주세요" //유저닉네임
                value={inputSinger}
                onChange={(e) => setinputSinger(e.target.value)}
              />
              {inputSinger.length > 0 && inputSinger.length < 8}
            </Singer>

            <Composer>
              <CategoryText>작곡가</CategoryText>
              <InputBox
                placeholder="작곡가 이름 입력"
                value={inputComposer}
                onChange={(e) => setinputComposer(e.target.value)}
              />
              {inputComposer.length > 0 && inputComposer.length < 8}
            </Composer>

            <Lyricist>
              <CategoryText>작사가</CategoryText>
              <InputBox
                placeholder="작사가 이름 입력"
                value={inputLyricist}
                onChange={(e) => setinputLyricist(e.target.value)}
              />
              {inputLyricist.length > 0}
            </Lyricist>

            <Genre>
              <CategoryText>장르</CategoryText>
              <GenreButtonBox>
                <GenreButton
                  onClick={() => handleGenreSelection("발라드")}
                  active={selectedGenre === "발라드" ? "selected" : ""}
                >
                  발라드
                </GenreButton>
                <GenreButton
                  onClick={() => handleGenreSelection("락/메탈")}
                  active={selectedGenre === "락/메탈" ? "selected" : ""}
                >
                  락/메탈
                </GenreButton>
                <GenreButton
                  onClick={() => handleGenreSelection("포크/블루스")}
                  active={selectedGenre === "포크/블루스" ? "selected" : ""}
                >
                  포크/블루스
                </GenreButton>
                <GenreButton
                  onClick={() => handleGenreSelection("R&B/SOUL")}
                  active={selectedGenre === "R&B/SOUL" ? "selected" : ""}
                >
                  R&B/SOUL
                </GenreButton>
                <GenreButton
                  onClick={() => handleGenreSelection("힙합/랩")}
                  active={selectedGenre === "힙합/랩" ? "selected" : ""}
                >
                  힙합/랩
                </GenreButton>
                <GenreButton
                  onClick={() => handleGenreSelection("어쿠스틱")}
                  active={selectedGenre === "어쿠스틱" ? "selected" : ""}
                >
                  어쿠스틱
                </GenreButton>
                <GenreButton
                  onClick={() => handleGenreSelection("트로트")}
                  active={selectedGenre === "트로트" ? "selected" : ""}
                >
                  트로트
                </GenreButton>
                <GenreButton
                  onClick={() => handleGenreSelection("기타")}
                  active={selectedGenre === "기타" ? "selected" : ""}
                >
                  기타
                </GenreButton>
              </GenreButtonBox>
            </Genre>

            <Purpose>
              <CategoryText>목적</CategoryText>
              <PurposeButtonBox>
                <PurposeButton
                  onClick={() => handlePurposeSelection("영리")}
                  active={selectedPurpose === "영리" ? "selected" : ""}
                >
                  영리
                </PurposeButton>

                <PurposeButton
                  onClick={() => handlePurposeSelection("비영리")}
                  active={selectedPurpose === "비영리" ? "selected" : ""}
                >
                  비영리
                </PurposeButton>
              </PurposeButtonBox>
            </Purpose>
          </InputContainer01>

          <InputContainer02>
            <Musicimg>
              <Musicimg01>
                <TitleText>타이틀 이미지</TitleText>
                <InputBox type="file" onChange={handleFileInputChange} />
              </Musicimg01>
              <UploadButton onClick={handleUploadClick}>Upload</UploadButton>
              {/* <TitleUploadButton onClick={handleUploadClick}>
                업로드
              </TitleUploadButton> */}
            </Musicimg>

            <Musicfile>
              <Musicfile01>
                <TitleText>음원등록</TitleText>
                <InputBox type="file" onChange={handleFileInputChange} />
              </Musicfile01>
              <FileUploadButton onClick={handlefileUploadClick}>
                Upload
              </FileUploadButton>
              {/* <TitleUploadButton onClick={handleUploadClick}>
                업로드
              </TitleUploadButton> */}
            </Musicfile>

            <SingInfo>
              <CategoryText>곡소개</CategoryText>
              <InputBox
                placeholder="곡에 대한 간략한 설명"
                value={inputSingInfo}
                onChange={(e) => setinputSingInfo(e.target.value)}
              />
              {inputSingInfo.length > 0 && inputSingInfo.length < 30}
            </SingInfo>

            <Lyrics>
              <CategoryText>가사</CategoryText>
              <TextArea
                placeholder="가사를 등록해주세요"
                value={inputLyrics}
                onChange={(e) => setinputLyrics(e.target.value)}
                style={{ whiteSpace: "pre-wrap" }}
              />
              {inputLyrics.length > 0 && inputLyrics.length < 11000}
            </Lyrics>
          </InputContainer02>

          <Terms>
            <TermsTitle>약관동의</TermsTitle>
            <Term01>
              서비스 이용 및 저작권 관련 약관
              <input
                type="checkbox"
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
              />
            </Term01>

            <Term02>
              판매수익 지급 및 분배 동의
              <input
                type="checkbox"
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
              />
            </Term02>
          </Terms>
        </InputContainer>

        {/* 등록 버튼 */}
        <div className="buttonContainer">
          <Button enabled={isMusicUploadEnabled} onClick={onClickSetMusic}>
            등록하기
          </Button>
        </div>
      </UpdateZone>
    </>
  );
};

export default UpdateBox;
