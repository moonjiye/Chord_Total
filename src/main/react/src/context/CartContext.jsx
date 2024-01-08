import React, { createContext, useState, useContext } from 'react';


// context는 전역적으로 상태를 관리하기 위해서 사용
const CartContext = createContext();
// CartContext에 접근할 수 있는 함수를 제공
export const useCart = () => useContext(CartContext);
// CartProvider 컴포넌트를 정의, 자식 컴포넌트들에게 cart 관련 데이터와 함수를 제공.
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    // 장바구니에 상품을 추가하는 함수
    const addToCart = (selectedProduct, count, price) => {
        // 함수 호출 확인
        console.log("addToCart 함수 호출!!");
        // 새로운 장바구니 아이템 객체를 생성
        const newCartItem = {
            productName: selectedProduct.productName, // 상품이름
            quantity: count, // 수량
            price: price, // 단가
            totalPrice: price * count, // 총 가격
            productId: selectedProduct.productId // 상품 구분을 위한 상품 ID
        };

        // 장바구니에 같은 상품이 있는지 확인
        const existingCartItemIndex = cart.findIndex(item => item.productId === selectedProduct.productId);
        
        let updatedCart;
        if (existingCartItemIndex >= 0) {
            // 기존 상품이 있으면 업데이트
            updatedCart = cart.map((item, index) => 
                index === existingCartItemIndex 
                    ? { ...item, quantity: item.quantity + count, totalPrice: item.totalPrice + (price * count) }
                    : item
            );
        } else {
            // 기존 상품이 없으면 새 상품을 추가
            updatedCart = [...cart, newCartItem];
        }
        // 장바구니 상태를 업데이트
        setCart(updatedCart);
        console.log('장바구니에 추가됨:', newCartItem);
    };
    
    // 장바구니 내 특정 상품의 수량을 업데이트하는 함수
    const updateQuantity = (productId, newQuantity) => {
        setCart(cart.map(item => {
            if (item.productId === productId) {
                const updatedTotalPrice = item.price * newQuantity; // 새로운 총 가격 계산
                return {
                    ...item,
                    quantity: newQuantity,
                    totalPrice: updatedTotalPrice
                };
            }
            return item;
        }));
    };

    // 장바구니에 특정 상품을 제거하는 함수
    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.productId !== productId));
    };

    // CartContext.Provider를 통해 자식 컴포넌트들에게 cart 상태와 함수들을 제공
    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart }}>
            {children} {/* 자식 컴포넌트들을 렌더링 */}
        </CartContext.Provider>
    );
};
