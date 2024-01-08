import { useNavigate, useSearchParams } from "react-router-dom";
import MemberInfoAxiosApi from "../../axios/MemberInfoAxios";
import { useEffect } from "react";

export const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // 서버로 승인 요청
  const paymentSuccess = async (email, price) => {
    try {
      const response = await MemberInfoAxiosApi.increasePoints(email, price);
      if (response.status === 200 && response.data === true) {
        console.log("API response: ", response);
        alert("충전완료되었습니다.");
        navigate("/");
      } else {
        throw new Error("충전에 실패하였습니다");
      }
    } catch (error) {
      console.error(error);
      alert("충전에 실패하였습니다.");
    }
  };
  useEffect(() => {
    const email = searchParams.get("email");
    const price = searchParams.get("amount");

    console.log("email: ", email);
    console.log("amount: ", price);

    paymentSuccess(email, price);
  }, []);
  return (
    <div>
      <h1>결제 성공</h1>
      <div>{`주문 아이디: ${searchParams.get("orderId")}`}</div>
      <div>{`결제 금액: ${Number(
        searchParams.get("amount")
      ).toLocaleString()}원`}</div>
    </div>
  );
};
