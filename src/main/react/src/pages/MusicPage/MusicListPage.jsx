import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import SearchBox from "../../component/musicList/SearchBox";
import Searchicon from "../../images/SearchIcon.png";
import { Link } from "react-router-dom";
import MusicAxiosApi from "../../axios/MusicAxios";

const SingList = styled.div`
  width: 100%;
  height: 274rem;
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: white;
  align-items: center;
`;

const PostSlideContainer = styled.div`
  width: 100%;
  height: 40rem;
  display: flex;
  position: relative;
  flex-direction: row;
  background-color: white;
  margin-top: 5rem;
  overflow: hidden;
`;

const SingerPost = styled.div`
  box-sizing: border-box;
  width: 40rem;
  height: 40rem;
  justify-content: center;
  display: flex;
  flex-direction: row;
  animation: slide linear infinite;
  position: relative;
  color: white;

  @media (max-width: 1280px) {
    width: 40rem;
  }

  @media (max-width: 768px) {
    width: 40rem;
  }
`;

const SingerPostImg = styled.img`
  width: 140rem;
  height: 30rem;
  display: flex;
  position: relative;

  object-fit: cover;
  overflow: hidden;
  border-radius: 4rem;
  box-shadow: 0 1rem 3rem -0.5rem rgba(0, 0, 0, 0.25);

  @media (max-width: 1280px) {
    width: 40rem;
  }

  @media (max-width: 768px) {
    width: 30rem;
  }
`;

const InfoContainer = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
  width: 120rem;
  height: 280rem;
  display: flex;
  position: relative;
  flex-direction: column;
  border-radius: 5rem;
  align-items: center;
  box-shadow: 0 1rem 3rem -0.5rem rgba(0, 0, 0, 0.25);

  @media (max-width: 1280px) {
    width: 80rem;
  }

  @media (max-width: 768px) {
    width: 40rem;
  }
`;

const SearchBarBox = styled.div`
  display: flex;
  position: relative;
  margin-top: 5rem;
  margin-bottom: 5rem;
  background-color: white;
  width: 110rem;
  height: 17rem;
  justify-content: center;
  align-items: center;

  @media (max-width: 1280px) {
    width: 80rem;
  }

  @media (max-width: 768px) {
    width: 40rem;
  }
`;

const SearchBar = styled.div`
  width: 80rem;
  height: 8rem;
  border-radius: 1.5rem;

  // margin-left: 15rem;
  position: relative;
  display: flex;
  background-color: #eeeeee;
  align-items: center;
  justify-contents: center;
  box-shadow: 0px 0.8px 0.8px rgba(0, 0, 0, 0.1); /* 음영 효과를 주는 box-shadow 설정 */

  @media (max-width: 1280px) {
    width: 60rem;
  }

  @media (max-width: 768px) {
    width: 35rem;
  }
`;

const SingLIstBottom = styled.div`
  height: 180rem;
  padding-top: 5rem;
  width: 110rem;
  display: flex;
  position: relative;
  background-color: white;
  border-radius: 4rem;
  // box-shadow: 0px 0.8px 0.8px #00ffa8;
  align-items: center;
  flex-direction: column;

  @media (max-width: 1280px) {
    width: 80rem;
  }

  @media (max-width: 768px) {
    width: 40rem;
  }
`;

const ListNavbar = styled.div`
  width: 100rem;
  height: 8rem;
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  background-color: #008bff;
  box-shadow: 5px;
  margin-bottom: 2rem;
  // padding-left: 10rem;
  border-radius: 1rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); /* 음영 효과를 주는 box-shadow 설정 */

  @media (max-width: 1280px) {
    width: 80rem;
  }

  @media (max-width: 768px) {
    width: 38rem;
    height: 6rem;
    gap: 1rem;
  }
