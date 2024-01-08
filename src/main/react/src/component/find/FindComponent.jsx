import styled from "styled-components";
import Login_bg from "../../images/Login_Bg.png";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

export const BACKGROUND = styled.div`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-image: url(${Login_bg});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Contents = styled.div`
  border-radius: 20px;
  width: 40%;
  height: ${(props) => props.height || "50%"};
  background: linear-gradient(
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0.56) 100%
  );
  backdrop-filter: blur(2.08541px);
  min-height: 300px;
  min-width: 400px;
`;

export const Content = styled.div`
  width: 100%;
  height: ${(props) => props.height || "20%"};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const INPUT = styled.input`
  width: 50%;
  height: 50%;
  border: none;
  border-radius: 40px;
  font-size: 1.8rem;
`;

export const BUTTON = styled.button`
  border: none;
  width: 15%;
  height: 50%;
  margin-left: 10%;
  outline: none;
  color: white;
  border-radius: 40px;
  background-color: #006eff;
  cursor: pointer;
  font-weight: 600;
`;
