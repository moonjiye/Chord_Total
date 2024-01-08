import AxiosApi from "../../axios/PerformanceAxios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, UserInfo, UpdateZone, InputBox, Button } from "../../style/performance/PerformanceUpdateStyle";
import UpdateBox from "../../component/performance/UpdateBox";
import UpdateUserInfo from "../../component/performance/UpdateUserInfo";
import ModalComponent from "../../utils/ModalComponent";
import UseAuth from "../../hooks/UseAuth";
import FooterContext from "../../context/FooterContext";



const PerformanceUpdate = () => {

  const [userList, setUserList] = useState([]); // AxiosApi로 가져온 유저정보를 저장

  const { setFooterData } = useContext(FooterContext);

  useEffect(() => {
    setFooterData(<a href="https://www.flaticon.com/kr/free-icons/" title="심장 아이콘">심장 아이콘  제작자: Kiranshastry - Flaticon</a>);
  }, []);

  const navigate = useNavigate();

  const email = UseAuth();
  console.log("공연등록 이메일조회 : ", email);

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
            const response = await AxiosApi.getUserList();
            setUserList(response.data);
        } catch (error) {
            console.error('Error fetching performance list', error);
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
      <UpdateUserInfo userList={userList}/>
      <UpdateBox userList={userList}/>
    </Container>
    </>
  );

};

export default PerformanceUpdate;