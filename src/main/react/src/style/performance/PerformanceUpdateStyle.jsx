import styled from "styled-components";
import heartImg from "../../images/Heart.png";
import Pointer from "../../images/Pointer.png";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  box-sizing: border-box;
`;
// UpdateUserInfo.jsx 스타일 부분
export const UserInfo = styled.div`
  width: 80%;
  height: auto;
  min-height: 22.5rem;
  margin-top: 5rem;
  border-radius: 1rem;
  background: linear-gradient(to right, var(--maingreen), var(--mainblue));
  display: flex;
  align-items: center;
  overflow: hidden;
  @media screen and (max-width: 767px) {
    height: auto;
    flex-wrap: wrap;
    margin-top: 0rem;
    justify-content: space-around;
    padding: 2rem;
  }
  .image{
    /* flex: 1; */
    flex-shrink: 0;
    width: 13.5rem;
    height: 13.5rem;
    border-radius: 50%;
    background-color: lightgray; // 사진이 들어갈 부분
    border: 0.8rem solid white;
    box-sizing: content-box;
    margin-left: 2vw;
    @media screen and (max-width: 1100px) {
      width: 10rem;
      height: 10rem;
      margin: auto 2rem;
    }
  }
  .leftInfo {
    /* flex: 1; */
    width: 25%;
    height: 100%;
    margin-left: 4%;
    /* background-color: skyblue; */
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: white;
    @media screen and (max-width: 1100px) {
      width: auto;
      height: auto;
    }

    .authtitle {
      font-size: 1.8rem;
      font-weight: 400;
      @media screen and (max-width: 1100px) {
        font-size: 1.5rem;
      }
    }
    .nick{
      font-size: 2.5rem;
      font-weight: 700;
      @media screen and (max-width: 1100px) {
        font-size: 2rem;
      }
    }
    .heart{
      margin-top: 0.5rem;
      width: 14rem;
      height: 5rem;
      background-color: white;
      border-radius: 10rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: black;
      overflow: hidden;
      @media screen and (max-width: 1100px) {
        width: 8rem;
        height: 3rem;
      }
      .heartimg {
        width: 25%;
        margin: 0rem 10%;
        height: 100%;
        background: url(${heartImg}) no-repeat center center;
        background-size: contain;
        @media screen and (max-width: 1100px) {
            height: 70%;
        }

      }
      .count {
        width: 50%;
        flex: 1;
        font-size: 2rem;
        font-weight: 600;
        line-height: 1.5;
        @media screen and (max-width: 1100px) {
          font-size: 1.5rem;
        }
      }
    }
    /* .signdate{
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 400;
    } */
  }

  .rightInfo {
    /* flex: 1; */
    width: 40%;
    height: 100%;
    /* background-color: lightcoral; */
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: 1100px) {
      width: 40%;
      min-width: 20rem;
      height: 18rem;
    }
    .top{
      width: 100%;
      height: 40%;
      /* background-color: orange; */
      display: flex;
      align-items: center;
      color: white;

      .Cnt {
        width:50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        font-size: 2rem;
        @media screen and (max-width: 1100px) {
        font-size: 1.5rem;
        }

        cnt {
          margin-left: 1rem;
          font-size: 2.5rem;
          font-weight: 700;
          @media screen and (max-width: 1100px) {
            font-size: 2rem;
          }
        }
      }
    }
    .pointerZone{
      width: 90%;
      height: 20%;
      /* background-color: white; */
      position: relative;
      .pointer{
        position: absolute;
        left: 20%;
        bottom: 0;
        width: 1.5rem;
        height: 3rem;
        transform: translate(-50%, 0%);
        background: url(${Pointer}) no-repeat center center;
        background-size: contain;
      }
    }
    .mid{
      width: 90%;
      height: 35%;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      flex-wrap: wrap;
      padding-bottom: 1rem;
      /* background-color: yellow; */
      .authGage{
        width: 100%;
        height: 1rem;
        border-radius: 2rem;
        border: 0.05rem solid white;

      .gageBar{
        width: ${20}%;
        height: 100%;
        background-color: white;
      }}

      .check{
        width: 100%;
        display: flex;
        justify-content: space-between;
        .checker{
          width: 0.3rem;
          height: 1rem;
          border-radius: 1rem;
          background-color: white;
        }
      }
      .auth{
        width: 100%;
        height: 30%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        /* background-color: pink; */
        font-size: 1.6rem;
        font-weight: 400;
        @media screen and (max-width: 1100px) {
          font-size: 1.1rem;
        }
        .aut{
        }

    }
  }
}
.pointZone {
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-end;
    padding-right: 4%;
    height: 100%;
    /* background-color: lightgray; */
    color: white;
    @media screen and (max-width: 767px) {
      width: 100%;
      align-items: center;
      height: auto;
    }
    .title{
      font-size: 2rem;
      font-weight: 400;
      @media screen and (max-width: 1100px) {
         font-size: 1.5rem;
        }
    }
    .point{
      font-size: 3rem;
      font-weight: 700;
      @media screen and (max-width: 1100px) {
       font-size: 2rem;
      }
    }
    .buttonZone{
      display: flex;
      justify-content: flex-end;
      gap: 2rem;
      margin-top: 2rem;
      @media screen and (max-width: 1100px) {
         flex-wrap: wrap;
         gap: 1vw;
         margin-top: 1rem;
      }
    }
    Button {
      width: 12rem;
      color: white;
      background-color: rgba(0, 0, 0, 0);
      border: 0.2rem solid white;
      margin: 0;
      @media screen and (max-width: 1100px) {
        width: 10rem;
        height: 3rem;
        font-size: 1.5rem;
  }
      &:active{
        background-color: var(--mainsky);
    }

  }
}
`;

// UpdateBox.jsx 스타일 부분
export const UpdateZone = styled.div`
  margin: 3rem 0rem;
  border-radius: 1rem;
  width: 80%;
  box-shadow: 0 1rem 3rem -0.5rem rgba(0, 0, 0, 0.25);
  height: auto;
  display: flex;
  padding: 3rem;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  @media screen and (max-width: 1200px) {
  }

  .inputContainer {
    width: 95%;
    height: 20rem;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    @media screen and (max-width: 1200px) {
      flex-direction: row;
      height: auto;
  }

    div{
      margin-left: 3%;
      width: 30%;
      font-weight: 200;
      font-size: 1.6rem;
      display: flex;
      justify-content: space-between;
      @media screen and (max-width: 1200px) {
      width: 30rem;
      font-size: max( 1.2rem, min( 1.3vw ,1.6rem ));

  }
    }
    div.discription {
      Input {
        height: 17rem;
      }
    }

  }

  h1{
    padding-left: 3%;
    font-size: 4rem;
    width: 100%;
    height: 5rem;
    /* background-color: blue; */
    color: var(--mainolive);
    @media screen and (max-width: 1200px){
      font-size: 3rem;
    }
  }

  div.buttonContainer {
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: right;
    /* background-color: skyblue; */

  }
  .performer {
    width: 90%;
    height: 5rem;
    padding: 1rem 0 2rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
      width: 85%;
      height: 100%;
      min-height: 3rem;
      font-size: 1.4rem;
      padding: 0.8rem;
      margin: 1rem 0rem;
    }
    .title{
      font-size: 2rem;
      font-weight: 700;
      color: var(--mainolive);
    }

  .uploading{
    margin-left: 15rem !important;
    width: auto !important;
    height: auto;
    align-items: center;
  }
   .outinput {
    /* margin-left: 10rem; */
  }
}
`;

export const InputBox = styled.input`
  padding: 0 1rem;
  margin-bottom: 1rem;
  width: 75%;
  height: 3.5rem;
  border: 0.03rem solid var(--mainolive);
  resize: none; // 사용자가 크기를 변경하지 못하게 함
  @media screen and (max-width: 1200px) {
      width: 70%;
      height: max( 2.5rem, min( 2.9vw ,3.5rem ));

  }


  &::placeholder {
    color: var(--mainolive);
    @media screen and (max-width: 1200px) {
      width: 30rem;
      font-size: max( 1.2rem, min( 1.3vw ,1.6rem ));
  }
  }
