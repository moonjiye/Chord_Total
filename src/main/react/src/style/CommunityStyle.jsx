import styled, { keyframes } from "styled-components";

export const Page = styled.div`
  display: flex;
  height: auto;
  flex-direction: column;
  align-items: flex-start;
`;
export const Hidden = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

export const Container = styled.div`
  display: flex;
  padding: 60px 170px;
  justify-content: center;
  align-items: center;
  gap: 60px;
  align-self: stretch;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  flex: 1;
`;
export const Title = styled.a`
  width: 16em;
  color: #000;

  text-align: center;
  font-family: Roboto;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  @media (max-width: 1024px) {
    width: 501px;
    height: 83px;
    flex-shrink: 0;
  }
`;
export const Note = styled.div`
  display: flex;
  padding: 1em;
  width: 7em;
  height: 7em;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
`;

// export const CommunityContainer = styled.div`
//   display: flex;
//   padding: 0px 348px;
//   flex-direction: column;
//   align-items: center;
//   align-self: stretch;
// `;
export const CommunityList = styled.div`
  display: flex;
  width: 100%;
  padding: 57.6px 183.99px 57.6px 0px;
  align-items: flex-start;
  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 0;
  }
`;
export const Aside = styled.div`
  display: flex;
  width: 100%;
  max-width: 264px;
  padding-bottom: 492.83px;
  flex-direction: column;
  align-items: flex-start;
  gap: 14.39px;
  flex-shrink: 0;
  align-self: stretch;
  @media (max-width: 1024px) {
    max-width: 100%;
    padding-bottom: 0;
  }
`;

export const CommunityDashboard = styled.div`
  height: 200px;
  align-self: stretch;
  padding: 20px;
  border-radius: 10.8px;
  border: 1px solid #e6e6e6;
  opacity: 1;
  @media (max-width: 1024px) {
    display: none;
  }
`;
export const DashboardButtonFrame = styled.div`
  display: flex;
  width: 218.81px;
  flex-direction: column;
  align-items: flex-start;
`;
export const DashboardButton = styled.button`
  width: 100%;
  border-radius: 7.2px;
  border-top: 1px solid #d8d8d8;
  border-right: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
  border-left: 1px solid #d8d8d8;
  opacity: 1;
  background: linear-gradient(180deg, #66b9ff 32.2%, #5de2cc 99.85%);
`;
export const TextCenter = styled.div`
  display: flex;
  width: 200px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;
export const TextFrame = styled.div`
  display: flex;
  margin: 10px;
  padding: 0px 65px 0px 66px;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
`;
export const TextLog = styled.p`
  display: flex;
  width: 96px;
  height: 23px;
  max-width: 218.81px;
  flex-direction: column;
  justify-content: center;
  color: #999;

  text-align: center;
  font-family: Inter;
  font-size: 10.8px;
  font-style: normal;
  font-weight: 500;
  line-height: 16.2px;
`;
export const CommunityProfile = styled.span`
  display: flex;
  width: 218.81px;
  max-width: 264px;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`;

export const CommunityProfileFrame = styled.div`
  display: flex;
  max-width: 218.81px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;
export const CommunityProfilePart = styled.div`
  display: flex;
  width: 138px;
  height: 91px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const CommunityProfileImg = styled.div`
  height: 91px;
  min-width: 218.81px;
  max-width: 218.81px;
  min-height: 91px;
  max-height: 91px;
  position: absolute;
  opacity: 1;
  background-size: cover;
  background: ${(props) =>
    `url(${props.img}), lightgray 40.482px 0px / 62.998% 100% no-repeat`};
  box-shadow: 0px 8px 4px 0px rgba(0, 0, 0, 0.25);
`;
export const CommunityMenuList = styled.div`
  display: flex;
  padding-bottom: 242.34px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  @media (max-width: 1024px) {
    padding-bottom: 0;
    width: 100%;
  }
`;
export const CommunityMenuItem = styled.div`
  display: flex;
  width: 264px;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;
export const CommunityLink = styled.div`
  display: flex;
  padding: 15px 10px 15px 15px;

  align-items: center;
  justify-content: center;
  align-self: stretch;
  @media (max-width: 1024px) {
    width: 100%;
    padding: 10px;
    margin: 5px;
    border-radius: 9999px;
    border: 1px solid #000;

    opacity: 1;

    background: rgba(102, 185, 255, 0.25);
  }
`;
export const CommunitySVG = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;
export const CommunityMenuText = styled.a`
  width: 300px;
  color: #333;
  font-family: Inter;
  font-size: 12.6px;
  font-style: normal;
  font-weight: 700;
  line-height: 21.6px;
  @media (max-width: 1024px) {
    width: 100%;
    text-align: center;
  }
`;
export const CommunityMenuButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;
export const CommunityItem = styled.div`
  display: flex;
  margin-left: 10px;
  gap: 10px;
  width: 200px;
  align-items: flex-start;
  align-self: stretch;
  cursor: pointer;

  @media (max-width: 1024px) {
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;
export const CommunityItemList = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1024px) {
    flex-direction: row;
  }
`;
export const CommunitySection = styled.div`
  display: flex;
  width: 1224px;
  max-width: 1224px;
  padding: 57.6px 183.99px 57.6px 0px;
  align-items: flex-start;
`;
const fadeInOut = keyframes`
  0% { opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { opacity: 0; }
`;
export const MessageBox = styled.div`
  border: 1px solid black;
  padding: 10px;
  margin: 10px 0;
  height: 10%;
  width: 50%;
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
  z-index: 1000;
  bottom: 0;
  left: 25%;
  animation: ${fadeInOut} 4s ease-in-out forwards;
`;
export const SVGX = styled.div`
  @media (max-width: 1024px) {
    display: none;
  }
`;
