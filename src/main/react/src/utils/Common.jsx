import moment from "moment";
import "moment/locale/ko";
import axios from "axios";
moment.locale("ko");

export const CHORD8_DOMAIN = "";

const Common = {
  // accessToken
  setAccessToken: (accessToken) => {
    return window.localStorage.setItem("accessToken", accessToken);
  },
  getAccessToken: () => {
    return window.localStorage.getItem("accessToken");
  },
  // refreshToken
  setRefreshToken: (refreshToken) => {
    return window.localStorage.setItem("refreshToken", refreshToken);
  },
  getRefreshToken: () => {
    return window.localStorage.getItem("refreshToken");
  },

  // 카카오 로그인
  KH_DOMAIN: "",
  DOMAIN: "",
  SOCKET_URL: "ws://localhost:8111/ws/comment",
  SOCKET_CHAT_URL: "ws://localhost:8111/ws/chat",
  API_KEY: "a42a4db55c114cff5770a883fc8607f9",
  REDIRECT_URL: "http://localhost:8111/kakao",
  SECRET_KEY: "Xs7FwH1FUNOkspaOszcuw2wZXTQGrEIs",

  timeFromNow: (timestamp) => {
    return moment(timestamp).fromNow();
  },
  formatDate: (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Adds leading 0 if needed
    const day = ("0" + date.getDate()).slice(-2);
    const hour = ("0" + date.getHours()).slice(-2);
    const minute = ("0" + date.getMinutes()).slice(-2);
    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
  },
  truncateText: (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  },
  // 401 에러 처리 함수
  // handleUnauthorized: async () => {
  //   console.log("handleUnauthorized");
  //   const refreshToken = Common.getRefreshToken();
  //   const accessToken = Common.getAccessToken();
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   };
  //   try {
  //     const res = await axios.post(
  //       `${Common.KH_DOMAIN}/auth/refresh`,
  //       refreshToken,
  //       config
  //     );
  //     console.log(res.data);
  //     Common.setAccessToken(res.data);
  //     if (res.data) {
  //       Common.setAccessToken(res.data);
  //       // res.data(토큰값)을 가져와야 로컬스토리지에 넣을수 있음
  //       return res.data;
  //     } else {
  //       throw new Error("리프레쉬 토큰이 만료 되었습니다.");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     return false;
  //   }
  // },
  handleUnauthorized: async () => {
    console.log("handleUnauthorized 실행");
    const refreshToken = Common.getRefreshToken();
    const accessToken = Common.getAccessToken();
    const config = {
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const res = await axios.post(
        `${CHORD8_DOMAIN}/auth/refresh`,
        refreshToken,
        config
      );
      console.log("401 핸들러 엑세스 토큰 : ", res.data);
      if (res.data) {
        window.localStorage.setItem("accessToken", res.data);
        // res.data(토큰값)을 가져와야 로컬스토리지에 넣을수 있음
        return res.data;
      } else {
        window.localStorage.clear();
        throw new Error("리프레쉬 토큰이 만료 되었습니다.");
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};

// 인터 셉터
// 인터 셉터에 refresh 토큰 체크 추가
export const Interceptor = axios.create({
  baseURL: CHORD8_DOMAIN,
});

Interceptor.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      // console.log("인터 셉터의 리프레쉬 토큰 :", refreshToken);
      if (refreshToken && refreshToken !== "") {
        const newAccessToken = await Common.handleUnauthorized();
        console.log("인터 셉터의 새로운 토큰", newAccessToken);
        // newAccessToken이 false를 반환하는지 확인 후 "/"로 이동
        if (newAccessToken) {
          // localStorage.setItem("accessToken", newAccessToken);
          Interceptor.defaults.headers.common["Authorization"] =
            "Bearer " + newAccessToken;
          return Interceptor(originalRequest);
        } else {
          // 리프레시 토큰이 만료되었을 경우
          // 로컬 스토리지 제거
          alert("로그인이 만료되었습니다.");
          console.log("인터셉터의 else");
          window.localStorage.clear();
          window.location.href = "/";
        }
      } else {
        alert("로그인이 필요합니다.");
      }
    }
    return Promise.reject(error);
  }
  // Interceptor.interceptors.response.use(
  //   (response) => response,
  //   async (error) => {
  //     const originalRequest = error.config;
  //     if (error.response.status === 401 && !originalRequest._retry) {
  //       originalRequest._retry = true;
  //       const refreshToken = localStorage.getItem("refreshToken");
  //       if (refreshToken && refreshToken !== "") {
  //         const newAccessToken = await Common.handleUnauthorized();
  //         // newAccessToken이 false를 반환하는지 확인 후 "/"로 이동
  //         if (newAccessToken) {
  //           localStorage.setItem("accessToken", newAccessToken);
  //           Interceptor.defaults.headers.common["Authorization"] =
  //             "Bearer " + newAccessToken;
  //           return Interceptor(originalRequest);
  //         } else {
  //           // 리프레시 토큰이 만료되었을 경우
  //           alert("토큰이 만료되었습니다.");
  //           window.location.href = "/";
  //         }
  //       }
  //     }
  //     return Promise.reject(error);
  //   }
);

export default Common;
