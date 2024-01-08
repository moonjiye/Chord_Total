import styled from "styled-components";

export const ItemCnt = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    padding: 0 20px;
    >div {
        width: 2rem;
        height: 2rem;
        line-height: 2rem;
        font-size: 1.6rem;
        font-weight: 400;
    }
`;
export const CntBtn = styled.button`
    padding: 0;
    border: none;
    outline: none;
    background: #f8f8f8;
    width: 25px;
    height: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Cnt = styled.div`
    width: 30px;
    height: 30px;
    margin: 0 10px;
    text-align: center;
    line-height: 30px;
`;