`;

const MusicCategory01 = styled.div`
  width: 11rem;
  height: 5.5rem;
  display: flex;
  position: relative;
  flex-direction: row;
  background-color: none;
  color: #ffffff;
  font-size: 2.6rem;
  font-weight: 700;

  align-items: center;
  justify-content: center;
  overflow: hidden; /* 텍스트 밑으로 확장되지 않도록 오버플로우 제어 */

  /* 호버 효과 스타일 */
  &:hover {
    color: white; /* 호버 시 텍스트 색상 변경 */
    cursor: pointer; /* 호버 시 마우스 커서 변경 */
    text-decoration: none; /* 밑줄 제거 */
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 0%; /* 초기에는 화면의 절반만큼의 너비를 가짐 */
    height: 2px; /* 밑줄 높이 */
    bottom: 0;
    background-color: #ffffff; /* 밑줄 색상 */
    transition: width 0.3s ease; /* 변화 시 애니메이션 */
  }

  &:hover:before,
  &:hover:after {
    width: 100%; /* 호버 시 전체 너비로 확장 */
    transition: width 0.3s ease; /* 변화 시 애니메이션 */
  }

  @media (max-width: 1280px) {
    font-size: 2.2rem;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    font-weight: 700;
  }
`;

const MusicCategory02 = styled.div`
  width: 11rem;
  height: 5.5rem;
  display: flex;
  position: relative;
  flex-direction: row;
  background-color: none;
  color: #ffffff;
  font-size: 2.6rem;
  font-weight: 700;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* 텍스트 밑으로 확장되지 않도록 오버플로우 제어 */

  /* 호버 효과 스타일 */
  &:hover {
    color: white; /* 호버 시 텍스트 색상 변경 */
    cursor: pointer; /* 호버 시 마우스 커서 변경 */
    text-decoration: none; /* 밑줄 제거 */
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 0%; /* 초기에는 화면의 절반만큼의 너비를 가짐 */
    height: 2px; /* 밑줄 높이 */
    bottom: 0;
    background-color: #ffffff; /* 밑줄 색상 */
    transition: width 0.3s ease; /* 변화 시 애니메이션 */
  }

  &:hover:before,
  &:hover:after {
    width: 100%; /* 호버 시 전체 너비로 확장 */
    transition: width 0.3s ease; /* 변화 시 애니메이션 */
  }

  @media (max-width: 1280px) {
    font-size: 2.2rem;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    font-weight: 700;
  }
`;

const MusicCategory03 = styled.div`
  width: 11rem;
  height: 5.5rem;
  display: flex;
  position: relative;
  flex-direction: row;
  background-color: none;
  color: #ffffff;
  font-size: 2.6rem;
  font-weight: 700;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* 텍스트 밑으로 확장되지 않도록 오버플로우 제어 */

  /* 호버 효과 스타일 */
  &:hover {
    color: white; /* 호버 시 텍스트 색상 변경 */
    cursor: pointer; /* 호버 시 마우스 커서 변경 */
    text-decoration: none; /* 밑줄 제거 */
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 0%; /* 초기에는 화면의 절반만큼의 너비를 가짐 */
    height: 2px; /* 밑줄 높이 */
    bottom: 0;
    background-color: #ffffff; /* 밑줄 색상 */
    transition: width 0.3s ease; /* 변화 시 애니메이션 */
  }

  &:hover:before,
  &:hover:after {
    width: 100%; /* 호버 시 전체 너비로 확장 */
    transition: width 0.3s ease; /* 변화 시 애니메이션 */
  }

  @media (max-width: 1280px) {
    font-size: 2.2rem;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    font-weight: 700;
  }
`;

const MusicCategory04 = styled.div`
  width: 13rem;
  height: 5.5rem;
  display: flex;
  position: relative;
  flex-direction: row;
  background-color: none;
  color: #ffffff;
  font-size: 2.6rem;
  font-weight: 700;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* 텍스트 밑으로 확장되지 않도록 오버플로우 제어 */

  /* 호버 효과 스타일 */
  &:hover {
    color: white; /* 호버 시 텍스트 색상 변경 */
    cursor: pointer; /* 호버 시 마우스 커서 변경 */
    text-decoration: none; /* 밑줄 제거 */
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 0%; /* 초기에는 화면의 절반만큼의 너비를 가짐 */
    height: 2px; /* 밑줄 높이 */
    bottom: 0;
    background-color: #ffffff; /* 밑줄 색상 */
    transition: width 0.3s ease; /* 변화 시 애니메이션 */
  }

  &:hover:before,
  &:hover:after {
    width: 100%; /* 호버 시 전체 너비로 확장 */
    transition: width 0.3s ease; /* 변화 시 애니메이션 */
  }

  @media (max-width: 1280px) {
    font-size: 2.2rem;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    font-weight: 700;
  }
