import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import likeheart from "../../images/Heart.png";
import buyimg from "../../images/Basket.svg";
import artistImg from "../../images/Artist_2.png";
import commentsend from "../../images/commentsend.png";
import ReactAudioPlayer from "react-audio-player";
import MusicAxiosApi from "../../axios/MusicAxios";
import { Link } from "react-router-dom";
import ModalComponent from "../../component/musicList/MusicPurchaseModal";
import FooterContext from "../../context/FooterContext";
import { useContext } from "react";

const BackgroundContainer = styled.div`
  width: 100%;
  top: 2rem;
  height: 284rem;
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: white;
  align-items: center;
`;

const InfoContainer = styled.div`
  width: 120rem;
  height: 280rem;
  display: flex;
  position: relative;
  flex-direction: column;
  border-radius: 10rem;
  align-items: center;
  box-shadow: 0 1rem 3rem -0.5rem rgba(0, 0, 0, 0.25);

  @media (max-width: 1280px) {
    width: 80rem;
  }

  @media (max-width: 768px) {
    width: 40rem;
  }
`;

const TopInfoBox = styled.div`
  width: 110rem;
  max-width: 100%;
  height: 86rem;
  display: flex;
  position: relative;
  flex-direction: column;

  align-items: center;

  @media (max-width: 1280px) {
    width: 80rem;
  }

  @media (max-width: 768px) {
    width: 40rem;
  }
`;

const rotateAnimation = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;

const MusicImgBox = styled.div`
  width: 35rem;
  height: 35rem;
  position: relative;
  // left: 78.4rem;
  top: 14rem;
  box-shadow: 20px 20px 20px rgba(0, 0, 1, 0.8);
  border-radius: 50%;
  overflow: hidden;
  clip-path: circle(50% at 50% 50%);
  transition: transform 1s linear;
  ${(props) =>
    props.isPlaying &&
    css`
      animation: ${rotateAnimation} 15s linear infinite;
    `}
`;

const MusicImage = styled.img`
  width: 40rem;
  height: 40rem;
  border-radius: 50%;

  object-fit: cover;
  position: relative;
  left: -10%; /* 이미지 위치 조정 */
  top: -10%; /* 이미지 위치 조정 */
  z-index: 2;
  clip-path: circle(50% at 50% 50%);
`;

const MusicInnerCircle = styled.div`
  position: relative;
  width: 10rem;
  height: 10rem;
  background: rgba(22, 19, 19, 0.1);
  border: 1px solid black;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  clip-path: circle(50% at 50% 50%);
`;

const MusicName = styled.div`
  position: relative;
  display: flex;
  width: 32rem;
  height: 4.3rem;

  top: 15rem;
  align-items: center;
  justify-content: center;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 800;
  font-size: 4rem;
  line-height: 4.3rem;
  text-align: center;

  color: #000000;
`;

const MusicDefInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  justify-content: center;
  align-items: center;
  width: 32rem;
  height: 7rem;
  // left: 803px;
  top: 20rem;
`;

const SingerName = styled.div`
  font-family: "Noto Sans KR";
  display: flex;
  position: relative;
  font-style: normal;
  font-weight: 500;
  font-size: 2.4rem;
  line-height: 32px;
  text-align: center;

  color: #4296dc;
`;

const WriteInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 200;
  font-size: 1.8rem;
  line-height: 32px;
  text-align: center;

  color: black;
`;

const ComposerNamer = styled.div`
  font-family: "Noto Sans KR";
  display: flex;
  position: relative;
  font-style: normal;
  font-weight: 200;
  font-size: 1.8rem;
  line-height: 32px;
  text-align: center;

  color: black;
`;

const LyricistName = styled.div`
  font-family: "Noto Sans KR";
  display: flex;
  position: relative;
  font-style: normal;
  font-weight: 200;
  font-size: 1.8rem;
  line-height: 32px;
  text-align: center;

  color: black;
`;

const Genre = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 200;
  font-size: 1.8rem;
  line-height: 32px;
  text-align: center;

  color: black;
`;

const Infomation = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 200;
  font-size: 1.8rem;
  line-height: 32px;
  text-align: center;

  color: black;
`;

