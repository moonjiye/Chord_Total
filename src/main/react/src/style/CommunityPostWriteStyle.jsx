import styled from "styled-components";
import ReactQuill from "react-quill"; // ES6

export const WriteContainer = styled.div`
  display: flex;
  width: 1000px;
  padding: 0px 21.6px 0px 36px;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
  opacity: var(--, 1);
`;

export const WriteSection = styled.div`
  height: 1494.03px;
  align-self: stretch;
  opacity: var(--, 1);
`;

export const WriteHeading = styled.div`
  display: flex;
  width: 718.41px;
  padding-right: 614.04px;
  flex-direction: column;
  align-items: flex-start;
`;
export const WriteHeadingText = styled.p`
  width: 200px;
  max-width: 718.41px;

  color: #000;

  /* ground.buv.co.kr/Inter/Bold 21.6 */
  font-family: Inter;
  font-size: 21.6px;
  font-style: normal;
  font-weight: 700;
  line-height: 28.8px; /* 133.333% */
`;

export const Line = styled.div`
  width: 100%;
  height: 2px;
  flex-shrink: 0;
  margin-bottom: 20px;
  border-top: 2px solid #66b9ff;

  opacity: var(--, 1);
`;
export const WriteBorder = styled.input`
  display: flex;
  width: ${(props) => props.width || "97.2%"};
  padding: 10px 13px;
  align-items: center;
  border-top: 1px solid #66baff;

  border-right: 1px solid #66baff;

  border-bottom: 1px solid #66baff;

  border-left: 1px solid #66baff;

  opacity: var(--, 1);

  background: #fff;
`;
export const NoneLogin = styled.div`
  display: flex;
  width: 100%;
  /* padding: 10px 13px; */
  align-items: center;

  background: #fff;
`;
export const CategorySelect = styled.select`
  // 카테고리 선택 드롭다운에 대한 스타일 정의
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  width: 200px; // 드롭다운 너비 조정
`;
export const StyledReactQuill = styled(ReactQuill)`
  .ql-container {
    margin-top: 20px;
    width: 100%;
    height: 600px;
    max-height: 500px;
    overflow-y: auto;
    border-radius: 7.2px;

    opacity: 1;
    background: #fcf2f2;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
  }
  .ql-toolbar {
    display: flex;
    flex-wrap: wrap; // 버튼들이 다음 줄로 넘어가지 않도록
    justify-content: flex-start; // 버튼들을 왼쪽에서부터 나열
    border-top: 1px solid #66baff;
    border-right: 1px solid #66baff;
    border-bottom: 1px solid #66baff;
    border-left: 1px solid #66baff;
  }
  .ql-toolbar .ql-formats {
    margin-right: 2px !important; // 버튼들 사이의 간격을 2px로
  }
`;
export const CancelButton = styled.button`
  --flip-button-height: 40px;
  margin: 20px;
  width: 100px;
  height: var(--flip-button-height);
  color: black;
  background: white;
  border-radius: 0;
  perspective: 500px;
  transition: 0.3s;
  position: relative; // 추가

  &:hover {
    color: black;
    background: white;
    .front {
      transform: rotateX(-90deg);
    }

    .back {
      transform: rotateX(0deg);
    }
  }

  .front,
  .back {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: black;
    background: var(--btn-bg);
    transition: 0.3s;
    transform-origin: center center calc(var(--flip-button-height) / -2);
  }

  .back {
    transform: rotateX(88deg);
  }
`;
export const WriteButton = styled.button`
  --flip-button-height: 40px;
  width: 100px;
  height: var(--flip-button-height);
  color: transparent;
  background: #018cff;
  border-radius: 0;
  perspective: 500px;
  transition: 0.3s;
  position: relative; // 추가

  &:hover {
    color: white;
    background: #018cff;
    .front {
      transform: rotateX(-90deg);
    }

    .back {
      transform: rotateX(0deg);
    }
  }

  .front,
  .back {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: white; // 추가
    background: var(--btn-bg); // 추가
    transition: 0.3s;
    transform-origin: center center calc(var(--flip-button-height) / -2);
  }

  .back {
    transform: rotateX(88deg);
  }
`;
