import { BACKGROUND, Container } from "../component/login/LoginComponent";
import {
  Contents,
  Content,
  INPUT,
  BUTTON,
} from "../component/find/FindComponent";
import { useState } from "react";
import SignUpAxios from "../axios/SignUpAxios";

const FindPassword = () => {
  const [isTrue, setIsTrue] = useState(false);
  const [isNick, setIsNick] = useState(false);
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
    // console.log("닉네임 : ", nickname);
  };
  // 닉네임 체크
  const onClickEmail = async () => {
    try {
      if (nickname !== "") {
        const res = await SignUpAxios.findEmail(nickname);
        if (res.status === 200) {
          alert("닉네임 확인");
          setIsNick(true);
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

  // 비밀번호 변경
  const [inputPassword, setInputPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // 비밀번호 입력
  const onChangePassword = (e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    console.log("passwordCurrent:", passwordCurrent);
    setInputPassword(passwordCurrent);
    if (passwordRegex.test(passwordCurrent)) {
    }
  };
  // 비밀번호 확인
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    // console.log("confirmPassword : ", confirmPassword);
  };
  // 비밀번호 및 비밀번호 확인 체크
  const checkPassword = () => {
    if (inputPassword !== "" && confirmPassword !== "") {
      if (inputPassword === confirmPassword) {
        change();
      } else {
        alert("입력하신 비밀번호를 재확인하십시오.");
        // console.log("isConfirm : ", isConfirm);
      }
    } else {
      alert("비밀번호를 입력하시오");
    }
  };

  // 비밀번호 변경
  const change = async () => {
    try {
      const res = await SignUpAxios.changePassword(nickname, inputPassword);
      if (res.data === true) {
        alert("비밀번호가 재설정 되었습니다.");
      } else {
        alert("비밀번호 변경에 실패하였습니다.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Container>
        <BACKGROUND>
          <Contents height="80%">
            <h1 style={{ marginLeft: "10%", color: "white" }}>
              비밀번호를 찾습니다.
            </h1>
            <Content height="14%">
              <INPUT
                onChange={onChangeTel}
                placeholder="인증 받을 전화번호를 입력하세요"
              ></INPUT>
              <BUTTON onClick={handleSendMessage}>문자 전송</BUTTON>
            </Content>
            <Content height="14%">
              <INPUT
                onChange={onChangeAuth}
                placeholder="인증 번호 입력"
              ></INPUT>
              <BUTTON onClick={onClickAuth}>인증 번호</BUTTON>
            </Content>

            <Content height="14%">
              <INPUT
                readOnly={isTrue}
                placeholder="닉네임 입력"
                onChange={onChangeNickName}
              ></INPUT>
              <BUTTON onClick={onClickEmail}>닉네임</BUTTON>
            </Content>
            <Content height="14%">
              {isNick && (
                <>
                  <INPUT
                    onChange={onChangePassword}
                    style={{ marginRight: "25%" }}
                    placeholder="새로운 비밀 번호 입력"
                    type="password"
                  ></INPUT>
                </>
              )}
            </Content>
            <Content height="14%">
              {isNick && (
                <>
                  <INPUT
                    placeholder="비밀 번호 확인"
                    onChange={onChangeConfirmPassword}
                    type="password"
                  ></INPUT>
                  <BUTTON onClick={checkPassword}>비번 변경</BUTTON>
                </>
              )}
            </Content>
          </Contents>
        </BACKGROUND>
      </Container>
    </>
  );
};

export default FindPassword;
