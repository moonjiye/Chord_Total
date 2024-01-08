import { useState } from "react";
import { BACKGROUND } from "../component/login/LoginComponent";
import {
  SIGNUP,
  TOP,
  Main,
  Input,
  InputTitle,
  CheckButton,
  BusynessButton,
  Gender,
  BOTTOM,
  SignUpButton,
  Agree,
  CONTAINER,
  P1,
  Input1,
} from "../component/signup/SignUpComponent";
import SignUpAxios from "../axios/SignUpAxios";
import { useNavigate } from "react-router-dom";
import SmsApi from "../api/SmsApi";
import KakaoAddr from "../api/KakaoAddrApi";
import { ModalComponent } from "../utils/ModalComponent";
import NoneBtnModalComponent from "../utils/NoneBtnModalComponent";

const SignupPage = () => {
  const navigate = useNavigate();

  // 유효성 검사
  const [isId, setIsId] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isNickName, setIsNickName] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isAddr, setIsAddr] = useState(false);
  const [isTel, setIsTel] = useState(false);
  const [isGender, setIsGender] = useState(false);
  const [isAge, setIsAge] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  // 약관 동의 체크
  const [firstAgree, setfirstAgree] = useState(false);
  const [secondAgree, setSecondAgree] = useState(false);

  const handleFirstAreeChange = () => {
    setfirstAgree(!firstAgree);
  };
  const handleSecondAreeChange = () => {
    setSecondAgree(!secondAgree);
  };
  const handleAllAgreeChange = () => {
    if (firstAgree === secondAgree) {
      setfirstAgree(!firstAgree);
      setSecondAgree(!secondAgree);
    } else {
      setfirstAgree(false);
      setSecondAgree(false);
    }
  };

  // 약관 모달
  const [agreeModal, setAgreeModal] = useState(false);
  const openAgreeModal = () => {
    setAgreeModal(!agreeModal);
  };

  // 인증 번호 입력창 제어
  const [sms, setSms] = useState(false);
  const closeSms = () => {
    setSms(false);
  };

  // 주소 입력창 제어
  const [kakaoModal, setKakao] = useState(false);
  const openKakao = () => {
    setKakao(true);
  };
  const closeKakao = () => {
    setKakao(false);
    if (addr !== null) {
      setIsAddr(true);
    }
  };

  // 이메일
  const [inputEmail, setInputEmail] = useState("");
  const onChangeEmail = (e) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailRegex) {
      setInputEmail(e.target.value);
    }
  };

  // 인증번호 체크
  const [EPW, setEPW] = useState("");
  const onChangeEPW = (e) => {
    setEPW(e.target.value);
  };

  // 비밀번호
  const [inputPassword, setInputPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // 비밀번호 입력
  const onChangePassword = (e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    console.log("passwordCurrent:", passwordCurrent);
    setInputPassword(passwordCurrent);
    if (passwordRegex.test(passwordCurrent)) {
      setIsPw(true);
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
        setIsConfirm(true);
        // console.log("isConfirm : ", isConfirm);
        alert("입력 정보가 동일합니다.");
        setIsPw(true);
      } else {
        alert("입력하신 비밀번호를 재확인하십시오.");
        setIsConfirm(false);
        // console.log("isConfirm : ", isConfirm);
      }
    } else {
      alert("비밀번호를 입력하시오");
    }
  };

  // 닉네임 (임시)
  const [nickName, setNickName] = useState("");
  const onChangeNickName = (e) => {
    setNickName(e.target.value);
  };

  // 이름
  const [name, setName] = useState("");
  const onChangeName = (e) => {
    setName(e.target.value);
    // console.log("name", name);
    setIsName(true);
  };

  // 주소
  const [addr, setAddr] = useState("");
  // 상세 주소
  const [addrDetail, setAddrDetail] = useState("");

  // 휴대전화 번호
  const [tel, setTel] = useState("");
  const onChangeTel = (e) => {
    setTel(e.target.value);
    // console.log("tel:", tel);
    setIsTel(true);
  };

  // 인증 번호
  const [cnum, setCnum] = useState("");
  const onChangeCnum = (event) => {
    setCnum(event.target.value);
  };

  // 성별 선택
  const [gender, setGender] = useState("");
  const onChangegender = (e) => {
    const genderType = e.target.value;
    setGender(genderType);
    // console.log("genderType:", genderType);
    // console.log("e.target.value:", e.target.value);
    setIsGender(true);
  };

  // 나이
  const [age, setAge] = useState("");
  const onChangeAge = (e) => {
    setAge(e.target.value);
    // console.log("age", age);
    setIsAge(true);
  };

  // 이메일 인증
  const onClcikCheckEmail = async () => {
    try {
      const res = await SignUpAxios.memberEmail(inputEmail);
      if (res.data === true) {
        // 입력 모달 등장
        alert("이메일 인증번호를 전송합니다.");
      } else {
        alert("이미 존재하는 이메일 혹은 존재하지 않는 이메일입니다.");
      }
    } catch (error) {
      alert("서버의 연결이 불안정 합니다.");
      console.log("이메일 입력:", error);
    }
  };

  // 입력받은 인증번호 체크
  const checkEPW = async () => {
    try {
      const res = await SignUpAxios.memberEpw(EPW);
      if (res.data === true) {
        setIsId(true);
        alert("인증 성공");
      } else {
        setIsId(false);
        alert("인증 실패");
      }
    } catch (error) {
      alert("연결 실패");
    }
  };

  // 닉네임 중복 체크
  const onClickCheckNickName = async () => {
    try {
      if (nickName !== "") {
        const checkNickName = await SignUpAxios.memberNickname(nickName);
        // 중복이 없어야 true 설정. false를 받아야 중복이 없는것.
        console.log(checkNickName.data);
        if (checkNickName.data === true) {
          alert("이미 존재하는 닉네임입니다.");
          setIsNickName(false);
        } else {
          alert("유효한 닉네임입니다.");
          setIsNickName(true);
        }
      } else {
        alert("닉네임을 입력하세요");
      }
    } catch (error) {
      alert("닉네임 입력 정보를 확인하십시오.", error);
    }
  };

  // 휴대폰 번호 인증하기
  const onClickCheckTel = () => {
    setSms(true);
  };

  // SMS를 보내는 함수
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

  // 인증 번호를 보내는 함수
  const handleSendCnum = async () => {
    try {
      const res = await SignUpAxios.memberTelAuth(cnum);
      if (res.data === true) {
        alert("인증 성공");
        setIsTel(true);
      } else {
        alert("인증 실패");
        setIsTel(false);
      }
    } catch (error) {
      console.log("인증 연결 실패", error);
      setIsTel(false);
    }
  };

  // 사업자 번호
  const [bissNum, setBissNum] = useState("");
  const onChangeBiss = (e) => {
    setBissNum(e.target.value);
  };

  // 회원 가입
  const onClickSignUp = async () => {
    try {
      if (firstAgree === true && secondAgree === true) {
        if (
          inputEmail !== "" &&
          inputPassword !== "" &&
          nickName !== "" &&
          name !== "" &&
          addr !== "" &&
          addrDetail !== "" &&
          tel !== "" &&
          gender !== "" &&
          age !== "" &&
          isConfirm !== ""
        ) {
          const res = await SignUpAxios.signup(
            inputEmail,
            inputPassword,
            nickName,
            name,
            addr,
            addrDetail,
            tel,
            gender,
            age,
            bissNum
          );
          console.log("회원 패스워드", inputPassword);
          console.log("회원가입 결과 : ", res);
          if (res.status === 200) {
            alert("회원가입에 성공하셨습니다.");
            navigate("/login");
            // 임시
            // navigate("/");
          } else {
            alert("회원 가입에 실패하셨습니다.");
          }
        } else {
          if (isId === false) {
            alert("이메일을 확인하십시오.");
          } else if (isPw === false) {
            alert("비밀번호를 확인하십시오.");
          } else if (isNickName === false) {
            alert("닉네임을 확인하십시오.");
          } else if (isName === false) {
            alert("회원님의 성함을 입력하십시오.");
          } else if (isAddr === false) {
            alert("주소 정보를 입력하십시오.");
          } else if (isGender === false) {
            alert("성별 입력 정보를 확인하십시오.");
          } else if (isTel === false) {
            alert("전화번호를 확인하십시오.");
          } else if (isAge === false) {
            alert("연령을 입력하십시오.");
          } else {
            alert("정보를 확인하십시오.");
          }
        }
      }
    } catch (error) {
      alert("서버의 연결이 불안정합니다.");
    }
  };

  return (
    <>
      <CONTAINER>
        <BACKGROUND>
          <SIGNUP>
            <TOP>
              <p className="top-title">회원가입</p>
            </TOP>
            <Main>
              <div className="left">
                <div className="input-session">
                  <div className="input-session1">
                    <div className="input-session1-top">
                      <InputTitle>이메일(아이디)</InputTitle>
                    </div>
                    <div className="input-session1-bottom">
                      <Input
                        onChange={onChangeEmail}
                        onBlur={onChangeEmail}
                      ></Input>
                      <CheckButton onClick={onClcikCheckEmail}>
                        <ModalComponent
                          open="인증하기"
                          fontSize={"1rem"}
                          padding={0}
                          width={"100%"}
                          close="닫기"
                          openButtonStyle={{
                            bgColor: "#61e6ca",
                            height: "100%",
                            lineHeight: "0",
                            fontSize: "1rem",
                            fontWeight: "400",
                          }}
                          content={
                            <>
                              <p style={{ color: "black" }}>
                                해당 이메일로 발급된 인증번호를 입력하세요
                              </p>
                              <input type="text" onChange={onChangeEPW} />
                              <button onClick={checkEPW}>확인 </button>
                            </>
                          }
                        ></ModalComponent>
                      </CheckButton>
                    </div>
                  </div>

                  <div className="input-session1">
                    <div className="input-session1-top">
                      <InputTitle>비밀번호</InputTitle>
                    </div>
                    <div className="input-session1-bottom">
                      <Input
                        type="password"
                        onChange={onChangePassword}
                        onBlur={onChangePassword}
                        onFocus={onChangePassword}
                      ></Input>
                    </div>
                  </div>
                  <div className="input-session1">
                    <div className="input-session1-top">
                      <InputTitle>비밀번호 확인</InputTitle>
                    </div>
                    <div className="input-session1-bottom">
                      <Input
                        type="password"
                        onChange={onChangeConfirmPassword}
                        onBlur={onChangeConfirmPassword}
                        onFocus={onChangeConfirmPassword}
                      ></Input>
                      <CheckButton onClick={checkPassword}>
                        확인체크
                      </CheckButton>
                    </div>
                  </div>
                  <div className="input-session1">
                    <div className="input-session1-top">
                      <InputTitle>닉네임</InputTitle>
                    </div>
                    <div className="input-session1-bottom">
                      <Input
                        onBlur={onChangeNickName}
                        onChange={onChangeNickName}
                      ></Input>
                      <CheckButton onClick={onClickCheckNickName}>
                        중복확인
                      </CheckButton>
                    </div>
                  </div>
                  <div className="input-session1">
                    <div className="input-session1-top">
                      <InputTitle>이름</InputTitle>
                    </div>
                    <div className="input-session1-bottom">
                      <Input
                        onBlur={onChangeName}
                        onChange={onChangeName}
                      ></Input>
                    </div>
                  </div>
                  <div className="input-session1">
                    <div className="input-session1-top">
                      {/* 주소 제목 */}
                      <InputTitle>주소</InputTitle>
                    </div>
                    <div className="input-session1-bottom">
                      <Input
                        // onChange={onChangeAddr}
                        // onBlur={onChangeAddr}
                        onClick={openKakao}
                        value={addr + " " + addrDetail}
                      ></Input>

                      <CheckButton onClick={openKakao}>
                        <P1>주소찾기</P1>
                        <NoneBtnModalComponent
                          isOpen={kakaoModal}
                          setIsOpen={closeKakao}
                          close={{ text: "닫기" }}
                          content={
                            <KakaoAddr
                              kakao={kakaoModal}
                              close={closeKakao}
                              onAddress={setAddr}
                              onDetailAddress={setAddrDetail}
                            ></KakaoAddr>
                          }
                        />
                      </CheckButton>

                      {/* 카카오 주소 찾기 */}
                    </div>
                  </div>
                  <div className="input-session1">
                    <div className="input-session1-top">
                      <InputTitle>휴대폰 번호</InputTitle>
                    </div>
                    <div className="input-session1-bottom">
                      <Input
                        onChange={onChangeTel}
                        onBlur={onChangeTel}
                        onFocus={onChangeTel}
                      ></Input>
                      <CheckButton onClick={onClickCheckTel}>
                        <ModalComponent
                          open="인증하기"
                          fontSize={"1rem"}
                          padding={0}
                          width={"100%"}
                          close="닫기"
                          openButtonStyle={{
                            bgColor: "#61e6ca",
                            height: "100%",
                            lineHeight: "0.3",
                            fontSize: "1rem",
                          }}
                          content={
                            <SmsApi
                              open={sms}
                              close={closeSms}
                              tel={tel}
                              send={handleSendMessage}
                              cn={handleSendCnum}
                              onChangeCnum={onChangeCnum}
                            ></SmsApi>
                          }
                        />
                      </CheckButton>
                    </div>
                  </div>

                  <div className="input-session2">
                    <div className="session-left">
                      <div className="session-left-top">성별</div>
                      <div className="session-left-bottom">
                        <span>남</span>
                        <label>
                          <Gender
                            type="radio"
                            name="gender"
                            value="male"
                            checked={gender === "male"}
                            onChange={onChangegender}
                          />
                        </label>
                        <span>여</span>
                        <label>
                          <Gender
                            type="radio"
                            name="gender"
                            value="female"
                            checked={gender === "female"}
                            onChange={onChangegender}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="session-right">
                      <div className="session-right-top">나이</div>
                      <div className="session-right-bottom">
                        <Input1
                          width="80%"
                          marginTop="-5px"
                          height="100%"
                          onChange={onChangeAge}
                          onBlur={onChangeAge}
                          onFocus={onChangeAge}
                        ></Input1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="right">
                <div className="busyness">
                  <div className="text">
                    <div className="text-title-option">
                      사업자정보입력(선택)
                    </div>
                    <div className="text-main">
                      영리목적의 음원등록, 공연등록, 반복적인 판매 서비스를
                      이용하는 경우 사업자등록 및 인증이 필요합니다.
                    </div>
                    <br />
                    <div className="text-main">
                      입력하지 않더라도 구매 서비스 및 단발성 판매 서비스는
                      이용하실 수 있습니다.
                    </div>
                    <br />
                    <div className="text-main">
                      작성하지 않더라도 회원가입 가능하며 필요시 마이페이지에서
                      인증하실 수 있습니다.
                    </div>
                  </div>
                  <div className="input-busyness-number">
                    <div className="input-busyness-number-session">
                      <p>사업자 번호</p>
                      <Input
                        width="100%"
                        height="20%"
                        onChange={onChangeBiss}
                      ></Input>
                      <p>상호 명</p>
                      <Input width="100%" height="20%"></Input>
                    </div>
                    <div className="check-button-session">
                      <BusynessButton>확인하기</BusynessButton>
                    </div>
                  </div>
                </div>
                <div className="agreement">
                  <div className="agreement-top">약관 동의</div>
                  <div className="agreement-main">
                    <div className="agreement-main-row">
                      <span
                        style={{ fontWeight: "900", cursor: "pointer" }}
                        onClick={openAgreeModal}
                      >
                        모두 동의
                        <NoneBtnModalComponent
                          isOpen={agreeModal}
                          setIsOpen={openAgreeModal}
                          close={{ text: "닫기" }}
                          content={
                            <div
                              style={{
                                maxHeight: "70vh", // 모달 높이 제한
                                overflowY: "auto", // 세로 스크롤이 필요할 때만 표시
                              }}
                            >
                              <p style={{ color: "black" }}>
                                개인정보 처리 규정
                                <br />
                                안녕하세요! [chord8]을 이용해 주셔서 감사합니다.
                                저희는 사용자의 개인정보를 소중히 보호하며, 관련
                                법령 및 규정을 준수하고 있습니다. 아래는 저희 웹
                                페이지에서 개인정보를 수집, 이용, 보호하는 데
                                관한 규정입니다.
                              </p>
                              <p style={{ color: "black" }}>
                                1. 수집하는 개인정보 항목
                                <br />
                                필수항목: 이름 선택항목: 없음
                                <br />
                                2. 개인정보의 수집 및 이용 목적
                                <br />
                                이름: 서비스 이용에 따른 개인식별, 웹 페이지
                                이용에 따른 통계 및 분석
                                <br />
                                3. 개인정보의 보유 및 이용 기간 회원 탈퇴 시
                                또는 서비스 종료 시 즉시 파기
                                <br />
                                4. 개인정보의 파기 절차 및 방법
                                <br />
                                파기 절차: 개인정보는 목적 달성 후 즉시
                                파기되며, 복구 및 재생이 불가능한 방법으로
                                파기됩니다. 파기 방법: 전자적 파일 형태의 정보는
                                기록을 재생할 수 없는 기술적 방법을 사용하여
                                삭제하고, 종이에 출력된 개인정보는 분쇄기를 통해
                                파기됩니다.
                                <br /> 5. 개인정보의 제3자 제공에 관한 사항
                                <br />
                                저희 웹 페이지는 사용자의 동의 없이 개인정보를
                                타 기관 또는 제3자에게 제공하지 않습니다.
                                <br />
                                6. 이용자의 권리와 행사 방법
                                <br />
                                이용자는 언제든지 자신의 개인정보에 대한 접근,
                                정정, 삭제, 처리정지 등의 권리를 행사할 수
                                있습니다. 이와 관련한 문의는
                                [jojo6807@naver.com]로 연락 주시기 바랍니다.
                                <br /> 7. 개인정보 보호책임자
                                <br />
                                개인정보 보호책임자: [조영준]
                                <br />
                                이메일 주소: [jojo6807@naver.com]
                                <br />
                                위의 규정은 웹 페이지 이용자의 개인정보를
                                보호하기 위한 기본적인 내용을 담고 있습니다.
                                저희는 이 규정을 개정할 수 있으며, 개정된 내용은
                                웹 페이지를 통해 공지됩니다.
                                <br />
                                감사합니다. [chord8]을 이용해 주셔서 기쁩니다!
                              </p>
                              <span
                                onClick={openAgreeModal}
                                style={{
                                  cursor: "pointer",
                                  color: "red",
                                }}
                              >
                                개인정보처리방침(필수)
                              </span>
                              <Agree
                                type="checkbox"
                                checked={firstAgree}
                                onChange={handleFirstAreeChange}
                              ></Agree>

                              <p style={{ color: "black" }}>
                                [웹 페이지명] 이용약관
                                <br />
                                제1조 (목적)
                                <br />본 약관은 [웹 페이지명] (이하 "서비스"라
                                합니다)의 이용 조건과 절차, 회원과 서비스 제공자
                                간의 권리 및 의무, 책임 사항 등 기본적인 사항을
                                규정함을 목적으로 합니다.
                                <br />
                                제2조 (정의) "회원"은 서비스에 접속하여 이
                                약관에 따라 [웹 페이지명]이 제공하는 서비스를
                                받는 자를 말합니다. "이용자"는 회원 및 비회원을
                                모두 포함한 서비스를 이용하는 모든 사용자를
                                말합니다.
                                <br />
                                제3조 (서비스의 제공 및 변경) [웹 페이지명]은
                                회원에게 아래와 같은 서비스를 제공합니다.
                                [서비스 내용 기술] [웹 페이지명]은 상당한 이유가
                                있는 경우 서비스의 전부 또는 일부를 변경할 수
                                있으며, 이로 인해 발생하는 손해에 대해 책임을
                                지지 않습니다.
                                <br />
                                제4조 (회원가입 및 계정) 서비스를 이용하려면
                                회원가입이 필요합니다. 회원은 본인의 개인정보를
                                제공하여 회원가입을 완료해야 하며, 제공된 정보는
                                항상 정확해야 합니다.
                                <br />
                                제5조 (회원의 의무와 책임) 회원은 자신의 계정
                                정보를 안전하게 관리해야 합니다. 회원은 서비스를
                                부정하게 이용하거나 타인의 정보를 도용하여
                                이용할 수 없습니다.
                                <br />
                                제6조 (서비스 이용의 제한 및 중단) [웹
                                페이지명]은 회원이 본 약관을 위반한 경우에는
                                사전 통지 없이 서비스의 이용을 제한하거나 중단할
                                수 있습니다.
                                <br />
                                제7조 (개인정보 보호) [웹 페이지명]은 회원의
                                개인정보를 본인의 동의 없이 타인에게 제공하지
                                않습니다.
                                <br />
                                제8조 (게시물의 관리) 회원이 서비스 내에 게시한
                                게시물은 사전 통지 없이 [웹 페이지명]에 의해
                                삭제될 수 있습니다.
                                <br />
                                제9조 (책임의 한계) [웹 페이지명]은 정상적인
                                서비스 제공을 위해 최선을 다하지만, 다음의
                                사항에 대해 책임을 지지 않습니다. 천재지변 또는
                                이에 준하는 불가항력적인 상황 회원의 귀책사유로
                                인한 서비스 이용의 장애
                                <br />
                                제10조 (분쟁의 해결) 본 약관과 관련하여 분쟁이
                                발생할 경우, 당사자 간의 합의에 의해 원만히
                                해결합니다. 본 약관은 [약관 동의 일자]부터
                                시행됩니다.
                              </p>
                              <span
                                onClick={openAgreeModal}
                                style={{ cursor: "pointer", color: "red" }}
                              >
                                이용약관(필수)
                              </span>
                              <Agree
                                type="checkbox"
                                checked={secondAgree}
                                onChange={handleSecondAreeChange}
                              ></Agree>
                            </div>
                          }
                        />
                      </span>
                      <Agree
                        type="checkbox"
                        checked={firstAgree && secondAgree}
                        onChange={handleAllAgreeChange}
                      ></Agree>
                    </div>
                    <div className="agreement-main-row">
                      <span
                        onClick={openAgreeModal}
                        style={{ cursor: "pointer" }}
                      >
                        개인정보처리방침(필수)
                      </span>
                      <Agree
                        type="checkbox"
                        checked={firstAgree}
                        onChange={handleFirstAreeChange}
                      ></Agree>
                    </div>
                    <div className="agreement-main-row">
                      <span
                        onClick={openAgreeModal}
                        style={{ cursor: "pointer" }}
                      >
                        이용약관(필수)
                      </span>
                      <Agree
                        type="checkbox"
                        checked={secondAgree}
                        onChange={handleSecondAreeChange}
                      ></Agree>
                    </div>
                  </div>
                </div>
              </div>
            </Main>
            <BOTTOM>
              <SignUpButton onClick={onClickSignUp}>가입</SignUpButton>
            </BOTTOM>
          </SIGNUP>
        </BACKGROUND>
      </CONTAINER>
    </>
  );
};

export default SignupPage;
