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
  height: 21.5rem;
  margin-top: 5rem;
  border-radius: 1rem;
  background: linear-gradient(to right, var(--maingreen), var(--mainblue));
  display: flex;
  align-items: center;
  overflow: hidden;
  .image {
    /* flex: 1; */
    width: 13.5rem;
    height: 13.5rem;
    border-radius: 50%;
    background-color: lightgray; // 사진이 들어갈 부분
    border: 0.8rem solid white;
    box-sizing: content-box;
    margin-left: 5rem;
  }
  .leftInfo {
    /* flex: 1; */
    width: 20%;
    height: 100%;
    margin-left: 4%;
    /* background-color: skyblue; */
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: white;
    .authtitle {
      font-size: 2rem;
      font-weight: 400;
    }
    .nick {
      font-size: 3rem;
      font-weight: 700;
    }
    .heart {
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
      .heartimg {
        width: 25%;
        margin: 0rem 10%;
        height: 100%;
        background: url(${heartImg}) no-repeat center center;
        background-size: contain;
      }
      .count {
        width: 50%;
        flex: 1;
        font-size: 2rem;
        font-weight: 600;
        line-height: 1.5;
      }
    }
    .signdate {
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 400;
    }
  }

  .rightInfo {
    /* flex: 1; */
    width: 40%;
    height: 100%;
    /* background-color: lightcoral; */
    display: flex;
    flex-direction: column;
    align-items: center;
    .top {
      width: 100%;
      height: 40%;
      /* background-color: orange; */
      display: flex;
      align-items: center;
      color: white;
      .Cnt {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        font-size: 2rem;
        cnt {
          margin-left: 1rem;
          font-size: 2.5rem;
          font-weight: 700;
        }
      }
    }
    .pointerZone {
      width: 90%;
      height: 20%;
      /* background-color: white; */
      position: relative;
      .pointer {
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
    .mid {
      width: 90%;
      height: 35%;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      flex-wrap: wrap;
      padding-bottom: 1rem;
      /* background-color: yellow; */
      .authGage {
        width: 100%;
        height: 1rem;
        border-radius: 2rem;
        border: 0.05rem solid white;

        .gageBar {
          width: ${20}%;
          height: 100%;
          background-color: white;
        }
      }

      .check {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .checker {
          width: 0.3rem;
          height: 1rem;
          border-radius: 1rem;
          background-color: white;
        }
      }
      .auth {
        width: 100%;
        height: 30%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        /* background-color: pink; */
        font-size: 1.6rem;
        font-weight: 400;

        .aut {
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
    .title {
      font-size: 2rem;
      font-weight: 400;
    }
    .point {
      font-size: 3rem;
      font-weight: 700;
    }
    .buttonZone {
      display: flex;
      justify-content: flex-end;
      gap: 2rem;
      margin-top: 2rem;
    }
    Button {
      color: white;
      background-color: rgba(0, 0, 0, 0);
      border: 0.2rem solid white;
      margin: 0;
      &:active {
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
  height: 68rem;
  display: flex;
  position: relative;
  flex-direction: column;

  h1 {
    padding-left: 3%;
    font-size: 4rem;
    width: 100%;
    height: 5rem;
    display: flex;
    position: relative;
    /* background-color: blue; */
    color: var(--mainolive);

    @media (max-width: 1280px) {
      display: flex;
      position: relative;
      justify-content: center;
      align-items: center;
      bottom: 4rem;
    }

    @media (max-width: 768px) {
      display: flex;
      position: relative;
      justify-content: center;
      align-items: center;
    }
  }

  div.buttonContainer {
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: right;
    /* background-color: skyblue; */
  }

  @media (max-width: 1280px) {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 150rem;
  }

  @media (max-width: 768px) {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    height: 150rem;
  }
`;

export const SingName = styled.div`
  width: 36rem;
  font-weight: 300;
  font-size: 2rem;
  display: flex;
  position: relative;
  flex-direction: row;
  gap: 1rem;
`;

export const CategoryText = styled.div`
  position: relative;
  display: flex;
  font-size: 1.4rem;
  font-weight: 300;
`;

export const TitleText = styled.div`
  position: relative;
  display: flex;
  font-size: 1.4rem;
  font-weight: 300;
  width: 20rem;
`;

export const Singer = styled.div`
  width: 36rem;
  font-weight: 300;
  font-size: 2rem;
  display: flex;
  position: relative;
  flex-direction: row;
  gap: 2.5rem;
`;

export const Composer = styled.div`
  width: 36rem;
  font-weight: 300;
  font-size: 2rem;
  display: flex;
  position: relative;
  flex-direction: row;
  gap: 1rem;
`;

export const Lyricist = styled.div`
  width: 36rem;
  font-weight: 300;
  font-size: 2rem;
  display: flex;
  position: relative;
  flex-direction: row;
  gap: 1rem;
`;

export const Genre = styled.div`
  width: 36rem;
  font-weight: 300;
  font-size: 2rem;
  display: flex;
  position: relative;
  flex-direction: row;
  gap: 3.6rem;
`;

export const Purpose = styled.div`
  width: 36rem;
  font-weight: 300;
  font-size: 2rem;
  display: flex;
  position: relative;
  flex-direction: row;
  gap: 5rem;
`;

export const GenreButtonBox = styled.div`
  width: 50rem;
  height: 10rem;
  display: grid;

  position: relative;
  grid-template-row: repeat(2, 1fr);
  grid-template-columns: repeat(4, 1fr);
`;

export const GenreButton = styled.button`
  width: 6rem;
  height: 4rem;
  border-radius: 4rem;
  font-size: 0.8rem;
  font-weight: 700;
  border: 0.3rem solid var(--mainblue);
  background-color: ${({ active }) => (active ? "var(--mainblue)" : "white")};
  color: ${({ active }) => (active ? "white" : "var(--mainblue)")};

  &:hover {
    cursor: pointer;
    transform: scale(1.1); // 크기를 10% 증가
    transition: transform 0.1s ease-in-out;
  }
  // &:active {
  //   background-color: var(--mainblue);
  //   color: white;
  // }
`;

export const PurposeButtonBox = styled.div`
  width: 50rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  gap: 5rem;
  align-items: center;

  position: relative;
`;

export const PurposeButton = styled.button`
  width: 6rem;
  height: 4rem;
  border-radius: 4rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--maindarkgreen);
  border: 0.3rem solid var(--mainblue);
  background-color: ${({ active }) => (active ? "var(--mainblue)" : "white")};
  color: ${({ active }) => (active ? "white" : "var(--mainblue)")};
  &:hover {
    cursor: pointer;
    transform: scale(1.1); // 크기를 10% 증가
    transition: transform 0.1s ease-in-out;
  }
  // &:active {
  //   background-color: var(--maindarkgreen);
  //   color: white;
  // }
`;

export const Musicimg = styled.div`
  width: 40rem;
  font-weight: 300;
  font-size: 1.4rem;
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 0.1rem;

  align-items: center;

  @media (max-width: 1280px) {
    margin-bottom: 3rem;
  }
`;

export const Musicimg01 = styled.div`
  width: 40rem;
  font-weight: 300;
  font-size: 1.4rem;
  display: flex;
  position: relative;
  flex-direction: row;

  @media (max-width: 768px) {
    width: 30rem;
  }
`;

export const Musicfile = styled.div`
  width: 40rem;
  font-weight: 300;
  font-size: 1.4rem;
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 0.1rem;
  padding-top: 1rem;
  align-items: center;

  @media (max-width: 1280px) {
    margin-bottom: 3rem;
  }
`;

export const Musicfile01 = styled.div`
  width: 40rem;
  font-weight: 300;
  font-size: 1.4rem;
  display: flex;
  position: relative;
  flex-direction: row;

  @media (max-width: 768px) {
    width: 30rem;
  }
`;

export const SingInfo = styled.div`
  width: 44rem;
  font-weight: 300;
  font-size: 1.4rem;
  display: flex;
  position: relative;
  flex-direction: row;
  gap: 3.5rem;
  padding-top: 1rem;
`;

export const Lyrics = styled.div`
  width: 38rem;

  font-weight: 300;
  font-size: 1.4rem;
  display: flex;
  position: relative;
  flex-direction: row;
  gap: 4.8rem;
`;

export const TitleUploadButton = styled.button`
  width: 10rem;
  height: 4rem;
  border-radius: 4rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  border: 0.3rem solid var(--mainblue);
  background-color: var(--mainblue);
  //   margin-right: 5rem;
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

export const InputContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: center;
  gap: 8rem;

  @media (max-width: 1280px) {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8rem;
  }

  @media (max-width: 768px) {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    gap: 8rem;
  }
`;

export const InputContainer01 = styled.div`
  padding-left: 3%;
  width: 40rem;

  gap: 1rem;
  height: 40rem;
  display: flex;
  position: relative;
  flex-direction: column;
  /* background-color: skyblue; */

  // @media (max-width: 1280px) {
  //   width: 100%;
  // }

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const InputContainer02 = styled.div`
  padding-left: 3%;
  width: 40rem;

  height: 40rem;
  display: flex;

  flex-direction: column;
  /* background-color: skyblue; */

  @media (max-width: 1280px) {
    margin-bottom: 5rem;
  }
`;

export const Terms = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 20rem;
  height: 20rem;

  @media (max-width: 1280px) {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
  }

  @media (max-width: 768px) {
    display: flex;
    position: relative;
    flex-direction: column;
  }
`;

export const TermsTitle = styled.div`
  display: flex;
  position: relative;
  font-size: 2.8rem;
  font-weight: 500;
  padding-bottom: 1rem;
  border-bottom: 0.1rem solid var(--mainblue);
  margin-bottom: 1.8rem;
`;

export const Term01 = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;

  padding-bottom: 1rem;
`;

export const Term02 = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
`;

export const InputBox = styled.input`
  margin-bottom: 1rem;
  width: 30.1rem;
  height: 3.5rem;
  border: 0.03rem solid var(--mainolive);

  &::placeholder {
    color: var(--mainolive);
    padding-left: 1rem;
  }

  @media (max-width: 768px) {
    width: 28rem;
  }
`;

export const TextArea = styled.textarea`
  width: 30.3rem;
  display: flex;
  position: relative;
  flex-direction: column;
  height: 28rem;
  border: 0.03rem solid var(--mainolive);

  &::placeholder {
    color: var(--mainolive);
    padding-left: 1rem;
  }

  @media (max-width: 768px) {
    width: 28rem;
  }
`;

export const Button = styled.button`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 10rem;
  height: 4.5rem;
  border-radius: 4rem;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--maindarkgreen);
  border: 0.3rem solid var(--mainsky);
  background-color: white;
  margin-right: 5rem;

  &:hover {
    cursor: pointer;
    transform: scale(1.1); // 크기를 10% 증가
    transition: transform 0.1s ease-in-out;
  }
  &:active {
    background-color: var(--mainsky);
    color: white;
  }

  @media (max-width: 1280px) {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-items: center;
  }

  @media (max-width: 768px) {
    display: flex;
    position: relative;
    flex-direction: column;
    // justify-content: center;
    // align-items: center;
  }
`;
