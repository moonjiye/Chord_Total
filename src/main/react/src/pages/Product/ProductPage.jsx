import React, { useState } from "react";
import { Container } from "../../style/Product/Product-Layout";
import ProductListPage from "../../component/Product/ProductListPage";

// 상품 리스트 페이지
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  return (
    <>
      <Container>
        <ProductListPage products={products} setProducts={setProducts}/>
      </Container>
    </>
  );
}

export default ProductPage;