`;

const MusicCategory05 = styled.div`
  width: 15rem;
  height: 5.5rem;
  display: flex;
  position: relative;
  flex-direction: row;
  background-color: none;
  color: #ffffff;
  font-size: 2.6rem;
  font-weight: 700;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* 텍스트 밑으로 확장되지 않도록 오버플로우 제어 */

  /* 호버 효과 스타일 */
  &:hover {
    color: white; /* 호버 시 텍스트 색상 변경 */
    cursor: pointer; /* 호버 시 마우스 커서 변경 */
    text-decoration: none; /* 밑줄 제거 */
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 0%; /* 초기에는 화면의 절반만큼의 너비를 가짐 */
    height: 2px; /* 밑줄 높이 */
    bottom: 0;
    background-color: #ffffff; /* 밑줄 색상 */
    transition: width 0.3s ease; /* 변화 시 애니메이션 */
  }

  &:hover:before,
  &:hover:after {
    width: 100%; /* 호버 시 전체 너비로 확장 */
    transition: width 0.3s ease; /* 변화 시 애니메이션 */
  }

  @media (max-width: 1280px) {
    font-size: 2.2rem;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    font-weight: 700;
  }
`;

const MusicCategory06 = styled.div`
  width: 15rem;
  height: 5.5rem;
  display: flex;
  position: relative;
  flex-direction: row;
  background-color: none;
  color: #ffffff;
  font-size: 2.6rem;
  font-weight: 700;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* 텍스트 밑으로 확장되지 않도록 오버플로우 제어 */

  /* 호버 효과 스타일 */
  &:hover {
    color: white; /* 호버 시 텍스트 색상 변경 */
    cursor: pointer; /* 호버 시 마우스 커서 변경 */
    text-decoration: none; /* 밑줄 제거 */
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 0%; /* 초기에는 화면의 절반만큼의 너비를 가짐 */
    height: 2px; /* 밑줄 높이 */
    bottom: 0;
    background-color: #ffffff; /* 밑줄 색상 */
    transition: width 0.3s ease; /* 변화 시 애니메이션 */
  }

  &:hover:before,
  &:hover:after {
    width: 100%; /* 호버 시 전체 너비로 확장 */
    transition: width 0.3s ease; /* 변화 시 애니메이션 */
  }

  @media (max-width: 1280px) {
    font-size: 2.2rem;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    font-weight: 700;
  }
`;

const ListContainer = styled.div`
  width: 110rem;
  height: 130rem;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1280px) {
    width: 80rem;
  }

  @media (max-width: 768px) {
    width: 38rem;
  }
`;

const ListBox = styled.div`
  width: 100rem;
  height: 10rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  background: #ffffff;

  box-shadow: 0 1rem 3rem -0.5rem rgba(0, 0, 0, 0.25);
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  gap: 2rem;
  padding-left: 2rem;

  @media (max-width: 1280px) {
    width: 80rem;
    gap: 4rem;
  }

  @media (max-width: 768px) {
    width: 38rem;
  }
`;

const MusicThumnail = styled.img`
  width: 6rem;
  height: 6rem;
  // border: 1px solid white;
  border-radius: 1.2rem;
  box-shadow: 0 0.5rem 0.8rem -0.5rem #008bff;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;

  /* 호버 효과 스타일 */
  &:hover {
    cursor: pointer; /* 호버 시 마우스 커서 변경 */
    box-shadow: 0px 4px 8px white;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 3rem;
    height: 3rem;
  }
`;

const MusicDet = styled.div`
  width: 15rem;
  height: 8.4rem;
  // border: 1px solid white;
  display: flex;
  position: relative;
  flex-direction: column;

  @media (max-width: 1280px) {
    width: 13rem;
  }

  @media (max-width: 768px) {
    width: 10rem;
  }
