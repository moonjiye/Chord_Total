import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 98%;
    padding: 30px;
    margin: 10px;
    margin-bottom: 1rem;
    box-sizing: border-box;
    @media (max-width: 800px) {
        display: flex;
        flex-direction: column;
    }
`;

export const OrdererContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const OrdererInfo = styled.div`
    margin: 10px;
    font-size: 30px;
    font-weight: 700;
`;
export const OrdererName = styled.div`
    margin: 10px;
    >span {
        font-size: 16px;
        font-weight: 700;
    }
    >input {
        margin: 10px 0;
        width: 97%;
        height: 30px;
    }
`;
export const OrdererAddr = styled.div`
    margin: 10px;
    >span {
        font-size: 16px;
        font-weight: 700;
    }
    >input {
        margin: 3px 0;
        width: 97%;
        height: 30px;
    }
    >div>input {
        width: 70%;
        height: 30px;
    }
    >div>button {
        margin: 10px;
        height: 35px;
        background-color: #333;
        color: #fff;
    }
` ;
export const OrdererPoint = styled.div`
    margin: 10px;
    >span {
        font-size: 16px;
        font-weight: 700;
    }
    >div>input {
        margin: 10px 0;
        width: auto;
        height: 30px;
    }
    >div>button {
        margin: 8px;
        height: 35px;
        background-color: #333;
        color: #fff;
    }
`;
export const OrdererInput = styled.input`
    text-align: left;
    font-size: 16px;
    margin: 0 15px;
`;

export const OrderContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const OrderInfo = styled.div`
    /* border: 1px solid #333; */
    margin: 10px;
    font-size: 30px;
    font-weight: 700;

`;

export const OrderInput = styled.div`
    /* border: 1px solid #333; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 16px;
    font-weight: 700;
    padding: 10px;
    >div:nth-child(2){
        font-weight: 400;
    }
`;

export const OrderBtn = styled.button`
    border-radius: 50px;
    border: none;
    font-size: 12px;
    font-weight: 700;
    padding: 5px 10px;
    margin: 3px 3px;
    width: 70px;
`;

export const PayBtn = styled.button`
    border-radius: 50px;
    border: none;
    background-color: var(--mainblue);
    color: #fff; 
    font-size: 16px;
    font-weight: 700;
    padding: 10px 10px;
    margin: 10px 10px;
`;