const BoxCon = styled.div`
  width: 44.6rem;
  height: 9.2rem;

  top: 24rem;
  display: flex;
  flex-direction: row;
  gap: 3.8rem;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const MusicLikeBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3rem;
  background: #ffffff;
  box-shadow: 0px 5.1px 19.18px -3.2px rgba(0, 0, 0, 0.3);
  width: 10rem;
  height: 5rem;
  font-size: 2rem;
  gap: 0.2rem;

  /* 호버 효과 스타일 */
  &:hover {
    cursor: pointer; /* 호버 시 마우스 커서 변경 */
    box-shadow: 0px 4px 8px white;
    transform: scale(1.1);
  }
`;

const LikeBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3rem;
  background: #ffffff;
  box-shadow: 0px 5.1px 19.18px -3.2px rgba(0, 0, 0, 0.3);
  width: 16rem;
  height: 5rem;
  font-size: 2rem;
  gap: 0.2rem;

  /* 호버 효과 스타일 */
  &:hover {
    cursor: pointer; /* 호버 시 마우스 커서 변경 */
    box-shadow: 0px 4px 8px white;
    transform: scale(1.1);
  }
`;

const LikeHeart = styled.img`
  width: 3rem;
  height: 3rem;
`;

const LikeCount = styled.div`
  font-size: 2rem;
`;

const BuyBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3rem;
  background: #ffffff;
  box-shadow: 0px 5.1px 19.18px -3.2px rgba(0, 0, 0, 0.3);
  width: 10rem;
  height: 5rem;
  font-size: 2rem;

  /* 호버 효과 스타일 */
  &:hover {
    cursor: pointer; /* 호버 시 마우스 커서 변경 */
    box-shadow: 0px 4px 8px white;
    transform: scale(1.1);
  }
`;

const BuyImg = styled.img`
  height: 3rem;
  width: 3rem;
`;

const PlayBox = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4rem;
  background: linear-gradient(180deg, #008bff, #61e6ca);
  box-shadow: 0px 5.1px 19.18px -3.2px rgba(0, 0, 0, 0.3);
  width: 10rem;
  border: none;
  height: 5rem;
  color: white;
  font-size: 4rem;
  line-height: 5rem; /* font-size와 동일하게 설정 */
  padding-left: 1.4rem; /* 필요에 따라 조정 */
  margin: 0; /* 필요에 따라 조정 */
  cursor: pointer;

  /* 호버 효과 스타일 */
  &:hover {
    cursor: pointer; /* 호버 시 마우스 커서 변경 */
    box-shadow: 0px 4px 8px white;
    transform: scale(1.1);
  }

  &:active {
    border: none;
  }
`;

const VolumeInput = styled.div`
  display: flex;
  position: relative;
  // bottom: 20px; /* 바닥과의 거리를 조정 */

  justify-content: center;

  top: 24rem;
`;

const BottomInfoBox = styled.div`
  height: 250rem;
  width: 110rem;
  display: flex;
  top: 22rem;
  flex-direction: column;
  position: relative;

  @media (max-width: 1280px) {
    width: 80rem;
  }

  @media (max-width: 768px) {
    width: 40rem;
  }
`;

const BottomTitle = styled.div`
  position: relative;
  display: flex;
  top: 18rem;
  color: #97b0aa;
  font-size: 4rem;
  width: 110rem;
  height: 6rem;
  align-items: center;
  justify-content: center;

  @media (max-width: 1280px) {
    width: 80rem;
  }

  @media (max-width: 768px) {
    width: 40rem;
  }
`;

const DetailInfoBox = styled.div`
  width: 110rem;
  height: 128rem;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;

  @media (max-width: 1280px) {
    width: 80rem;
  }

  @media (max-width: 768px) {
    width: 40rem;
  }
`;

const CoperateInfo = styled.div`
  width: 80rem;

  height: 60rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1280px) {
    width: 60rem;
  }

  @media (max-width: 768px) {
    width: 40rem;
  }
`;

const CopoerateTitle = styled.div`
  font-size: 3rem;
  font-weight: bold;
  top: 3rem;
  display: flex;
  position: relative;
  color: #008bff;
`;

const CopoeraterBox = styled.div`
  position: relative;
  width: 80rem;
  height: 40rem;
  display: grid;
  grid-template-rows: repeat(2, auto); /* 변경된 부분 */
  grid-template-columns: repeat(2, auto); /* 변경된 부분 */
  align-items: center;
  justify-content: center;
  gap: 1rem; /* 그리드 아이템 간격 조정 */

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 300;
  font-size: 1.6rem;
  // line-height: 2.3rem;

  color: #000000;