`;

const SongName = styled.div`
  width: 15rem;
  height: 4.2rem;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  color: #008bff;
  font-size: 2rem;
  font-weight: 700;
  overflow: hidden; /* 텍스트 밑으로 확장되지 않도록 오버플로우 제어 */

  /* 호버 효과 스타일 */
  &:hover {
    color: black; /* 호버 시 텍스트 색상 변경 */
    cursor: pointer; /* 호버 시 마우스 커서 변경 */
    text-decoration: none; /* 밑줄 제거 */
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 0%; /* 초기에는 화면의 절반만큼의 너비를 가짐 */
    height: 0.1rem; /* 밑줄 높이 */
    bottom: 0;
    background-color: #008bff; /* 밑줄 색상 */
    transition: width 0.3s ease; /* 변화 시 애니메이션 */
  }

  &:hover:before,
  &:hover:after {
    width: 100%; /* 호버 시 전체 너비로 확장 */
    transition: width 0.3s ease; /* 변화 시 애니메이션 */
  }

  @media (max-width: 1280px) {
    width: 10rem;
    font-size: 2rem;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    width: 7rem;
    font-size: 1.4rem;
    font-weight: 700;
  }
`;

const SingerName = styled.div`
  width: 15rem;
  height: 4.2rem;
  // border: 1px solid white;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 1.4rem;
  font-weight: 400;

  @media (max-width: 1280px) {
    width: 10rem;
  }

  @media (max-width: 768px) {
    width: 7rem;
  }
`;

const MusicPlaySet = styled.div`
  width: 41rem;
  height: 6rem;
  display: flex;
  position: relative;
  border-shadow: 0 0.5rem 0.8rem -0.5rem #ffffff;
  justify-content: center;
  color: white;

  @media (max-width: 1280px) {
    width: 30rem;
  }

  @media (max-width: 768px) {
    width: 15rem;
  }
