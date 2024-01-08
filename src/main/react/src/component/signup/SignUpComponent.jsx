import styled from "styled-components";
import Logo_color from "../../images/LogoSymbol_white.png";

export const CONTAINER = styled.div`
  width: 100%;
  height: 130vh;
  overflow: hidden;
  @media (max-width: 768px) {
    background: linear-gradient(180deg, #008bff 0%, #61e6ca 100%);
    width: 100%;
    height: 240vh;
    min-height: 1400px;
  }
`;

export const SIGNUP = styled.div`
  width: 45vw;
  height: 100vh;
  background: linear-gradient(
    180deg,
    rgba(9, 41, 44, 0.8) 0%,
    rgba(0, 0, 0, 0.8) 100%
  );
  box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  min-height: 800px;
  min-width: 600px;
  @media (max-width: 768px) {
    background: none;
    box-shadow: none;
    width: 100%;
    height: 80%;
    min-width: 300px;
  }
`;

export const TOP = styled.div`
  width: 100%;
  height: 10%;
  text-align: center;
  & .top-title {
    font-size: 2rem;
    color: white;
    font-weight: 900;

    @media (max-width: 768px) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    height: 20%;
    background-image: url(${Logo_color});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

export const Main = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: row;
  min-height: 500px;

  @media (max-width: 768px) {
    margin-top: 10%;
    flex-direction: column;
  }

  & .left {
    width: 50%;
    height: 100%;
    display: flex;
    min-width: 300px;
    @media (max-width: 768px) {
      width: 100%;
    }

    & .input-session {
      margin-left: 10%;
      width: 90%;
      height: 100%;
      display: flex;
      flex-direction: column;

      & .input-session1 {
        width: 100%;
        height: 12%;

        & .input-session1-top {
          height: 30%;
        }

        & .input-session1-bottom {
          height: 70%;
        }
      }

      & .input-session2 {
        width: 100%;
        height: 20%;
        display: flex;
        flex-direction: row;

        & .session-left {
          width: 50%;
          height: 100%;
          color: white;
          display: flex;
          flex-direction: column;
          @media (max-width: 768px) {
            width: 30%;
          }

          & .session-left-top {
            width: 100%;
            height: 30%;
            font-size: 1rem;
            margin-left: 10%;
            margin-top: 10%;
          }

          & .session-left-bottom {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            font-size: 2rem;
            font-weight: 900;
            width: 100%;
            height: 70%;
          }
        }

        & .session-right {
          width: 50%;
          height: 100%;
          color: white;
          @media (max-width: 768px) {
            margin-left: 20%;
            width: 30%;
          }

          & .session-right-top {
            width: 100%;
            height: 30%;
            font-size: 1rem;
            margin-left: 10%;
            margin-top: 10%;
            @media (max-width: 768px) {
              margin-left: 0px;
            }
          }

          & .session-right-bottom {
            display: flex;
            justify-content: center;
            width: 100%;
            height: 20%;
          }
        }
      }
    }
  }

  & .right {
    width: 50%;
    height: 100%;
    min-height: 500px;
    min-width: 300px;
    @media (max-width: 768px) {
      width: 100%;
    }

    & .busyness {
      padding: 5%;
      width: 80%;
      height: 62%;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      background-color: rgba(0, 0, 0, 0.7);
      @media (max-width: 768px) {
        width: 90%;
        margin: 0 auto;
        background: none;
        padding: 0;
      }

      & .text {
        width: 100%;
        height: 50%;
        @media (max-width: 768px) {
          height: 3rem;
          margin-left: 6%;
        }

        & .text-title-option {
          height: 20%;
          color: #61e6ca;
          font-size: 2rem;
          font-weight: 900;
          @media (max-width: 768px) {
            color: white;
          }
        }

        & .text-main {
          color: white;
          font-weight: 900;
          @media (max-width: 768px) {
            display: none;
          }
        }
      }

      & .input-busyness-number {
        width: 100%;
        height: 50%;

        & .input-busyness-number-session {
          width: 70%;
          height: 75%;
          margin: 0 auto;
          color: white;
          @media (max-width: 768px) {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 4%;
            width: 140%;
            height: 100%;
          }
        }

        & .check-button-session {
          margin-top: 1%;
          width: 100%;
          display: flex;
          justify-content: center;
        }
      }
    }

    & .agreement {
      border: 1px solid #61e6ca;
      border-radius: 20px;
      margin-top: 3%;
      width: 80%;
      height: 30%;
      display: flex;
      flex-direction: column;
      @media (max-width: 768px) {
        border: none;
        margin: 0 auto;
        width: 80%;
      }

      & .agreement-top {
        color: #61e6ca;
        font-size: 2rem;
        margin-top: 5%;
        margin-left: 10%;
        font-weight: 900;
        @media (max-width: 768px) {
          color: white;
          font-size: 3rem;
        }
      }

      & .agreement-main {
        margin: 0 auto;
        width: 80%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        color: white;
        font-size: 1.5rem;
        @media (max-width: 768px) {
          width: 80%;
          font-size: 2rem;
        }

        & .agreement-main-row {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          font-weight: 600;
        }
      }
    }
  }
`;

