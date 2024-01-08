import React, { useState, useEffect } from 'react';
import { useLocation} from 'react-router-dom';
import {
    Container,
    OrderContainer,
    OrdererContainer,
    OrdererInfo,
    OrderInfo,
    OrdererName,
    OrdererAddr,
    OrdererPoint,

    OrderInput,
    OrderBtn,
    PayBtn,
} from "../../style/Product/OrderFrom";
import Axios from "../../axios/ProductAxios"

const OrderFormPage = () => {
    const location = useLocation();
    const { cart, totalAmount } = location.state || {};
    const [ userPoints, setUserPoints] = useState(0); // 사용자 포인트
    const { productName, quantity } = location.state || {};

    // 총 수량 계산
    const totalQuantity = cart ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;

    // 사용자 포인트 정보를 불러오는 함수
    const fetchUserPoints = async () => {
        try {
            const response = await Axios.getUserList();
            console.log("사용자 확인 : ", response.data);
            setUserPoints(response.data[0].userPoint);
            
        } catch (error) {
            console.error("포인트 정보를 불러오는데 실패했습니다.", error);
        }
        
    };
    useEffect(() => {
        fetchUserPoints();
    }, []);
    
    
    // 결제 페이지로 이동하는 함수
    const handlePayment = async() => {
        
        try {
            const res = await Axios.doPurchase(totalAmount);
            console.log("point cal : ", totalAmount)
            console.log("결제 결과 : ", res);
            if(res.data === true) {
                alert("결제가 완료되었습니다.");
                setUserPoints(res.data.userPoints);
            } else {
                alert("결제 실패!! 잔액을 확인하세요.");
            }
        
        } catch (error) {
            console.error("결제 처리 중 에러 발생", error);
        }
    };

    return (
        <Container>
            <OrdererContainer>
                <OrdererInfo>주문자 정보</OrdererInfo>
                <OrdererName>
                    <span>이름</span><br />
                    <input placeholder='이름을 입력해주세요.' />
                </OrdererName>
                <OrdererAddr>
                    <span>배송지</span><br/>
                    <div>
                        <input placeholder='주소'/>
                        <button>우편번호 검색</button>
                    </div>
                    <input placeholder='상세주소를 입력해 주세요.'></input>
                </OrdererAddr>
                <OrdererPoint>
                    <span>사용가능 포인트 : {userPoints}</span>
                </OrdererPoint>
            </OrdererContainer>
            <br /><br /><br />
            <OrderContainer>
                <OrderInfo>주문 정보</OrderInfo>
                <hr />
                <OrderInput>
                    <div>상품명</div>
                    <div>{productName}</div>
                </OrderInput>
                <OrderInput>
                    <div>총 수량</div>
                    <div>{totalQuantity || quantity} 개</div>
                </OrderInput>
                <OrderBtn>무료배송</OrderBtn>
                <OrderInput>
                    <div>총 금액</div>
                    <div>{totalAmount && totalAmount.toLocaleString()}원</div>
                </OrderInput>
                <PayBtn onClick={handlePayment}>결제하기</PayBtn>
            </OrderContainer>
        </Container>
    );
};

export default OrderFormPage;