import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    padding: 30px;
    box-shadow: 0px 3px 14px -5px #555555;
    margin-bottom: 1rem;
    box-sizing: border-box;
    position: relative;
`;

export const NewsText = styled.div`
    font-size: 1.8rem;
    font-weight: bold;
    padding: 1rem;
`;

export const NewsImgbox = styled.div`
    aspect-ratio: 1/1.3;
    background-color: #333;
    background-size: 100%;
    background-position: center;  
    img {
    width: 100%;
    height: auto;
  }
`;