export const BOTTOM = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InputTitle = styled.p`
  line-height: 0;
  color: white;
  font-weight: 900;
  @media (max-width: 768px) {
    color: black;
    position: absolute;
  }
`;

export const Input = styled.input`
  background-color: rgba(0, 0, 0, 0.7);
  width: ${(props) => props.width || "60%"};
  height: ${(props) => props.height || "54%"};
  border: 1px solid #61e6ca;
  border-radius: 30px;
  color: white;
  margin-top: ${(props) => props.marginTop || "0px"};
  min-height: 3rem;

  @media (max-width: 768px) {
    width: 60%;
    height: 4rem;
    background: #ffffff;
    border-radius: 0;
  }
`;

export const Input1 = styled.input`
  background-color: rgba(0, 0, 0, 0.7);
  width: ${(props) => props.width || "60%"};
  height: ${(props) => props.height || "54%"};
  border: 1px solid #61e6ca;
  border-radius: 30px;
  color: white;
  margin-top: ${(props) => props.marginTop || "0px"};
  min-height: 3rem;

  @media (max-width: 768px) {
    width: 100%;
    height: 4rem;
    background: #ffffff;
    border-radius: 0;
  }
`;

export const CheckButton = styled.button`
  width: 20%;
  height: 3rem;
  margin-left: 5%;
  background-color: #61e6ca;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  min-width: 80px;
  @media (max-width: 768px) {
    margin-left: 0;
    border-radius: 0;
    height: 4rem;
    line-height: 0;
  }
`;

export const BusynessButton = styled.button`
  background-color: #61e6ca;
  width: 30%;
  min-width: 70px;
  border: none;
  border-radius: 10px;
  font-weight: 900;
  cursor: pointer;
  margin: 0 auto;
  color: white;
  @media (max-width: 768px) {
    width: 80px;
    height: 4rem;
    border-radius: 0;
    color: #008bff;
    background: #ffffff;
    font-weight: 900;
  }
`;

export const SignUpButton = styled.button`
  width: ${(props) => props.width || "15%"};
  height: ${(props) => props.height || "40%"};
  background: linear-gradient(93.63deg, #61e6ca -11.12%, #008bff 82.25%);
  color: white;
  font-weight: 900;
  font-size: 2rem;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  @media (max-width: 768px) {
    height: 6rem;
    width: 120px;
    border-radius: 50px;
    background: none;
    background-color: #008bff;
  }
`;

export const Gender = styled.input`
  width: 20px;
  height: 20px;
  outline: none;
  background-color: black;
`;

export const Agree = styled.input`
  width: 15px;
  height: 15px;
  outline: none;
  border: none;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  @media (max-width: 768px) {
    width: 25px;
    height: 25px;
  }
  @media (max-width: 400px) {
    width: 20px;
    height: 20px;
  }
`;

export const P1 = styled.p`
  line-height: 1.1;
  @media (max-width: 768px) {
    line-height: 2;
  }
`;
