// import { useEffect } from "react";
import MainAxios from "../axios/MainAxios";
import UseAuth from "../hooks/UseAuth";
import Common from "../utils/Common";

const Test = () => {
  // 로그인 체크 커스텀 훅
  const res = UseAuth();
  console.log("커스텀 훅 값 : ", res);

  const accessToken = Common.getAccessToken();
  const test = async () => {
    const res = MainAxios.testGet(accessToken);
    console.log("토큰 테스트 데이터 : ", res);
  };
  return (
    <>
      <p>test</p>
      <button onClick={test}>테스트 클릭</button>
      {res.data}
    </>
  );
};

export default Test;
