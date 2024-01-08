import styled from "styled-components";

export const ItemContainer = styled.div`
    display: flex;
    flex-flow: row;
    width: 100%;
    padding: 30px;
    margin-bottom: 1rem;
    box-sizing: border-box;
    /* border: 1px solid #333; */
    flex-direction: row;
    text-align: center;
    @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
  }
`;

export const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  >div {
    width: 25px;
    height: 25px;
    line-height: 2px;
    text-align: center;
    font-size: 24px;
    font-weight: 400px;
  }
`;

export const CalContainer = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  width: 100%;
  margin: 10px;
`;

export const ProductName = styled.div`
  font-size: 30px;
  font-weight: 700;
`;

export const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 700;
  color: #E34E4E;
`;

export const FreeShipping = styled.div`
  border-radius: 15px;
  background-color: #eee;
  font-size: 12px;
  font-weight: 700;
  padding: 5px 8px;
  margin: 0px 0px;
  
`;

export const Quantity = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;

`;

export const QuantityText = styled.div`
  font-size: 16px;
  margin: 10px 0px;
`;

export const Totality = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  
`;
export const TotalAmount = styled.div`
  padding: 0 20px;
`;
export const BtnShape = styled.div`
  display: flex;
  padding: 10px;
  width: 100%;
  height: 15%;

`;
export const ClickBtn = styled.button`
  border-radius: 5px;
  border: none;
  background-color: #333;
  color: #fff; 
  font-size: 12px;
  font-weight: 700;
  padding: 5px 10px;
  margin: 3px 3px;
  width: 100%;
`;