import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PerformanceAxios from "../../axios/PerformanceAxios";
import NoneBtnModalComponent from "../../utils/NoneBtnModalComponent";

export const Container = styled.div`
  width: 40rem;
  height: auto;
  display: flex;
  flex-direction: column;
  .title {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
  }
  .price {
    font-size: 1.8rem;
    font-weight: 400;
    margin-bottom: 1rem;
  }
  .count {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
    width: 12rem;
    height: 4rem;
    font-size: 2rem;
    font-weight: 500;
    button {
      width: 4rem;
      border: none;
      border-radius: 1rem;
      font-size: 2.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 0.5rem 2rem 0rem rgba(0, 0, 0, 0.35);
      &:hover {
        cursor: pointer;
        transform: scale(1.1);
        transition: transform 0.05s ease-in-out;
      }
      &:active {
        background-color: var(--mainblue);
        color: white;
      }
    }
  }
  .totalprice{
    margin-top: 2rem;
    width: auto;
    height: 3rem;
    font-size: 3rem;
    font-weight: 700;
    display: flex;
    div.button {
      margin-left: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 6rem;
      height: 4rem;
      font-size: 2rem;
      font-weight: 400;
      background-color: var(--mainblue);
      color: white;
      border-radius: 1rem;
      &:hover {
        cursor: pointer;
        transform: scale(1.1);
        transition: transform 0.05s ease-in-out; 
      }
      &:active {
        box-shadow: inset 0 0.5rem 2rem 0rem rgba(0, 0, 0, 0.35);
      }
  }
}
`;



const Ticket = ({ title, seatCount, price, performanceId, email, closePaymentModal }) => {
  const [ getseatCount, setSeatCount ] = useState(0);
  const [ count, setCount ] = useState(0);
  const [ getEmail, setEmail] = useState();
  const [ showTicketModal, setShowTicketModal ] = useState(false); // 구매완료 모달 창
  const increaseInterval = useRef(null);
  const decreaseInterval = useRef(null);
  
  const closeModal = () => {
    closePaymentModal(false);
  };

  const handleCount = (e) => {
    setCount(prevCount => Math.min(prevCount + 1, seatCount - getseatCount));
  };
  const handleDecount = () => {
    setCount(prevCount => Math.max(prevCount - 1, 0));
  };

  const handleIncreaseMouseDown = () => { // 마우스 누르고 있을 때
    increaseInterval.current = setInterval(() => {
      setCount(prevCount => Math.min(prevCount + 1, seatCount - getseatCount));
    }, 150); // 150ms마다 카운터 증가
  };

  const handleIncreaseMouseUp = () => { // 마우스 뗐을 때
    clearInterval(increaseInterval.current);
  };

  const handleDecreaseMouseDown = () => { //// 마우스 누르고 있을 때
    decreaseInterval.current = setInterval(() => {
      setCount(prevCount => Math.max(prevCount - 1, 0));
    }, 150); // 150ms마다 카운터 감소
  };

  const handleDecreaseMouseUp = () => { // 마우스 뗐을 때
    clearInterval(decreaseInterval.current);
  };

  useEffect(() => {
    const getSeatCount = async () => {
      try {
        const response = await PerformanceAxios.getTicketList(performanceId);
        console.log("getSeatCount : ", response.data);
        setSeatCount(response.data.length);
      } catch (error) {
        console.log(error);
      }
  };
  getSeatCount();
  }, [performanceId]);

  useEffect(() => {
    const getUserInfo = async () => {
      try{
        const res = await PerformanceAxios.getUser(email);
        console.log("getUserInfo : ", res.data);
        setEmail(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
  }, [email]);

  console.log(performanceId, email, count*price)
  const handlePurchase = async () => {
    try {
      await PerformanceAxios.purchaseTicket(performanceId, email, count, price, count*price);
      setShowTicketModal(true); // 구매 완료 모달 창 띄우기
    } catch (error) {
      console.log(error);
      alert("구매에 실패했습니다.");
    }
    }
  

  return (
    <>
      <Container>
        <div className="title">{title}</div>
        <div className="seat">잔여좌석 수: {getseatCount}/{seatCount}  </div>
        <div className="price">티켓가: {price} P</div>
        <div className="wallet">보유포인트 : {getEmail && getEmail.userPoint} P</div>
        <div className="count">
          <button onMouseDown={handleDecreaseMouseDown} 
            onMouseUp={handleDecreaseMouseUp} 
            onMouseLeave={handleDecreaseMouseUp} 
            onClick={handleDecount}>▼</button>
          {count}
          <button onMouseDown={handleIncreaseMouseDown} 
            onMouseUp={handleIncreaseMouseUp}
            onMouseLeave={handleIncreaseMouseUp}
            onClick={handleCount}>▲</button>
          </div>
        <div className="totalprice"> {count * price} P 
        <div className="button" onClick={handlePurchase}>구매</div>
        </div>
      </Container>
      <NoneBtnModalComponent
        isOpen={showTicketModal}
        setIsOpen={setShowTicketModal}
        content="구매가 완료되었습니다."
        close={{ func: closeModal, text: "확인" } }/>
    </>
  )
};

export default Ticket;