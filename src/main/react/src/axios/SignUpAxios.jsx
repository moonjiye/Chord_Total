import axios from "axios";
import Common from "../utils/Common";
import { CHORD8_DOMAIN, Interceptor } from "../utils/Common";

// 로그인, 회원가입 axios 모음
const SignUpAxios = {
  // 회원가입
  signup: async (
    email,
    password,
    NickName,
    name,
    addr,
    addrDetale,
    tel,
    gender,
    age,
    bissNum
  ) => {
    const member = {
      userEmail: email,
      userPassword: password,
      userNickname: NickName,
      userName: name,
      userAddr: addr,
      userAddrDetale: addrDetale,
      userPhone: tel,
      userGen: gender,
      userAge: age,
      profileImg:
        "https://firebasestorage.googleapis.com/v0/b/chord8-22e59.appspot.com/o/profileImg.png?alt=media&token=8f711968-bb1c-44b3-ae93-42b190befdeb",
      BUSINESS_NUM: bissNum,
    };
    return await axios.post(CHORD8_DOMAIN + "/auth/sign", member);
  },

  // 이메일 중복 체크
  checkEmail: async (email) => {
    return await axios.get(CHORD8_DOMAIN + `/auth/email?email=${email}`);
  },

  // 이메일 문자 인증
  memberEmail: async (email) => {
    return await axios.post(CHORD8_DOMAIN + `/auth/mailConfirm?email=${email}`);
  },

  // 이메일 인증 번호 체크
  // email 속성 필수
  memberEpw: async (epw) => {
    return await axios.get(CHORD8_DOMAIN + `/auth/ePw?epw=${epw}`);
  },

  // 로그인
  memberLogin: async (email, password) => {
    const login = {
      userEmail: email,
      userPassword: password,
    };
    return await axios.post(CHORD8_DOMAIN + "/auth/login", login);
  },

  // 어드민 로그인
  addminLogin: async (email, password) => {
    const login = {
      userEmail: email,
      userPassword: password,
    };
    return await axios.post(CHORD8_DOMAIN + "/auth/addmin", login);
  },

  // 어드민 체크
  checkAddmin: async () => {
    const accessToken = Common.getAccessToken();
    console.log("로그인 상태 체크의 엑세스 토큰 : ", accessToken);
    // 인터셉터 자체로 리프레쉬 토큰 체크가 있으므로 로그인 체크는 axios를 활용
    return await axios.get(
      CHORD8_DOMAIN + `/user/isAdmin?accessToken=${accessToken}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },

  // 닉네임 중복 체크
  memberNickname: async (nickname) => {
    return await axios.get(
      CHORD8_DOMAIN + `/auth/nickName?nickName=${nickname}`
    );
  },

  // 전화번호 인증번호 받기
  memberTel: async (tel) => {
    return await axios.get(CHORD8_DOMAIN + `/sms/send-mms?tel=${tel}`);
  },

  // 인증번호 확인
  memberTelAuth: async (cnum) => {
    return await axios.get(CHORD8_DOMAIN + `/sms/check?cnum=${cnum}`);
  },

  // 카카오 토큰 발급
  kakaoLogin: async (code) => {
    return await axios.get(CHORD8_DOMAIN + `/auth/kakao?code=${code}`);
  },

  // 카카오 로그인 및 토큰 발급
  kakaoToken: async (email) => {
    return await axios.get(CHORD8_DOMAIN + `/auth/kakaoToken?email=${email}`);
  },

  // 이메일 찾기
  findEmail: async (nickname) => {
    return await axios.get(CHORD8_DOMAIN + `/auth/find?nickname=${nickname}`);
  },

  // 비밀번호 변경
  changePassword: async (nickname, password) => {
    const dto = {
      userNickname: nickname,
      userPassword: password,
    };
    return await axios.post(CHORD8_DOMAIN + `/auth/change/password`, dto);
  },

  // 로그인 상태 체크
  isLogin: async () => {
    const accessToken = Common.getAccessToken();
    console.log("로그인 상태 체크의 엑세스 토큰 : ", accessToken);
    // 인터셉터 자체로 리프레쉬 토큰 체크가 있으므로 로그인 체크는 axios를 활용
    return await axios.get(
      CHORD8_DOMAIN + `/user/isLogin?accessToken=${accessToken}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },
};

export default SignUpAxios;
