import styled from "styled-components";

export const CartLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* padding: 20px; */
  width: 100vw;
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
  }

`;
export const CartContainer = styled.div`
  display: flex;
  width: 95%;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #F8F8F8;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
`;

export const ItemContainer = styled.div`
  background-color: #fff;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  gap: 16px;
`;

export const SummaryContainer = styled.div`
  width: 95%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
  >div{
    width: 90%;
  }
`;

export const Button = styled.button`
  background-color: #97b0aa;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #354b45;
  }
`;

export const ItemDel = styled.button`
  background-color: #97b0aa;
  color: white;
  padding: 10px 10px;
  margin: 10px;
  /* width: 15px; */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #354b45;
  }
`;

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  padding: 0 16px;
  margin-bottom: 8px;
  background: #FFF;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const ItemHeader = styled.h3`
  display: flex;
  margin: 10px;
  padding: 10px;
  background: #f8f8f8;
  border-bottom: 1px solid #eee;
  font-size: 30px;
  
`;

export const ItemName = styled.p`
  font-size: 16px;
  color: #333;
  margin: 0;
`;

export const ItemQuantity = styled.div`
  display: flex;
  align-items: center;
`;

export const QuantityButton = styled.button`
  background-color: #F0F0F0;
  border: 1px solid #DDD;
  padding: 4px 8px;
  margin: 0 4px;
  cursor: pointer;
`;

export const ItemPrice = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

export const TotalContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  text-align: right;
  padding: 10px;
`;

export const CheckoutButton = styled.button`
  width: 100%;
  padding: 12px 20px;
  background-color: #354b45;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 16px;
  font-size: 18px;
  font-weight: 700;

  &:hover {
    background-color: #97b0aa;
  }
`;

export const OrderAmount = styled.div`
  margin: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  font-size: 30px;
  font-weight: 700;
`;
export const TotalOrder = styled.div`
  margin: 10px 0px;
  padding: 10 0px;
  font-size: 16px;
`;
