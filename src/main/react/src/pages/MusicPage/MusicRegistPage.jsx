import React, { useEffect, useState } from "react";
import MusicAxiosApi from "../../axios/MusicAxios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  UserInfo,
  UpdateZone,
  InputBox,
  Button,
} from "../../style/music/MusicUpdateStyle";
import UpdateBox from "../../component/musicList/UpdateBox";
import UpdateUserInfo from "../../component/performance/UpdateUserInfo";
import UseAuth from "../../hooks/UseAuth";
import PerformanceAxios from "../../axios/PerformanceAxios";

const MusicRegistPage = () => {
  const [userList, setUserList] = useState([]); // AxiosApi로 가져온 유저정보를 저장

  const navigate = useNavigate();

  const email = UseAuth();
  console.log(email);

  // useEffect(() => {
  //   if (!email) {
  //     alert("로그인이 필요합니다.");
  //     navigate("/login");
  //   }
  // }, []);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 모든 회원정보를 불러옵니다.
    const fetchUserList = async () => {
      try {
        const response = await PerformanceAxios.getUserList();
        setUserList(response.data);
      } catch (error) {
        console.error("Error fetching performance list", error);
      }
    };
    fetchUserList();
  }, []);

  useEffect(() => {
    console.log(userList);
  }, [userList]); // userList가 변경될 때마다 로그를 출력합니다.
  // 입력값을 서버로 전송할 부분

  return (
    <>
      <Container>
        <UpdateUserInfo userList={userList} />
        <UpdateBox />
      </Container>
    </>
  );
};

export default MusicRegistPage;
