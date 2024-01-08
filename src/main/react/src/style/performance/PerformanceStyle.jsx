import styled from "styled-components";
import backgroundImage from "../../images/Band.jpg";



export const Container = styled.div`
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; // 또는 필요한 높이
  .title {
      width: 100vw;
      height: 4rem;
      background: linear-gradient(to right, var(--maingreen), var(--mainblue));
      color: white;
      font-size: 2.5rem;
      font-weight: 600;
      text-align: center;
      margin: 0;
      @media screen and (max-width: 767px) {
        height: 6vw;
        font-size: 4vw;
      }
  }
`;

export const SearchBanner = styled.div`
    width: 100%;
    height: 34rem;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    * {
      margin-left: 4.5rem;
      @media screen and (max-width: 767px) {
       margin-left: 4vw;
      }

  }
  @media screen and (max-width: 767px) {
    height: 45vw;
    min-height: 25rem;
  }


    input {
      width: 33vw;
      height: 6rem;
      border-radius: 5rem;
      font-size: 2.4rem;
      padding-left: 2rem;
      box-sizing: border-box;
      @media screen and (max-width: 767px) {
        width: 90%;
        margin-bottom: 1rem;
        height: 8vw;
        min-height: 3rem;
        padding-left: 3vw;
        font-size: 3vw;
      }
    }

    button {
      width: 12.7rem;
      min-width: 12.7rem;
      height: 5.8rem;
      border-radius: 4rem;
      background-color: rgba(0, 0, 0, 0.3);
      border: 0.25rem solid white;
      color: white;
      font-size: 2.4rem;
      font-weight: 600;
      margin: 1rem;
      &:hover {
        cursor: pointer;
          transform: scale(1.05); // 크기를 10% 증가
          transition: transform 0.1s ease-in-out;
      }
      &:active {
        background-color: rgba(255, 255, 255, 0.5);
      }
      @media screen and (max-width: 767px) {
        width: 17vw;
        min-width: 12rem;
        height: 8vw;
        min-height: 5rem;
        font-size: max(2rem, min(4vw, 2.4rem));
        margin: 1.2vw;
        border: 0.3vw solid white;
        margin-left: 4vw;
      }
  }
`;

export const Box = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 0 3rem;
    @media screen and (max-width: 767px) {
        padding: 0;
        flex-direction: column;
        align-items: flex-start;
      }

    div {
      margin-top: 9rem;
      margin-bottom: 2rem;
      color: white;
      font-size: 5rem;
      font-weight: 600;
      @media screen and (max-width: 767px) {
        font-size: max(3rem, min(6vw, 5rem));
        margin-top: 2vw;
        margin-bottom: 0;

      }
    }
`;



export const Map = styled.div`
width: 85%;
height: 40rem;
margin: 3rem;
display: flex;
justify-content: center;
border-radius: 1rem;
overflow: hidden;
align-items: center;
@media screen and (max-width: 767px) {
  width: 80vw;
  height: 60vw;
            }
`;


   