import React, { useEffect, useState } from "react";
import styled from "styled-components";
import headlogo from "../images/Symbol_white.png";
import headlogo2 from "../images/Symbol_color.png";
import hamburger from "../images/Hamburger_color.png";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import Cancel from "../images/Cancel_White.png"
import MemberInfoAxiosApi from "../axios/MemberInfoAxios";

const NavContainer = styled.div`
  width: 100%;
  background-color: rgb(0, 0, 0);
  height: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    background-color: white;
  }
  .rightzone {
    margin-left: 4%;
    width: 35%;
    display: flex;
    justify-content: space-between;
  }

  .leftzone{
    display: flex;
    width: 35%;
    justify-content: flex-end;
    .leftinleft{
      display: flex;
      justify-content: space-between;
      width: 40%;
      margin-right: 10%;
    }
  }
  .hamburger {
    display: none;
  }

  .sidebar {
    display: none;
  }
  @media (max-width: 768px) {
    .rightzone {
      display: none;
    }

    .leftzone {
      display: none;
    }

    .hamburger {
      display: flex;
      justify-content: center;
      background-image: url(${hamburger});
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      height: 3rem;
      width: 20%;
      &:hover {
        cursor: pointer;
        transform: scale(1.15);
        transition: transform 0.05s ease-in-out;
      }
    }
  }
`;

const Link = styled(RouterLink)`
  text-decoration: none;
`;


const Sidebar = styled.div`
  display: flex;
  position: fixed;
  width: 60%;
  max-width: 35rem;
  height: 100vh;
  background: var(--gradienttop);
  right: ${props => props.isOpen ? '0%' : '-60%'};
  transition: right 0.2s ease-in-out;
  top: 0;
  flex-direction: column;
  box-sizing: border-box;
  z-index: 5;
  ${Link} {
    width: 100%;
    height: auto;
    padding: 2rem 4rem;
    font-size: 2rem;
    text-align: right;
    color: white;
    span {
      font-size: 2rem;
      font-weight: 200;
    }
  }
  .close{
    width: 90%;
    height: 3.5rem;
    background-image: url(${Cancel});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: right;
    margin: 3rem 0rem 4rem 0rem;
    &:hover {
      cursor: pointer;
    }
  }
`;

const HeadLogo = styled.div`
  width: 30%;
  height: 4rem;
  background-image: url(${headlogo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  &:hover {
    cursor: pointer;
    background-image: url(${headlogo2});
  }
  @media (max-width: 768px) {
    width: 20%;
    background-image: url(${headlogo2});
    &:hover {
        cursor: pointer;
        transform: scale(1.15);
        transition: transform 0.05s ease-in-out;
      }
  }
`;

const TextBox = styled.div`
  color: white;
  font-size: 1.5rem;
  font-weight: 300;
  &:hover {
    cursor: pointer;
    color: var(--maingreen);
  }
`;


const Header = () => {
  const email = UseAuth(); // 로그인 시 로컬 스토리지의 토큰에서 이메일 정보를 가져옵니다.
  console.log("헤더이메일조회 : ", email)
  const [isLogIn, setIsLogIn] = useState(!!email);
  const [isOpen, setIsOpen] = useState(false); // 사이드바의 상태를 관리합니다.
  const [userInfo, setUserInfo] = useState(null); // 유저 정보를 관리합니다.
  const navigate = useNavigate();

  useEffect(() => {
    const memberInfo = async () => {
      try {
        const response = await MemberInfoAxiosApi.getUserInfo(email);
        console.log(response.data);
        setUserInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    memberInfo();
  }, [email]);


  const handleLogoClick = () => {
    navigate("/");
  };

  useEffect(() => {
    setIsLogIn(!!email); // 이메일 정보가 있으면 로그인 상태로 설정합니다.
  }, [email]); // 이메일 정보가 바뀔 때마다 실행합니다.

  const handleLogout = () => {
    localStorage.clear(); // 로그아웃 시 로컬 스토리지의 모든 정보를 제거합니다.
    // localStorage.removeItem('email'); // 로그아웃 시 로컬 스토리지의 이메일 정보를 제거합니다.
    // localStorage.removeItem('accessToken'); // 로그아웃 시 로컬 스토리지의 액세스토큰 정보를 제거합니다.
    // localStorage.removeItem('refreshToken'); // 로그아웃 시 로컬 스토리지의 리프레쉬토큰 정보를 제거합니다.
    setIsLogIn(false);
    window.location.reload();
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }
  return (
    <>
    <NavContainer isOpen={isOpen}>
      <div className="rightzone">
          <Link to="/performance"><TextBox>공연</TextBox></Link>
          <Link to="/productPage"><TextBox>STORE</TextBox></Link>
          <Link to="/music-list"><TextBox>음원</TextBox></Link>
          <Link to="/communitypage"><TextBox>커뮤니티</TextBox></Link>
      </div>
      <HeadLogo onClick={handleLogoClick}/>
      <div className="leftzone">
        <div className="leftinleft">
          {isLogIn ? (
            <>
              <TextBox onClick={handleLogout} >로그아웃</TextBox>
              <Link to="/mypage"><TextBox>마이페이지</TextBox></Link>
            </>
          ) : (
            <>
              <Link to="/login"><TextBox>로그인</TextBox></Link>
              <Link to="/signup"><TextBox>회원가입</TextBox></Link>
            </>
          )}
        </div>
      </div>
      <div className="hamburger" onClick={toggleSidebar} />
    </NavContainer>
    <Sidebar isOpen={isOpen}>
        <div className="close" onClick={toggleSidebar}/>
        {isLogIn ? (
          <>
          <Link to="/mypage" onClick={toggleSidebar} style={{margin:"0"}}>{userInfo.authority}</Link>
          <Link to="/mypage" onClick={toggleSidebar} style={{fontSize:"3rem", fontWeight:"700"}}>{userInfo.userNickname} <span>님</span></Link>
          <Link onClick={handleLogout}>로그아웃</Link>
          </>
        ):(
          <>
          <Link to="login" onClick={toggleSidebar}>로그인</Link>
          <Link to="signup" onClick={toggleSidebar}>회원가입</Link>
          </>
        )}

        <Link to="performance" onClick={toggleSidebar}>공연</Link>
        <Link to="productPage" onClick={toggleSidebar}>STORE</Link>
        <Link to="music" onClick={toggleSidebar}>음원</Link>
        <Link to="communitypage" onClick={toggleSidebar}>커뮤니티</Link>
    </Sidebar>
    </>
  );
};

export default Header;
