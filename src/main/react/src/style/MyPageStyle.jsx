import styled from "styled-components";

export const MyPageContainer = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  opacity: 1;

  background: #fff;
  @media (max-width: 1024px) {
    position: relative;
  }
`;
export const MainHead = styled.div`
  display: flex;
  position: relative;
  height: 24em;
  flex-shrink: 0;
  background: linear-gradient(98deg, #008bff 3.66%, #61e6ca 97.99%);
  overflow: hidden;
  @media (max-width: 1024px) {
    background: white;
    width: 100%;
    height: 100%;
    /* justify-content: center; */
    align-items: center;
    flex-direction: column;
  }
`;
export const MainProfile = styled.div`
  position: relative;
  width: 27em;
  height: 27em;
  flex-shrink: 0;
  border-radius: 20em;
  border: 20px solid #fff;
  opacity: 1;
  background: url(${(props) => props.profile}) no-repeat center / cover,
    lightgray;
  margin-top: 1.5em;
  margin-left: 5em;
  img {
    display: none;
  }
  @media (max-width: 1024px) {
    margin: 0;
    width: 20em;
    height: 20em;
    border: 8px solid transparent;
    border-radius: 148px;
    background-image: linear-gradient(#444444, #444444),
      linear-gradient(to right, #fbfcb9be, #ffcdf3aa, #65d3ffaa);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    img {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 148px;
    }
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const MainHeadBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 200px;
  flex: 1;
  flex-direction: row;
  margin: auto;
  @media (max-width: 1024px) {
    margin: 0;
    flex-direction: column;
    position: none;
  }
`;
export const MainHeadText = styled.div`
  display: flex;
  width: 10em;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-shrink: 0;
  opacity: 1;
  color: #fff;
  font-family: Noto Sans KR;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  @media (max-width: 1024px) {
    color: black;
    font-weight: 0;
  }
`;
export const MainHeadDateText = styled.div`
  display: flex;
  width: 500px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-shrink: 0;
  opacity: 1;
  color: #fff;
  font-family: Noto Sans KR;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
export const ArtistContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 500px;
  @media (max-width: 1024px) {
    width: 100%;
    flex-direction: row;
  }
`;
export const Artist = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 4em;
  flex-shrink: 0;
  color: #fff;

  font-family: Noto Sans KR;
  font-size: 10em;
  font-style: normal;
  font-weight: 100;
  line-height: 1;
  @media (max-width: 1024px) {
    display: none;
  }
`;

export const InterBox = styled.div`
  display: flex;
  position: relative;
  width: 100px;
  height: 3.3em;
  flex-shrink: 0;
  border-radius: 10em;
  opacity: 1;
  margin: 1.5em;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex: 1;

  background: #fff;
  @media (max-width: 1024px) {
    width: 100%;
    margin: 0;
  }
`;
export const InterBoxText = styled.div`
  display: flex;
  width: 3em;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex: 1;
  flex-shrink: 0;
  color: #000;
  padding: 10px;

  font-family: Noto Sans KR;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  @media (max-width: 1024px) {
    width: 100%;
    flex-direction: row;
  }
`;
export const PointBox = styled.div`
  position: absolute;
  display: flex;
  right: 1em;
  width: 7em;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  color: #fff;
  font-family: Noto Sans KR;
  font-size: 4em;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  opacity: 1;
  @media (max-width: 1024px) {
    position: relative;
    padding: 10px;
    color: rgb(0, 0, 0);
    width: 85%;
    flex-direction: row;
    border-radius: 50px;
    opacity: 1;
    background: linear-gradient(91deg, #008bff 1.65%, #61e6ca 110.08%);
    display: flex;

    justify-content: center;
    flex-shrink: 0;

    color: #fff;

    font-family: Noto Sans KR;
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
export const MoveButtonBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 10px;
  @media (max-width: 1024px) {
    justify-content: center;
    align-items: center;
    width: 6em;
  }
`;
export const MoveButton = styled.button`
  width: 120px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 58.341px;
  border: 2.334px solid #fff;

  opacity: 1;

  background: rgba(255, 255, 255, 0);
  color: #fff;

  text-align: center;
  font-family: Noto Sans KR;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  .svg-wrapper {
    display: none;
  }
  @media (max-width: 1024px) {
    display: flex;
    border: none;
    justify-content: center;
    align-items: center;
    color: transparent;

    width: 100%;
    .svg-wrapper {
      display: block;
    }
  }
`;
export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2em;
`;
export const NameText = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  color: #000;
  width: 15em;
  gap: 5px;

  margin-left: 30px;
  text-align: center;
  font-family: Noto Sans KR;
  font-size: 2em;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const SubTitle = styled.div`
  display: flex;
  width: 10em;
  height: 80px;
  margin-top: 2em;
  margin-bottom: 0.1em;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
  color: #000;

  font-family: Noto Sans KR;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const RegButton = styled.button`
  width: 96.759px;
  height: 41.468px;
  flex-shrink: 0;
  border-radius: 57.595px;
  opacity: 1;

  background: #008bff;
  flex-shrink: 0;
  color: #fff;

  text-align: center;
  font-family: Noto Sans KR;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
export const ItemList = styled.div`
  display: flex;
  overflow: auto;
  width: 100%;
  height: 20em;
  flex-direction: row;
  flex: 1;
  gap: 2em;
`;
export const ItemSlider = styled.div`
  width: 100%;
  height: 30vh;
`;
export const ItemSlider2 = styled.div`
  width: 100%;
  height: 85vh;
  padding: 1.5em;
`;
export const Picture = styled.div`
  width: 171px;
  height: 171px;
  flex-shrink: 0;
  border-radius: 37.316px;
  opacity: 1;

  background: ${(props) =>
    props.bgimg
      ? `url(${props.bgimg}) no-repeat center/cover`
      : `linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.28) 100%)`};
`;
export const ItemInfo = styled.div`
  display: flex;
  width: 159px;
  height: 64px;
  flex-shrink: 0;
  color: #000;
  justify-content: center;
  align-items: center;
`;
export const ItemTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0.7em;
`;
export const ItemText1 = styled.p`
  color: #000;

  text-align: center;
  font-family: Noto Sans KR;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0;
  padding: 0;
`;
export const ItemText2 = styled.p`
  opacity: 1;
  color: #008bff;
  font-family: Noto Sans KR;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin: 0;
  padding: 0;
`;
export const ItemText3 = styled.p`
  opacity: 1;
  color: #97b0aa;
  font-family: Noto Sans KR;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin: 0;
  padding: 0;
`;
export const MusicHeart = styled.div`
  width: 39.603px;
  height: 39.603px;
  flex-shrink: 0;
  opacity: 1;

  background: url(), lightgray 50% / cover no-repeat;

  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
`;
export const PerfomanceList = styled.div`
  display: flex;
  width: 100%;
  height: 20em;
  flex-direction: row;
  flex: 1;
  gap: 2em;
`;

export const PerformanceBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 406px;
  height: 700px;
  flex-shrink: 0;
  border-radius: 30px;
  opacity: 1;

  background: #fff;

  box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.15);
`;
export const PerformancePictureBox = styled.div`
  width: 365.776px;
  height: 505.802px;
  flex-shrink: 0;
  opacity: 1;
`;
export const PerformancePicture = styled.div`
  width: 365.776px;
  height: 483px;
  flex-shrink: 0;
  border-radius: 20px;
  opacity: 1;

  background: ${(props) =>
    props.src
      ? `url(${props.src}) no-repeat center/cover`
      : `linear-gradient(180deg, #2400ff 0%, #f00 100%)`};
`;
export const PerformanceTextBox = styled.div`
  display: flex;
  width: 85%;
  flex-direction: column;
  justify-content: flex-start;
  height: 150px;
  flex-shrink: 0;
`;
export const PerformanceText1 = styled.p`
  color: #000;

  font-family: Noto Sans KR;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0;
  padding: 0;
`;
export const PerformanceText2 = styled.p`
  color: #354b45;
  font-family: Noto Sans KR;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin: 0;
  padding: 0;
`;
export const PerformanceText3 = styled.p`
  color: #354b45;
  font-family: Noto Sans KR;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin: 0;
  padding: 0;
`;
export const PerformanceText4 = styled.p`
  color: #97b0aa;
  font-family: Noto Sans KR;
  font-size: 16px;
  font-style: normal;
  font-weight: 350;
  line-height: normal;
  margin: 0;
  padding: 0;
  margin-bottom: 10px;
`;
export const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const PerformanceButton = styled.button`
  width: 96.759px;
  height: 41.468px;
  flex-shrink: 0;
  border-radius: 57.595px;
  opacity: 1;

  background: #354b45;
  color: #fff;

  text-align: center;
  font-family: Noto Sans KR;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
export const PayBox = styled.div`
  width: 500px;
  height: 100%;
  overflow: auto;
`;

export const RadioButton = styled.button`
  background: #fff;
  color: #000;
  border: 1px solid #ccc;
  padding: 10px;
  margin-right: 10px;
  transition: all 0.3s ease-in-out; // 부드럽게 변화하는 효과를 위해 transition 추가

  &.checked {
    background-color: #525970;
    color: white;
  }
`;
export const ExchangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const CashInput = styled.input`
  width: 300px;
  padding: 10px 15px;
  border: none;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  color: #333;
  background-color: #f5f5f5;
  transition: all 0.3s ease-in-out;

  &:focus {
    outline: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
    background-color: #fff;
  }

  &::placeholder {
    color: #aaa;
  }
`;

export const ExchangeButton = styled.button`
  width: 300px;
  padding: 10px 15px;
  border: none;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  color: #333;
  background-color: #f5f5f5;
  transition: all 0.3s ease-in-out;
  margin-top: 10px;

  &:hover {
    cursor: pointer;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  }

  &:focus {
    outline: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
    background-color: #fff;
  }
`;
export const NextArrow = styled.div`
  width: 30px;
  height: 30px;
  background: #000;
  position: absolute;
  right: -15px;
  top: calc(50% - 15px);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
  &:before {
    content: ">";
    font-size: 20px;
  }
`;

export const PrevArrow = styled.div`
  width: 30px;
  height: 30px;
  background: #000;
  position: absolute;
  left: -15px;
  top: calc(50% - 15px);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
  &:before {
    content: "<";
    font-size: 20px;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 800px;
  height: 100px;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

export const CardTitle = styled.h2`
  -size: 24px;
  color: #000000;
`;

export const CardMembers = styled.p`
  font-size: 16px;
  color: #828282;
`;

export const CardButton = styled.button`
  width: 100px;
  height: 50px;
  background-color: #2f80ed;
  color: #ffffff;
  border: none;
  border-radius: 5px;
`;
export const ChatingContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
`;
// 채팅방 생성 모달
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const Title = styled.h1`
  color: #333;
`;

export const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px; // 버튼 사이의 간격
`;

export const Button = styled.button`
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export const ChatContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ChatHeader = styled.div`
  font-size: 1.5em;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

export const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  overflow-y: auto;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 20px;
`;

export const Message = styled.div`
  max-width: 60%;
  padding: 10px;
  margin: 10px;
  border-radius: 20px;
  background-color: ${(props) => (props.isSender ? "#DCF8C6" : "#E0E0E0")};
  align-self: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
  border: ${(props) =>
    props.isSender ? "1px solid #DCF8C6" : "1px solid #E0E0E0"};
`;

export const ChatInput = styled.input`
  padding: 10px;
  width: 70%;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

export const SendButton = styled.button`
  padding: 10px 15px;
  border: none;
  background-color: #4caf50;
  color: white;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;
export const CloseButton = styled.button`
  padding: 10px 15px;
  border: none;
  background-color: #f44336;
  color: white;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;