`;

const CopertatorInfo = styled.div`
  display: flex;
  position: relative;
  width: 40rem;
  height: 10rem;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  // gap: 4.1rem;

  @media (max-width: 1280px) {
    width: 30rem;
  }

  @media (max-width: 768px) {
    width: 20rem;
  }
`;

const ProfileImg = styled.img`
  display: flex;
  position: relative;
  width: 6rem;
  height: 6rem;

  border-radius: 10rem;
  box-shadow: 0rem 0rem 0.4rem rgba(0, 0, 0, 0.25);

  @media (max-width: 1280px) {
    width: 4rem;
    height: 4rem;
  }

  @media (max-width: 768px) {
    width: 4rem;
    height: 4rem;
  }
`;

const CoperDetail = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 20rem;
  height: 10rem;
  align-items: center;

  @media (max-width: 1280px) {
    width: 18rem;
    height: 9rem;
  }

  @media (max-width: 768px) {
    width: 16rem;
    height: 8rem;
  }
`;

const CoperDetail01 = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;

  width: 14rem;
  height: 5rem;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const CoperMusicName = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  display: flex;
  position: relative;
`;

const CoperName = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  display: flex;
  position: relative;
`;

const MusicianTag = styled.img`
  display: flex;
  position: relative;
  width: 3rem;
  height: 3rem;
`;

const CoperDetail02 = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 10rem;
  height: 5rem;
  top: 1rem;
  align-items: center;
  justify-content: center;

  gap: 2rem;
  left: 0.2rem;

  @media (max-width: 1280px) {
    width: 9rem;
    height: 4rem;
  }

  @media (max-width: 768px) {
    width: 8rem;
    height: 4rem;
  }
`;

const LyricsInfo = styled.div`
  width: 110rem;
  height: 60rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rem;
`;

const LyricsTitle = styled.div`
  font-size: 3rem;
  font-weight: bold;
  top: 3rem;
  display: flex;
  position: relative;
  color: #008bff;
`;

const LyricsBox = styled.div`
  position: relative;
  display: flex;
  width: 40rem;
  padding-top: 4rem;
  padding-left: 3rem;
  height: 102.5rem;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 300;
  font-size: 1.5rem;
  line-height: 2.3rem;
  justify-content: center;
  border-top: 0.3px dashed #008bff;
  color: #black;
  white-space: pre-wrap;

  @media (max-width: 1280px) {
    width: 40rem;
  }

  @media (max-width: 768px) {
    width: 30rem;
  }
`;

const CommnetZone = styled.div`
  width: 110rem;
  height: 72rem;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rem;
`;

const CommentTitle = styled.div`
  font-size: 3rem;
  font-weight: bold;
  top: 3rem;
  display: flex;
  position: relative;
  color: #008bff;
`;

const CommentBOx = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80rem;
  height: 60rem;

  padding-top: 3rem;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 300;
  font-size: 1.6rem;
  line-height: 2.3rem;

  color: #000000;

  @media (max-width: 1280px) {
    width: 80rem;
  }

  @media (max-width: 768px) {
    width: 40rem;
  }
`;

const CommentForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 68rem;
  height: 8rem;
  gap: 4rem;
  box-shadow: 0px 5.1px 19.18px -3.2px rgba(0, 0, 0, 0.3);
  background: linear-gradient(
    180deg,
    rgb(0, 139.09, 255) 0%,
    rgb(97, 230, 202) 100%
  );
  border-radius: 1.5rem;

  @media (max-width: 1280px) {
    width: 70rem;
    gap: 3rem;
  }

  @media (max-width: 768px) {
    width: 38rem;
    gap: 2rem;
  }
`;

const CommenterInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  width: 5.5rem;
  height: 9rem;
  top: 0.5rem;
  align-items: center;
  justify-content: center;
`;

const CommenterName = styled.div`
  position: relative;
  display: flex;
  color: black;
  font-size: 1rem;
  font-weight: light;
`;

const CommentImg = styled.img`
  position: relative;
  width: 4.6rem;
  height: 4.6rem;
  border-radius: 20rem;
  background: blue;
`;

