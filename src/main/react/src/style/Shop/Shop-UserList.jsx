import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    padding: 30px;
    margin-bottom: 1rem;
    box-sizing: border-box;
    position: relative;
`;

export const UserGoods = styled.div`
    font-size: 1.8rem;
    font-weight: bold;
    padding: 1rem;
`;

export const ProductItemText = styled.div`
    font-size: 1.8rem;
    font-weight: bold;
    margin: 0 22px;
`;

export const ProductImgbox = styled.div`
    aspect-ratio: 1/1.2;
    background-color: #333;
    background-size: cover;
    background-position: center;  
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  padding: 16px;
`;

export const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  img {
    width: 150%;
    height: auto;
  }
`;


