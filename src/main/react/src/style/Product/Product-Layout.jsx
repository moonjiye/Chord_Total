import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 30px;
  margin-bottom: 1rem;
  box-sizing: border-box;
  /* border: 1px solid #333; */
  flex-direction: row;
  text-align: center;
`;

export const ProductContainer = styled.div`
    display: flex;
    width: 100%;
    padding: 10px;
    margin-bottom: 1rem;
    box-sizing: border-box;
    flex-direction: column;
`;

export const ItemText = styled.div`
    text-align: left;
    font-size: 24px;
    font-weight: bold;
    margin: 0 15px;
`;

export const ProuctName = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin: 8px;
`;
export const ProuctPrice = styled.div`
  font-size: 16px;
  font-weight: 400;
`;

export const ProductImgbox = styled.div`
    aspect-ratio: 1/1.2;
    /* background-color: #333; */
    background-size: cover;
    background-position: center;  
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 16px;
`;

export const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-weight: 700;
  
  img {
    width: 100%;
    height: auto;
    padding: 10px;
  }
`;