const TextInput = styled.input`
  box-sizing: border-box;
  box-shadow: 0px 5.1px 19.18px -3.2px rgba(0, 0, 0, 0.3);
  position: relative;
  display: flex;
  width: 50rem;
  height: 4rem;
  background: #ffffff;
  border: none;
  border-radius: 2rem;

  /* 호버 효과 스타일 */
  &:hover {
    transform: scale(1.005);
    cursor: pointer; /* 호버 시 마우스 커서 변경 */

    /* 클릭 시 테두리 없애기 */
    &:focus {
      outline: none;
    }
  }

  @media (max-width: 1280px) {
    width: 40rem;
  }

  @media (max-width: 768px) {
    width: 30rem;
  }
`;
const CommentButton = styled.img`
  position: relative;
  display: flex;
  width: 5rem;
  height: 5rem;
  align-items: center;
  justify-content: center;

  border-radius: 2rem;
  transition: transform 0.3s ease;

  /* 호버 효과 스타일 */
  &:hover {
    transform: scale(1.1); /* 호버 시 크기를 1.1배로 확대 */
    cursor: pointer; /* 호버 시 마우스 커서 변경 */
  }
  /* 클릭 효과 스타일 */
  &:active {
    transform: scale(0.9); /* 클릭 시 크기를 0.9배로 축소 */
  }

  @media (max-width: 1280px) {
    width: 4rem;
    height: 4rem;
  }

  @media (max-width: 768px) {
    width: 4rem;
    height: 4rem;
  }
`;

const ToggleButton = styled.button`
  padding: 8px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Distinctline = styled.div`
  position: relative;
  display: flex;
  width: 54rem;
  height: 0px;
  top: 4rem;
`;

const CommentList = styled.div`
  list-style: none;
  padding: 0;
  gap: 0.4rem;
  height: 49rem;
  width: 60rem;
  display: flex;
  position: relative;
  top: 3.5rem;
  // justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 1280px) {
    width: 50rem;
  }

  @media (max-width: 768px) {
    width: 40rem;
  }
`;

const CommentItem01 = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 58rem;
  height: 5rem;
  margin-top: 1rem;
  border-bottom: 1px solid green;

  @media (max-width: 1280px) {
    width: 46rem;
  }

  @media (max-width: 768px) {
    width: 36rem;
  }
`;

const CommentlistImg = styled.img`
  position: relative;
  width: 2rem;
  height: 2rem;
  border-radius: 20rem;
  background: blue;
`;

const Commenter = styled.div`
  box-sizing: border-box;
  border-radius: 2rem;
  background-color: #4caf50;
  box-shadow: 0px 5.1px 19.18px -3.2px rgba(0, 0, 0, 0.3);
  color: #ffffff;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 6rem;
  height: 3rem;
  font-size: 1.6rem;
  font-weight: 500;
`;

const Commenttext = styled.div`
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  position: relative;
  display: flex;
  width: 40rem;
  height: 3rem;
  background: #ffffff;
  // border: 0.3px solid #000000;
  border-radius: 10px;
  // box-shadow: inset 1px 1px rgba(0, 0, 0, 0.7);
`;

const CommentDeleteButton = styled.div`
  position: relative;
  display: flex;
  font-size: 1rem;
  font-weight: 600;
  left: 0.2rem;
  color: black;
  /* 호버 효과 스타일 */
  &:hover {
    transform: scale(1.1); /* 호버 시 크기를 1.1배로 확대 */
    cursor: pointer; /* 호버 시 마우스 커서 변경 */
  }
  /* 클릭 효과 스타일 */
  &:active {
    transform: scale(0.9); /* 클릭 시 크기를 0.9배로 축소 */
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8rem;
`;

const PaginationButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: ${(props) => (props.clicked ? "#00ffa8" : "black")};
  color: ${(props) => (props.clicked ? "black" : "white")};
  color: white;
  cursor: pointer;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); /* 음영 효과 추가 */
  transition: box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out,
    color 0.3s ease-in-out; /* 음영 효과의 변화를 자연스럽게 설정 */

  /* 호버 효과 스타일 */
  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3); /* 호버 시 음영 효과 변경 */
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const MusicInfo = () => {
  const { id } = useParams();
  console.log("ID:", id); // id 값 확인

  const [isPlaying, setIsPlaying] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [audioSrc, setAudioSrc] = useState("");

  const [volume, setVolume] = useState(1);
  const audioPlayerRef = useRef(null);
  const [musicInfo, setMusicInfo] = useState(null);
  const [musicinfolist, setMusicInfoList] = useState(null);
  const [musicCommentList, setMusicCommentList] = useState([]);

  const [musicId, setMusicId] = useState(id); // 음악 ID 상태
  const [loggedInUserNickname, setLoggedInUserNickname] = useState(""); // 로그인한 사용자의 닉네임 상태

  //아이콘 저작권 링크.
  const { setFooterData } = useContext(FooterContext);

  useEffect(() => {
    setFooterData(
      <a
        href="https://www.flaticon.com/free-icons/send-comment"
        title="send comment icons"
      >
        Send comment icons created by Rooman12 - Flaticon
      </a>,
      <a href="https://www.flaticon.com/kr/free-icons/" title="심장 아이콘">
        심장 아이콘 제작자: Kiranshastry - Flaticon
      </a>
    );
  }, []);

  // 좋아요 수 설정 useState
  const [musicCount, setMusicCount] = useState(0);
  const heartChecker = window.localStorage.getItem("email");

  //음악 댓글 설정
  // const [writeValue, setWriteValue] = useState("");
  const userEmail = window.localStorage.getItem("email");
  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState("");
  const [comAddFlag, setComAddFlag] = useState(false); // 댓글 추가 성공 여부
  const [showComments, setShowComments] = useState(false);

  //상세리스트 조회
  useEffect(() => {
    const getMusicById = async () => {
      try {
        const response = await MusicAxiosApi.getMusicById(id);
        console.log("음악 상세 리스트 조회 : ", response.data);
        setMusicInfo(response.data);
        setAudioSrc(response.data.musicDTO.musicFile);
      } catch (error) {
        console.log(error);
      }
    };

    getMusicById();
  }, [id]);

  //음악 리스트 조회.
  useEffect(() => {
    console.log(id);
    const getAllMusic = async () => {
      try {
        const response = await MusicAxiosApi.getAllMusic();
        console.log("음악 리스트 조회 : ", response.data);
        setMusicInfoList(response.data);
        //api호출 성공시, musicinfolist상태 업데이트
      } catch (error) {
        console.log(error);
      }
    };

    getAllMusic();
  }, [id]);

  // 좋아요 컨트롤
  const [isRender, setIsRender] = useState(true);
  const [isLike, setIsLike] = useState(false);
  const likeMusic = async () => {
    setIsRender(false);
    setIsLike(true);
    setMusicId(id);
    console.log("음악 좋아요 반영 AxiosApi 작동");
    try {
      const response = await MusicAxiosApi.musicHeart(id, heartChecker);
      console.log("좋아요 응답 데이타 : ", response);
      console.log("좋아요 수 : ", response.data);
      setMusicCount(response.data);
    } catch (error) {
      console.error("음악 좋아요 반영에 실패했습니다:", error);
    }
  };

  //음악 댓글 등록 기능
  const handleCommentChange = (e) => {
    setInputComment(e.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault(); //JS기본로직방지
    console.log("handleSubmitComment 실행됨");
    try {
      const response = await MusicAxiosApi.musicCommentRegister(
        id,
        inputComment,
        userEmail
      );
      console.log("댓글작성 응답 데이타 : ", response.data);
      setInputComment("");
    } catch (error) {
      console.error("음악 댓글 작성에 실패했습니다:", error);
    }
  };

  //음악 댓글 조회.
  useEffect(() => {
    console.log("새로운 ID:", id);
    const musicCommentList = async () => {
      try {
        const response = await MusicAxiosApi.musicCommentList(id);
        console.log("음악 댓글 리스트 조회 : ", response.data);
        setMusicCommentList(response.data);
        //api호출 성공시, musicinfolist상태 업데이트
      } catch (error) {
        console.log("댓글 데이터를 가져오는 도중 오류 발생:", error);
      }
    };
    musicCommentList();
  }, [id, inputComment]);

  const loggedInUserId = window.localStorage.getItem("email");
  //음악 댓글 삭제
  const handleDeleteComment = async (musicCommentId) => {
    try {
      //api를 통해 댓글 삭제
      await MusicAxiosApi.musicCommentDelete(musicCommentId);
      console.log("댓글 삭제 성공");
      // 댓글 삭제 후, 새로운 댓글 목록 다시 가져오기
      const response = await MusicAxiosApi.musicCommentList(id);
      setMusicCommentList(response.data);
      console.log("새로운 댓글 목록 : ", response.data);
    } catch (error) {
      console.log("댓글 삭제에 실패: ", error);
    }
  };

  // 음악 댓글 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const [currentComments, setCurrentComments] = useState([]);
  const commentsPerPage = 6;
  const totalComments = musicCommentList.length;

  const totalPages = Math.ceil(totalComments / commentsPerPage);

  useEffect(() => {
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const updatedComments = musicCommentList.slice(
      indexOfFirstComment,
      indexOfLastComment
    );
    setCurrentComments(updatedComments);
  }, [musicCommentList, currentPage]);

  const handlePageChange = (page) => {
    const indexOfLastComment = page * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const updatedComments = musicCommentList.slice(
      indexOfFirstComment,
      indexOfLastComment
    );
    setCurrentComments(updatedComments);
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <PaginationButton
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={currentPage === i}
          clicked={currentPage === i} // 클릭된 버튼의 스타일을 변경하기 위한 속성
        >
          {i}
        </PaginationButton>
      );
    }
    return pageNumbers;
  };

  //회전기능
  useEffect(() => {
    let rotateInterval;
    //const로 불가해서 let 사용.

    if (isPlaying) {
      rotateInterval = setInterval(() => {
        setRotationAngle((prevAngle) => prevAngle + 1);
      }, 10); // 회전 속도 조절을 위한 간격 설정 (단위: 밀리초)
    } else {
      clearInterval(rotateInterval); //회전 효과 중지
    }

    return () => {
      clearInterval(rotateInterval);
    };
  }, [isPlaying]);

  //음원 실행 기능.
  const handlePlayClick = () => {
    console.log("handlePlayClick 함수 실행됨");
    setIsPlaying(!isPlaying);
    if (audioPlayerRef.current) {
      if (!isPlaying) {
        audioPlayerRef.current.audioEl.current.play();
      } else {
        audioPlayerRef.current.audioEl.current.pause();
      }
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  //음악 구매 기능
  const musicPurchaser = window.localStorage.getItem("email");
  const [modalOpen, setModalopen] = useState(false);

  const handlePurchaseClick = () => {
    setModalopen(true);
  };

  const handleConfirm = async () => {
    try {
      console.log("", id);
      const response = await MusicAxiosApi.purchaseMusic(id);
      console.log("음악 구매 성공 여부 : ", response.data);
      if (response.data === true) {
        alert("구매를 완료했습니다");
        setModalopen(false); // 모달 닫기}
      } else {
        alert("구매를 실패했습니다");
      }
    } catch (error) {
      console.log("음악 구매 실패", error);
    }
  };

  const handleCancel = () => {
    setModalopen(false); // 모달 닫기
  };

  return (
    <BackgroundContainer>
      <InfoContainer>
        <TopInfoBox>
          {musicInfo && ( // musicInfo가 null이 아닌 경우에만 해당 내용을 렌더링합니다.
            <>
              <MusicImgBox isPlaying={isPlaying}>
                <MusicImage
                  alt="앨범커버"
                  src={musicInfo.musicDTO.thumbnailImage}
                  style={{ transform: `rotate(${rotationAngle}deg)` }}
                />
                <MusicInnerCircle />
              </MusicImgBox>
              <MusicName>{musicInfo.musicDTO.musicTitle}</MusicName>
              <MusicDefInfo>
                <SingerName>{musicInfo.userResDto.userNickname}</SingerName>

                <WriteInfo>
                  <ComposerNamer>
                    작곡 : {musicInfo.musicDTO.composer}
                  </ComposerNamer>
                  |
                  <LyricistName>
                    작사 : {musicInfo.musicDTO.lyricist}
                  </LyricistName>
                </WriteInfo>

                <Genre>{musicInfo.musicDTO.genre}</Genre>
                <Infomation>{musicInfo.musicDTO.musicInfo}</Infomation>
              </MusicDefInfo>

              <BoxCon>
                <MusicLikeBox onClick={likeMusic}>
                  <LikeHeart alt="좋아요하트" src={likeheart} />
                  <LikeCount>
                    {isRender && musicInfo.musicDTO.heartCount}
                    {isLike && musicCount}
                  </LikeCount>
                </MusicLikeBox>

                <PlayBox onClick={handlePlayClick}>▶</PlayBox>

                {/* 음원구매버튼 */}

                <BuyBox onClick={handlePurchaseClick}>
                  <BuyImg alt="장바구니아이콘" src={buyimg} />
                </BuyBox>
                {modalOpen && (
                  <ModalComponent>
                    <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
                      이 가수의 음악 감성을 <br /> 함께 하시겠습니까?
                    </h2>
                    <p style={{ textAlign: "center", fontWeight: "bold" }}>
                      확인 버튼 클릭시 <br /> 100포인트로 가수를 응원합니다.
                    </p>
                    <ButtonArea>
                      <button
                        style={{
                          marginRight: "1rem",
                        }}
                        onClick={handleConfirm}
                      >
                        확인
                      </button>
                      <button onClick={handleCancel}>취소</button>
                    </ButtonArea>
                  </ModalComponent>
                )}

                <ReactAudioPlayer
                  ref={audioPlayerRef}
                  src={audioSrc}
                  autoPlay={isPlaying}
                  controls={false}
                  volume={volume}
                  onPlay={() => {}}
                />
              </BoxCon>
              <VolumeInput>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                />
              </VolumeInput>
            </>
          )}
        </TopInfoBox>

        <BottomTitle>곡정보</BottomTitle>
        <BottomInfoBox>
          <DetailInfoBox>
            <CoperateInfo>
              <CopoerateTitle>이 노래도 들어보세요</CopoerateTitle>

              <CopoeraterBox>
                {Array.isArray(musicinfolist)
                  ? musicinfolist.slice(0, 4).map((item, index) => (
                      <CopertatorInfo key={index}>
                        <ProfileImg
                          alt="프로필사진"
                          src={item.musicDTO.thumbnailImage}
                        />
                        <CoperDetail>
                          <CoperDetail01>
                            <CoperMusicName>
                              {item.musicDTO.musicTitle}
                            </CoperMusicName>
                            <MusicianTag alt="추천노래" src={artistImg} />
                          </CoperDetail01>

                          <CoperDetail02>
                            <LikeBox>
                              <StyledLink
                                to={`/music-info/${item.musicDTO.id}`}
                              >
                                <CoperName>
                                  {item.userResDto.userNickname}
                                </CoperName>
                              </StyledLink>
                            </LikeBox>
                          </CoperDetail02>
                        </CoperDetail>
                      </CopertatorInfo>
                    ))
                  : null}
              </CopoeraterBox>
            </CoperateInfo>

            <LyricsInfo>
              {musicInfo && ( // musicInfo가 null이 아닌 경우에만 해당 내용을 렌더링합니다.
                <>
                  <LyricsTitle>가사</LyricsTitle>
                  <LyricsBox>{musicInfo.musicDTO.lyrics}</LyricsBox>
                </>
              )}
            </LyricsInfo>

            <CommnetZone>
              <CommentTitle>음악 토론</CommentTitle>

              <CommentBOx>
                <CommentForm>
                  {/* <CommenterInfo>
                    <CommentImg alt="작성자사진" src={commentimg} /> 
                    <CommenterName>{userEmail.userNickname}</CommenterName> 
                  </CommenterInfo>  */}

                  <TextInput
                    type="text"
                    placeholder="댓글을 입력해주세요"
                    value={inputComment}
                    onChange={handleCommentChange}
                  ></TextInput>

                  <CommentButton
                    onClick={handleSubmitComment}
                    alt="댓글등록이미지"
                    src={commentsend}
                  ></CommentButton>
                </CommentForm>
                {/* 
                <Distinctline /> */}

                <CommentList>
                  {currentComments.map((comment) => (
                    <CommentItem01 key={comment.musiccommentId}>
                      {/* <CommentlistImg alt="작성자사진" src={commentimg} /> */}
                      <Commenter>{comment.userNickname}</Commenter>
                      <Commenttext> "{comment.content}"</Commenttext>

                      {/* 댓글 작성자의 ID와 현재 로그인한 사용자의 ID 비교하여 삭제 버튼을 표시하거나 숨김.
                      삭제 버튼은 댓글 작성자와 현재 로그인한 사용자의 ID가 일치할 때만. */}
                      <CommentDeleteButton
                        style={{
                          display:
                            comment.userEmail === loggedInUserId
                              ? "block"
                              : "none",
                        }}
                        onClick={() =>
                          handleDeleteComment(
                            comment.musiccommentId,
                            comment.userEmail
                          )
                        }
                      >
                        댓글삭제
                      </CommentDeleteButton>
                    </CommentItem01>
                  ))}
                </CommentList>

                <PaginationContainer>{renderPagination()}</PaginationContainer>
              </CommentBOx>
            </CommnetZone>
          </DetailInfoBox>
        </BottomInfoBox>
      </InfoContainer>
    </BackgroundContainer>
  );
};

export default MusicInfo;
