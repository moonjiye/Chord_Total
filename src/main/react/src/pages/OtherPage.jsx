import { useEffect, useState } from "react";
import { ReactComponent as Heart } from "../images/HeartBox.svg";

import {
  Artist,
  ArtistContainer,
  InterBox,
  InterBoxText,
  MainHead,
  MainHeadBox,
  MainHeadText,
  MainProfile,
  MyPageContainer,
} from "../style/MyPageStyle";
import MemberInfoAxiosApi from "../axios/MemberInfoAxios";
import OtherPageComponent from "../component/Mypage/OtherPageComponent";
import { useParams } from "react-router";

const OtherPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userMusic, setUserMusic] = useState(null);
  const [userPerformance, setUserPerformance] = useState(null);
  const { email } = useParams();

  useEffect(() => {
    const fetchUserInfoAndMusic = async () => {
      try {
        const userInfoResponse = await MemberInfoAxiosApi.getUserInfo(email);
        setUserInfo(userInfoResponse.data);
        if (userInfoResponse.data) {
          const musicResponse = await MemberInfoAxiosApi.getUserMusic(
            userInfoResponse.data.id
          );
          setUserMusic(musicResponse.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    const fetchData = async () => {
      const response = await MemberInfoAxiosApi.getUserInfoByPerformanceEmail(
        email
      );
      setUserPerformance(response.data);
    };
    fetchData();
    fetchUserInfoAndMusic();
  }, [email]);
  return (
    <>
      <MyPageContainer>
        <MainHead>
          <MainProfile></MainProfile>
          <ArtistContainer>
            <MainHeadBox>
              <MainHeadText>
                공연 횟수 :{" "}
                {userPerformance && userPerformance.performances.length}
              </MainHeadText>
              <MainHeadText>
                등록된 음원 : {userMusic && userMusic.length}
              </MainHeadText>
              <InterBox>
                <InterBoxText>
                  <Heart />
                  {userMusic && userMusic[0].musicDTO.heartCount}
                </InterBoxText>
              </InterBox>
            </MainHeadBox>

            <Artist>ARTIST</Artist>
          </ArtistContainer>
        </MainHead>
        <OtherPageComponent
          userMusic={userMusic}
          userPerformance={userPerformance}
          userInfo={userInfo}
        />
      </MyPageContainer>
    </>
  );
};
export default OtherPage;
