import {
  Contents,
  Content,
  INPUT,
  Container,
  BACKGROUND,
  BUTTON,
} from "../component/find/FindComponent";
import { useState } from "react";
import SignUpAxios from "../axios/SignUpAxios";

const FindEmail = () => {
  const [email, setEmail] = useState("");

  const [isTrue, setIsTrue] = useState(true);
  // 전화 번호 인증
  const [tel, setTel] = useState("");
  const onChangeTel = (e) => {
    setTel(e.target.value);
  };

  const handleSendMessage = async () => {
    try {
      const res = await SignUpAxios.memberTel(tel);
      console.log("휴대전화 번호", tel);
      console.log(res.data);
      if (res.data.statusCode === "2000") {
        alert("문자가 발송되었습니다.");
      } else {
        alert("전화 번호를 확인하십시오!!");
      }
    } catch (error) {
      // 오류 발생 시 처리
      alert("연결이 불안정합니다.");
      console.error("SMS 전송 실패:", error);
    }
  };

  // 인증 번호 입력
  const [auth, setAuth] = useState("");
  const onChangeAuth = (e) => {
    setAuth(e.target.value);
  };
  // 인증 번호를 보내는 함수
  const onClickAuth = async () => {
    try {
      const res = await SignUpAxios.memberTelAuth(auth);
      if (res.data === true) {
        alert("인증 성공");
        setIsTrue(false);
      } else {
        alert("인증 실패");
        setIsTrue(true);
      }
    } catch (error) {
      console.log("인증 연결 실패", error);
      setIsTrue(true);
    }
  };

  // 닉네임 입력
  const [nickname, setNickName] = useState("");
  const onChangeNickName = (e) => {
    setNickName(e.target.value);
    console.log("닉네임 : ", nickname);
  };

  const onClickEmail = async () => {
    try {
      if (nickname !== "") {
        const res = await SignUpAxios.findEmail(nickname);
        if (res.status === 200) {
          setEmail(res.data);
        } else {
          alert("해당 회원이 존재하지 않습니다.");
        }
      } else {
        alert("닉네임을 입력하세요");
      }
    } catch (e) {
      console.log(e);
      alert("회원 정보를 입력하시오.");
    }
  };

  return (
    <>
      <Container>
        <BACKGROUND>
          <Contents>
            <h1 style={{ marginLeft: "10%", color: "white" }}>
              이메일을 찾습니다.
            </h1>
            <Content>
              <INPUT
                onChange={onChangeTel}
                placeholder="인증 받을 전화번호를 입력하세요"
              ></INPUT>
              <BUTTON onClick={handleSendMessage}>문자 전송</BUTTON>
            </Content>
            <Content>
              <INPUT
                onChange={onChangeAuth}
                placeholder="인증 번호 입력"
              ></INPUT>
              <BUTTON onClick={onClickAuth}>인증 번호</BUTTON>
            </Content>
            <Content>
              <INPUT
                readOnly={isTrue}
                placeholder="닉네임 입력"
                onChange={onChangeNickName}
              ></INPUT>
              <BUTTON onClick={onClickEmail}>닉네임</BUTTON>
            </Content>
            <Content>
              {email && (
                <p style={{ fontSize: "3rem" }}>회원 이메일 : {email}</p>
              )}
            </Content>
          </Contents>
        </BACKGROUND>
      </Container>
    </>
  );
};

export default FindEmail;