`;

export const ImageInput = styled.input.attrs({ type: 'file', id: 'file'})`
  padding: 0 1rem;
  margin-bottom: 1rem;
  width: 75%;
  height: 2.5rem;
  border: 0.03rem solid var(--mainolive);
  resize: none; // 사용자가 크기를 변경하지 못하게 함
  display: flex;
  justify-content: center;
  align-items: center;
  align

  &::placeholder {
    color: var(--mainolive);
  }
  button {
    background-color: red;
  }

`;

export const FileButton = styled.button`
width: 5rem;
height: 3.5rem;
background-color: royalblue;
color: white;
`;

export const DescriptionInput = styled.textarea`
padding: 1rem;
  margin-bottom: 1rem;
  width: 75%;
  height: 17rem;
  border: 0.03rem solid var(--mainolive);
  resize: none;
  overflow: auto;
  font-family: 'Noto Sans KR', sans-serif;

  &::placeholder {
    color: var(--mainolive);
  }
`;

export const Button = styled.button`
  width: 10rem;
  height: 4.5rem;
  border-radius: 4rem;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--maindarkgreen);
  border: 0.3rem solid var(--maindarkgreen);
  background-color: white;
  margin-right: 5%;
  &:hover {
    cursor: pointer;
    transform: scale(1.1); // 크기를 10% 증가
    transition: transform 0.1s ease-in-out;
  }
  &:active {
    background-color: var(--maindarkgreen);
    color: white;
  }
`;