`;

const MusicTag = styled.div`
  width: 14rem;
  height: 4rem;

  color: #008bff;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 1.3rem;

  @media (max-width: 1280px) {
    display: none;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const PublishDay = styled.div`
  width: 7rem;
  height: 4rem;

  color: black;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  font-size: 1.3rem;

  @media (max-width: 1280px) {
    display: none;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8rem;

  @media (max-width: 1280px) {
    width: 40rem;
  }

  @media (max-width: 768px) {
    width: 38rem;
  }
`;

const PaginationButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: ${(props) => (props.clicked ? " #008bff" : "black")};
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

const InputBox = styled.div`
  height: 8rem;
  border: none;
  position: relative;
  display: flex;
  width: 81rem;
`;

const SearchInput = styled.input`
  background-color: #ffffff;
  border: none;
  border-radius: 3rem;
  box-shadow: inset 0px 4px 4px #00000040;
  height: 5rem;
  left: 2rem;
  position: relative;
  display: flex;
  top: 14px;
  width: 72rem;
  padding: 0 2rem;
  font-size: 1.4rem;

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
    width: 56rem;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    width: 30rem;
    font-size: 1rem;
  }
`;

const SearchButton = styled.button`
  background-color: #008bff;
  border-radius: 2rem;
  color: white;
  height: 4rem;
  display: flex;
  position: relative;
  align-items: center;
  top: 2rem;
  right: 4rem;
  width: 4rem;
  border: none;
  transition: transform 0.3s ease; /* 호버 시 변화를 부드럽게 만들기 위한 transition 속성 */

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
    width: 3rem;
    height: 3rem;
    right: 3rem;
    top: 2.5rem;
  }

  @media (max-width: 768px) {
    width: 2rem;
    height: 2rem;
    top: 3rem;
    right: 0.5rem;
  }
`;

const SearchIcon = styled.img`
  width: 3rem;
  height: 3rem;
  position: relative;
  display: flex;
  // left: 0.4rem;

  @media (max-width: 1280px) {
    width: 2rem;
    height: 2rem;
  }

  @media (max-width: 768px) {
    width: 1rem;
    height: 1rem;
    right: 0.1rem;
  }
`;

const Registzone = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  justify-content: center;
  align-items: center;
  width: 100rem;

  height: 10rem;

  @media (max-width: 1280px) {
    width: 80rem;
    height: 10rem;
  }

  @media (max-width: 768px) {
    width: 40rem;
    height: 10rem;
  }
`;

const RegistInfo = styled.div`
  position: relative;
  display: flex;
  height: 4rem;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;

  @media (max-width: 1280px) {
    font-size: 2.5rem;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    font-weight: 700;
  }
`;

const RegistButton = styled.button`
  position: relative;
  display: flex;
  width: 10rem;
  height: 4rem;
  background: #008bff;
  border: none;
  // padding: 10px 20px;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: 700;
  border-radius: 4px;
  color: #ffffff;
  box-shadow: 1px 1px 5px #000, -1px -1px 5px #117bff;, inset 1px 1px 5px #126bff;,
    inset -1px -1px 5px #008bff;
  transition: all 0.1s;
overflow: hidden;
margin-bottom: 2rem;

  &:hover {
    box-shadow: 1px 1px 15px #117bff, -1px -1px 15px #117bff, inset 1px 1px 5px #126bff,
      inset -1px -1px 5px #008bff;
    transform: scale(1.05);
  }

   &:active {
    transform: scale(0.95);
  }


`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const MusicList = () => {
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [promoImages, setPromoImages] = useState([]);
  const slideshow = useRef(null);

  const [musicinfolist, setMusicInfoList] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);

  //카테고리별 검색
  // 기존 음악 카테고리 클릭 이벤트 핸들러에서 선택된 장르를 설정하는 함수
  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1); // 새로운 장르가 선택될 때 현재 페이지를 1로 재설정합니다.
  };

  //키워드별 검색

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    console.log("검색어:", searchValue);

    if (searchValue.trim() === "") {
      // 검색어가 비어 있을 때, 검색 결과 초기화
      setSearchResults([]);
      return;
    }

    // 검색어가 변경될 때마다 musicinfolist를 새로 필터링.
    const filteredMusicInfoList = musicinfolist.filter((item) => {
      const musicTitleIncludesKeyword = item.musicDTO.musicTitle
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const userNicknameIncludesKeyword = item.userResDto.userNickname
        .toLowerCase()
        .includes(searchValue.toLowerCase());

      return musicTitleIncludesKeyword || userNicknameIncludesKeyword;
    });

    // 필터된 결과를 musicinfolist 상태로 업데이트.
    setSearchResults(filteredMusicInfoList);

    // 검색 결과가 없을 때.
    if (filteredMusicInfoList.length === 0) {
      alert("검색 결과가 없습니다");
    }
  };

  //음악 리스트 불러오기.

  useEffect(() => {
    console.log(id);
    const getAllMusic = async () => {
      try {
        const response = await MusicAxiosApi.getAllMusic();
        console.log("음악 리스트 조회 : ", response.data);
        setMusicInfoList(response.data);
        //api호출 성공시, musicinfolist상태 업데이트

        const promoImageUrls = response.data.map(
          (item) => item.musicDTO.thumbnailImage
        );

        const randomImages = getRandomImage(promoImageUrls);
        setPromoImages(randomImages); //랜덤으로 이미지 뽑기.
      } catch (error) {
        console.log(error);
      }
    };

    getAllMusic();
  }, []);

  //랜덤으로 이미지 뽑기.
  const getRandomImage = (images) => {
    const shuffledImages = [...images].sort(() => 1.5 - Math.random());
    return shuffledImages.slice(0, 11);
  };

  //슬라이드 이벤트
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % promoImages.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [currentIndex, promoImages.length]);

  //여기서부터 리스트 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11;
  const totalItems = 110;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getItemsForPage = (page) => {
    if (!musicinfolist || !Array.isArray(musicinfolist)) {
      return []; // musicinfolist가 null이거나 배열이 아닌 경우 빈 배열 반환
    }

    // 검색어를 고려한 필터링
    let filteredMusicInfoList = musicinfolist;
    if (searchValue.trim() !== "") {
      const lowerCaseSearchValue = searchValue.toLowerCase();
      filteredMusicInfoList = filteredMusicInfoList.filter(
        (item) =>
          item.musicDTO.musicTitle
            .toLowerCase()
            .includes(lowerCaseSearchValue) ||
          item.userResDto.userNickname
            .toLowerCase()
            .includes(lowerCaseSearchValue)
      );
    }

    // 장르에 따른 필터링
    filteredMusicInfoList = filteredMusicInfoList.filter(
      (item) => !selectedGenre || item.musicDTO.genre === selectedGenre
    );

    console.log("필터값 별 음악 조회 :", filteredMusicInfoList); // 필터링된 음악 목록 콘솔 출력

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    return filteredMusicInfoList
      .slice(startIndex, endIndex)
      .map((item, index) => (
        <ListBox key={startIndex + index}>
          <StyledLink to={`/music-info/${item.musicDTO.id}`}>
            <MusicThumnail
              alt="앨범썸네일"
              src={item.musicDTO.thumbnailImage}
            />
          </StyledLink>
          <MusicDet>
            <SongName>{item.musicDTO.musicTitle}</SongName>
            <SingerName>{`by : ${item.userResDto.userNickname}`}</SingerName>
          </MusicDet>
          <MusicPlaySet>
            <audio controls src={item.musicDTO.musicFile} />
          </MusicPlaySet>
          <MusicTag>{item.musicDTO.genre}</MusicTag>
          <PublishDay>{`발매일 : ${item.musicDTO.releaseDate}`}</PublishDay>
        </ListBox>
      ));
  };

  const currentItems = getItemsForPage(currentPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const displayPages = window.innerWidth <= 768 ? 5 : totalPages;
    for (let i = 1; i <= displayPages; i++) {
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

  return (
    <SingList>
      <PostSlideContainer>
        <div
          ref={slideshow}
          style={{
            display: "flex",
            width: `${promoImages.length * 100}%`, // 전체 이미지 너비 설정
            transform: `translateX(-${
              currentIndex * (100 / promoImages.length)
            }%)`, // 현재 이미지의 위치 계산
            transition: "transform 20s ease-in-out", // 슬라이드 애니메이션 효과
          }}
        >
          {promoImages.map((image, index) => (
            <SingerPost
              key={index}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              <SingerPostImg src={image} />
            </SingerPost>
          ))}
        </div>
      </PostSlideContainer>

      <InfoContainer>
        <SearchBarBox>
          <SearchBar>
            {/* <SearchBox></SearchBox> */}

            <InputBox>
              <SearchInput
                type="text"
                placeholder="관심있는 인디가수의 이름이나 곡 이름을 검색하세요."
                value={searchValue}
                onChange={handleInputChange}
              />
              <SearchButton onClick={handleSearch}>
                <SearchIcon alt="검색돋보기" src={Searchicon} />
              </SearchButton>
            </InputBox>
          </SearchBar>
        </SearchBarBox>

        <Registzone>
          <RegistInfo>이제, 당신의 음악이 세상에 알려질 순간 !</RegistInfo>
          <StyledLink to={`/music-regist`}>
            <RegistButton>등록하기</RegistButton>
          </StyledLink>
        </Registzone>

        <SingLIstBottom>
          <ListNavbar>
            <MusicCategory01 onClick={() => handleGenreClick("발라드")}>
              발라드
            </MusicCategory01>
            <MusicCategory02 onClick={() => handleGenreClick("락/메탈")}>
              락/메탈
            </MusicCategory02>
            <MusicCategory03 onClick={() => handleGenreClick("힙합/랩")}>
              힙합/랩
            </MusicCategory03>
            <MusicCategory04 onClick={() => handleGenreClick("R&B/soul")}>
              R&B/soul
            </MusicCategory04>
            <MusicCategory05 onClick={() => handleGenreClick("포크/블루스")}>
              포크/블루스
            </MusicCategory05>
            <MusicCategory06 onClick={() => handleGenreClick("어쿠스틱")}>
              어쿠스틱
            </MusicCategory06>
          </ListNavbar>

          <ListContainer>{currentItems}</ListContainer>

          <PaginationContainer>{renderPagination()}</PaginationContainer>
        </SingLIstBottom>
      </InfoContainer>
    </SingList>
  );
};

export default MusicList;
