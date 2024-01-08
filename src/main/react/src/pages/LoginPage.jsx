import { useState, useEffect, useContext } from "react";
import {
  Container,
  BACKGROUND,
  LoginSginup,
  InputEmail,
  InputPassword,
  Bottom,
  Button,
  P,
  SignUpTitle,
  LoginTitle,
  SignUpButton,
  CheckInput,
  P2,
  LOGO,
  P3,
  TEXT,
} from "../component/login/LoginComponent";
import SignUpAxios from "../axios/SignUpAxios";
import { useNavigate } from "react-router-dom";
import kakao from "../images/kakao_login.png";
import Common from "../utils/Common";
import FooterContext from "../context/FooterContext";

const LoginPage = () => {
  // 저작권
  const { setFooterData } = useContext(FooterContext);

  useEffect(() => {
    setFooterData(
      <a href="https://www.flaticon.com/free-icons/add" title="add icons">
        Add icons created by Freepik - Flaticon
      </a>
    );
  }, []);

  const navigate = useNavigate();

  // 이메일 찾기 이동
  const onClickToEmail = () => {
    navigate("/findemail");
  };

  // 비밀번호 찾기
  const onClickToPassword = () => {
    navigate("/findpassword");
  };

  // 이메일 패스워드 입력
  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");

  // 카카오 로그인
  const apiKey = Common.API_KEY;
  const redirectUrl = Common.REDIRECT_URL;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${apiKey}&redirect_uri=${redirectUrl}&response_type=code`;
  const loginHandler = () => {
    window.location.href = link;
  };

  // 입력 받으면 메세지 등장, margin 제거
  const [emailmsg, setEmailMsg] = useState(false);
  const [passwordmsg, setPasswordMsg] = useState(false);

  // 오류 메시지
  const [emailMessage, setEmailMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");

  // 유효성 검사
  const [isId, setIsId] = useState("");
  const [isPw, setIsPw] = useState("");

  // 이메일 제약 조건
  const onChangeEmail = (e) => {
    setEmailMsg(true);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setInputEmail(e.target.value);
    if (!emailRegex.test(e.target.value)) {
      setEmailMessage("이메일 형식이 올바르지 않습니다.");
      setIsId(false);
    } else {
      setEmailMessage("올바른 형식입니다.");
      setIsId(true);
    }
  };
  // 패스워드 제약 조건
  const onChangePw = (e) => {
    setPasswordMsg(true);

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setInputPw(passwordCurrent);
    if (!passwordRegex.test(passwordCurrent)) {
      setPwMessage("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주십시오.");
      setIsPw(false);
    } else {
      setPwMessage("유효한 비밀번호입니다.");
      setIsPw(true);
    }
  };

  const onClickTosign = (e) => {
    navigate("/signup");
  };

  const onClickLogin = async () => {
    // 로컬 스토리지 비우기
    window.localStorage.clear();
    try {
      const res = await SignUpAxios.memberLogin(inputEmail, inputPw);
      console.log("로그인 정보 : ", res.data);
      if (res.data.grantType === "Bearer") {
        // 이메일 불러오는 함수 만들기 보류 중
        // 이메일 저장.
        window.localStorage.setItem("email", inputEmail);
        // 엑세스 토큰 저장
        console.log("AccessToken : ", res.data.accessToken);
        const accessToken = res.data.accessToken;
        window.localStorage.setItem("accessToken", accessToken);
        // 리프레쉬 토큰 저장
        console.log("Refreshtoken : ", res.data.refreshToken);
        const refreshToken = res.data.refreshToken;
        // console.log("토큰의 id:", res.data.accessToken.name);
        window.localStorage.setItem("refreshToken", refreshToken);
        alert("로그인 성공");
        // 로그인 성공 시 메인 페이지로 이동
        navigate("/");
        window.location.reload();
      } else {
        alert("입력 정보를 확인하시오.");
      }
    } catch (error) {
      alert("네트 워크 연결이 불안정합니다.");
    }
  };

  const onClickAddminLogin = async () => {
    // 로컬 스토리지 비우기
    window.localStorage.clear();
    try {
      const res = await SignUpAxios.addminLogin(inputEmail, inputPw);
      console.log("로그인 정보 : ", res.data);
      if (res.data.grantType === "Bearer") {
        const accessToken = res.data.accessToken;
        window.localStorage.setItem("accessToken", accessToken);
        const refreshToken = res.data.refreshToken;
        window.localStorage.setItem("refreshToken", refreshToken);
        window.localStorage.setItem("admin", "admin");
        alert("관리자 로그인 성공");
        // 로그인 성공 시 메인 페이지로 이동
        navigate("/adminpage");
        window.location.reload();
      } else {
        alert("입력 정보를 확인하시오.");
      }
    } catch (error) {
      alert("네트 워크 연결이 불안정합니다.");
    }
  };

  return (
    <>
      <Container>
        <BACKGROUND>
          <LoginSginup>
            <LOGO onDoubleClick={onClickAddminLogin}></LOGO>

            <div className="login">
              <div className="inline">
                <LoginTitle>
                  Login{" "}
                  <span
                    onClick={onClickAddminLogin}
                    style={{ cursor: "pointer" }}
                  >
                    /Admin
                  </span>
                </LoginTitle>
                <InputEmail
                  placeholder="EMAIL"
                  onFocus={onChangeEmail}
                  onChange={onChangeEmail}
                  emailmsg={emailmsg}
                ></InputEmail>
                <CheckInput>
                  <p
                    className={`${isId ? "true" : "false"}`}
                    style={{ color: `${isId ? "white" : "red"}` }}
                  >
                    {emailMessage}
                  </p>
                </CheckInput>
                <InputPassword
                  type="password"
                  placeholder="PASSWORD"
                  onFocus={onChangePw}
                  onChange={onChangePw}
                  passwordmsg={passwordmsg}
                ></InputPassword>
                <CheckInput>
                  <p
                    className={`${isPw ? "true" : "false"}`}
                    style={{ color: `${isPw ? "white" : "red"}` }}
                  >
                    {pwMessage}
                  </p>
                </CheckInput>

                <Bottom>
                  <div className="login-button">
                    <img
                      src={kakao}
                      alt="카카오"
                      onClick={loginHandler}
                      style={{
                        width: "100%",
                        height: "3.8rem",
                        cursor: "pointer",
                      }}
                    />
                  </div>

                  <div className="login-button">
                    <Button onClick={onClickLogin}>로그인</Button>
                    <P onClick={onClickToEmail}>아이디 찾기</P>
                    <P onClick={onClickToPassword}>비밀번호 찾기</P>
                  </div>
                </Bottom>
                <TEXT>
                  <P3 onClick={onClickToEmail}> 아이디 찾기 | </P3>
                  <P3 onClick={onClickToPassword}>비밀번호 찾기</P3>
                </TEXT>
              </div>
            </div>
            <div className="signup">
              <div className="inline">
                <SignUpTitle>SignUp</SignUpTitle>
                <p style={{ color: "white", fontSize: "1.5rem" }}>
                  아직 회원이 아니시라면?
                </p>
                <P3 style={{ color: "#005AA5", marginTop: "30px" }}>
                  아직 회원이 아니시라면?
                </P3>
                <SignUpButton>
                  <P2>회원 가입</P2>
                  <div className="signup-img" onClick={onClickTosign}></div>
                </SignUpButton>
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                left: "50%",
                opacity: "0.5",
              }}
            ></div>
          </LoginSginup>
        </BACKGROUND>
      </Container>
    </>
  );
};

export default LoginPage;
