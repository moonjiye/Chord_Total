import {
  MainContainer,
  Main,
  TopText,
  Artist,
  Advertisement,
  MusicRankTitle,
  NewMusicList,
  MusicRank,
  News,
  TopContainer,
  P3,
} from "../component/main/MainPageComponent";
import Carousel from "../component/main/CatouselSlider";
import NewList from "../component/main/NewList";
import Comercial from "../component/main/Comercial";
import HeartSong from "../component/main/HeartSong";
import Gender from "../component/main/GenderAlgorism";
import UseAuth from "../hooks/UseAuth";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const useAuth = UseAuth();
  // console.log("메인 페이지 useAuth :", useAuth);
  const usenavigate = useNavigate();
  const onClick = () => {
    usenavigate("/shopPage");
  };

  return (
    <>
      <MainContainer>
        <TopContainer onClick={onClick}>
          <TopText>
            <p className="text-top">평범 했던 우리 모두가 가수가 되는 순간</p>
            <p className="text-main">당신의 음악을 등록하세요.</p>
            <p className="text-bottom">
              여러분의 음악이 세상에 등장하는 순간을 함께합니다.
            </p>
            <p className="text-main">현재 활동중인 크리에이터들과</p>
            <p className="text-bottom">영감을 주고 받아보세요!</p>
          </TopText>
        </TopContainer>

        <Main>
          <Artist>
            <P3
              fontSize="4rem"
              style={{
                color: "#82ccff",
                textShadow: "0px 8px 4px rgba(97, 230, 202, 0.25)",
              }}
            >
              SNS HOT! SONG
            </P3>
            <Carousel></Carousel>
          </Artist>

          <Advertisement>
            <Gender useAuth={useAuth}></Gender>
          </Advertisement>

          <MusicRank>
            <MusicRankTitle>지금 이 순간 인기 있는 음악 Best 10</MusicRankTitle>
            <HeartSong></HeartSong>
          </MusicRank>
          <NewMusicList>
            <NewList></NewList>
          </NewMusicList>
          <News>
            <Comercial></Comercial>
          </News>
        </Main>
      </MainContainer>
    </>
  );
};

export default MainPage;
