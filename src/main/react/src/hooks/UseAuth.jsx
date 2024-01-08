import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import SignUpAxios from "../axios/SignUpAxios";

// 로그인 체크 커스텀 훅
const UseAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState("");
  // const navigator = useNavigate();

  useEffect(() => {
    // 로그인 상태를 체크
    const checkLoginStatus = async () => {
      try {
        // 로그인 체크
        const res = await SignUpAxios.isLogin();
        // console.log("로그인 상태 체크 :", res.data);

        if (res.data) {
          // 로그인 상태
          const email = res.data;
          setIsLoggedIn(email);
        } else {
          setIsLoggedIn("");
        }
      } catch (e) {
        setIsLoggedIn("");
      }
    };

    checkLoginStatus();
  }, [isLoggedIn]);

  return isLoggedIn;
};

export default UseAuth;
