import AxiosApi from "../../axios/ProductAxios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from '../../context/CartContext';
import { 
    ProuctPrice,
    ProuctName,
    ProductContainer, 
    GridContainer, 
    GridItem } from "../../style/Product/Product-Layout";
import { 
    BtnShape,
    ClickBtn,
    TotalAmount,
    Totality,
    Quantity,
    QuantityText,
    FreeShipping,
    ItemContainer, 
    ImgContainer, 
    CalContainer,
    ProductName,
    ProductPrice 
} from "../../style/Product/Product-Detail";
import ProductItemCnt from "./ProductItemCnt";


const ProductListPage = ({ selectedArtist,products,setProducts}) => {
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState(null); // 선택된 제품 상태
    const [count, setCount] = useState(1); // 상품 수량 관리
    const { addToCart } = useCart();

    // 상품 수량 변경 핸들러
    const handleQuantityChange = (newQuantity) => {
        if (!isNaN(newQuantity) && newQuantity > 0) {
            setCount(newQuantity);
        } else {    
            setCount(1); // 기본값 설정 또는 다른 오류 처리
        }
    };
    
    const totalPrice = selectedProduct? parseInt(selectedProduct.productPrice.replace(/,/g, '')) * count : 0;
    const formattedTotalPrice = totalPrice.toLocaleString();

    // 구매 처리 함수
    const handlePurchase = () => {
        console.log({
            productName: selectedProduct.productName, 
            quantity: count, 
            totalPrice: formattedTotalPrice 
        });

        const productDetails = {
            ...selectedProduct,
            quantity: count,
            totalPrice: totalPrice
        };

        navigate('/orderform', { state: productDetails })
        };
    
    useEffect(() => {
        productList();
    }, [selectedArtist]);

    const handleAddToCart = () => {
        console.log("Adding to cart:", selectedProduct); // 
        addToCart(selectedProduct, count, totalPrice);
        navigate('/cart');
    };
    const productList = async () => {
        try {
            const response = await AxiosApi.productGet();
            let data = response.data;
            if (selectedArtist) {
                data = data.filter(product => product.artistName === selectedArtist);
            }
            setProducts(data);
        } catch (error) {
            console.error('데이터를 불러오는데 실패했습니다', error);
        }
    };
    
    useEffect(() => {
        productList();
    }, []);

    const handleProductClick = productId => {
        const product = products.find(p => p.productId === productId);
        setSelectedProduct(product);
    };
    return (
        <>
            {selectedProduct ? (
                <ItemContainer>
                    <ImgContainer>
                        <img alt="productimg" src={selectedProduct.productImage} style={{width:"38rem", height:"38rem"}}/>
                    </ImgContainer>
                    <CalContainer>
                        <ProductName>{selectedProduct.productName}</ProductName>
                        <ProductPrice>{selectedProduct.productPrice}원</ProductPrice>
                        <FreeShipping>무료배송</FreeShipping>
                        <Quantity>
                            <QuantityText>수량</QuantityText>
                            <ProductItemCnt count={count} onCountChange={handleQuantityChange} />
                        </Quantity>
                        <Totality>
                            <div>{count}개 상품 금액 </div>
                            <TotalAmount>{formattedTotalPrice} 원</TotalAmount>
                        </Totality>
                        <BtnShape>
                            <ClickBtn onClick={handleAddToCart}>장바구니 담기</ClickBtn>
                        </BtnShape>
                        <div>
                        </div>
                    </CalContainer>
                </ItemContainer>
            ) : (
                <>
                    <ProductContainer>
                        <GridContainer>
                            {products.map(product => (
                                <GridItem key={product.productId} onClick={() => handleProductClick(product.productId)}>
                                    <img alt="이미지" src={product.productImage} />
                                    <ProuctName>{product.productName}</ProuctName>
                                    <ProuctPrice>{product.productPrice}원</ProuctPrice>
                                </GridItem>
                            ))}
                        </GridContainer>
                    </ProductContainer>
                </>
            )}
        </>
    );
};

export default ProductListPage;