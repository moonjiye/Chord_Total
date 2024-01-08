import styled from "styled-components";
import Login_bg from "../../images/Login_Bg.png";
import Signup from "../../images/Signup.png";
import Logo_color from "../../images/LogoSymbol_color.png";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  @media (max-width: 768px) {
    height: 120vh;
  }
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
  @media (max-width: 768px) {
    background: none;
  }
`;

export const LOGO = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    width: 60%;
    height: 60%;
    min-height: 300px;
    min-width: 300px;
    background-repeat: no-repeat;
    background-image: url(${Logo_color});
    background-size: contain;
    cursor: pointer;
  }
`;

export const LoginSginup = styled.div`
  width: 800px;
  height: 500px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    min-height: 800px;
    flex-direction: column;
    align-items: center;
    margin-top: 16%;
  }
  & .login {
    width: 55%;
    height: 98%;
    margin: 5px;
    border-radius: 15px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.8) 0%,
      rgba(255, 255, 255, 0.56) 100%
    );
    /* min-width: 200px; */
    display: flex;
    flex-direction: column;
    min-width: 400px;
    @media (max-width: 768px) {
      width: 60%;
      height: 80%;
    }

    & .inline {
      width: 80%;
      height: 100%;
      margin: 0 auto;
    }
  }

  & .signup {
    width: 40%;
    height: 98%;
    margin: 5px;
    /* min-width: 200px; */
    border-radius: 15px;
    background: linear-gradient(
      180deg,
      rgba(9, 41, 44, 0.8) 0%,
      rgba(0, 0, 0, 0.8) 100%
    );
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 300px;
    @media (max-width: 768px) {
      width: 100%;
      background: none;
    }

    & .inline {
      height: 100%;
      width: 60%;
      @media (max-width: 768px) {
        height: 20%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
`;

export const LoginTitle = styled.p`
  margin: 0px;
  padding: 0px;
  font-size: 3rem;
  font-weight: 900;
  margin-top: 10%;
  margin-bottom: 10%;
  opacity: 1;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const SignUpTitle = styled.p`
  margin: 0px;
  padding: 0px;
  font-size: 3rem;
  font-weight: 900;
  margin-top: 16%;
  margin-bottom: 10%;
  opacity: 1;
  color: white;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const InputEmail = styled.input`
  padding: 12px;
  outline: none;
  background-color: white;
  border: 1px solid black;
  border-radius: 30px;
  box-sizing: border-box;
  z-index: 200;
  width: 100%;
  height: 7%;
  font-size: 1.6rem;
  color: grey;
  margin-bottom: ${(props) => (props.emailmsg ? "0" : "10%")};
  @media (max-width: 768px) {
    border-radius: 0px;
    border: 1px solid #008bff;
    height: 18%;
  }
`;

export const InputPassword = styled.input`
  padding: 12px;
  outline: none;
  background-color: white;
  border: 1px solid black;
  border-radius: 30px;
  box-sizing: border-box;
  z-index: 200;
  width: 100%;
  height: 7%;
  font-size: 1.6rem;
  color: grey;
  margin-bottom: ${(props) => (props.passwordmsg ? "0" : "10%")};
  @media (max-width: 768px) {
    border-radius: 0px;
    border: 1px solid #008bff;
    height: 18%;
  }
`;

export const Bottom = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-between;
  & .login-button {
    width: ${(props) => props.width || "40%"};
    height: 100%;
    background-color: none;
    outline: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  @media (max-width: 768px) {
    margin-top: 10%;
  }
`;

export const Button = styled.button`
  border: none;
  outline: none;
  margin: 0;
  padding: 0;
  color: white;
  border-radius: 10px;
  background-color: #006eff;
  width: 100%;
  height: 40%;
  cursor: pointer;
  @media (max-width: 768px) {
    height: 3.8rem;
  }
`;

export const P = styled.p`
  line-height: none;
  font-size: 1.3rem;
  margin: 0;
  padding: 0;
  color: ${(props) => props.color || "#005AA5"};
  cursor: ${"isCursur" ? "pointer" : "none"};
  @media (max-width: 768px) {
    display: none;
  }
`;

// 회원가입 버튼.
export const SignUpButton = styled.div`
  color: white;
  margin-top: 84%;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-around;
  @media (max-width: 768px) {
    margin-top: 20px;
    justify-content: center;
  }

  & .signup-img {
    width: 30%;
    background-image: url(${Signup});
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
    @media (max-width: 768px) {
      width: 40px;
      height: 40px;
      margin-top: 20px;
    }
  }
`;

export const P2 = styled.p`
  font-size: 2.4rem;
  font-weight: 600;
  line-height: 0;

  @media (max-width: 768px) {
    font-size: 2rem;
    color: black;
    margin-top: 40px;
  }
`;

export const TEXT = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;

export const P3 = styled.span`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    cursor: pointer;
    font-size: 2rem;
  }
`;

export const CheckInput = styled.div`
  &.false {
    color: red;
  }

  &.true {
    color: white;
  }
`;
