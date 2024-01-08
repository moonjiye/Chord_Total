import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import ProductItemCnt from "../../component/Product/ProductItemCnt";
import {
  CartLayout,
  CartContainer,
  ItemHeader,
  Item,
  ItemName,
  ItemQuantity,
  ItemPrice,
  SummaryContainer,
  CheckoutButton,
  TotalContainer,
  ItemDel,
  OrderAmount,
  TotalOrder,
} from "../../style/Product/Cart";


const CartPage = (quantity, totalprice) => {
    const navigate = useNavigate();
    const { cart, updateQuantity, removeFromCart } = useCart(); // 전역 장바구니 상태 사용

    // 총 수량과 총 가격 계산
    // const total = cart.reduce((acc, item) => {
    //     return {
    //         totalQuantity: acc.totalQuantity + item.quantity,
    //         totalPrice: acc.totalPrice + item.totalPrice
    //     };
    // }, { totalQuantity: 0, totalPrice: 0 });

    // 수량 변경 처리 함수
    const handleQuantityChange = (productId, newQuantity) => {
        console.log(`Changing quantity for product ${productId} to ${newQuantity}`);
        if (newQuantity >= 0) {
            updateQuantity(productId, newQuantity);
        }
    };


    // 아이템 제거 처리 함수
    const handleRemove = (productId) => {
        console.log(`Removing product ${productId}`);
        removeFromCart(productId);
    };

    const handleCheckout = () => {
        const totalAmount = calculateTotal();
      
        // 총액이 0원 이상일 때만 결제가 진행되도록 조건을 추가합니다.
        if (totalAmount > 0) {
        //   alert(`총 ${totalAmount.toLocaleString()}원 결제가 완료되었습니다.`);
            navigate('/orderform', { 
                state: { cart, totalAmount } 
            });
        } else {
          // 총액이 0원일 경우에는 결제 실패 메시지를 표시합니다.
          alert("결제할 상품이 장바구니에 없습니다.");
          navigate(-1);
        }
      };
    
    // 총액 계산 함수
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };


    return (
        <CartLayout>
            <CartContainer>
                <ItemHeader>장바구니</ItemHeader>
                {cart.map((item) => (
                    <Item key={item.productId}>
                        <ItemName>{item.productName}</ItemName>
                        <ItemQuantity>
                            <ProductItemCnt
                                count={item.quantity}
                                onCountChange={(newQuantity) => handleQuantityChange(item.productId, newQuantity)}
                            />
                        </ItemQuantity>
                        <ItemPrice>{(item.price * item.quantity).toLocaleString()}원</ItemPrice>
                        <ItemDel onClick={() => handleRemove(item.productId)}>X</ItemDel>
                    </Item>
                ))}
            </CartContainer>
            <SummaryContainer>
                <div>
                <OrderAmount>주문 예상 금액</OrderAmount>
                <TotalContainer>
                    <TotalOrder>총 상품 금액</TotalOrder>
                    <TotalOrder>{calculateTotal().toLocaleString()}원</TotalOrder>
                </TotalContainer>
                <CheckoutButton onClick={handleCheckout}>주문하러가기</CheckoutButton>
                </div>
            </SummaryContainer>
        </CartLayout>
    );
};

export default CartPage;