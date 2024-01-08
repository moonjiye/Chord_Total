import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouterLink,
} from "react-router-dom";

import { ReactComponent as SvgS } from "../images/music-svgrepo-com.svg";
import { ReactComponent as Menu } from "../images/Menu.svg";
// import { ReactComponent as Heart } from "../images/Heart.svg";
// import { ReactComponent as Clip } from "../images/Clip.svg";
// import { ReactComponent as User } from "../images/User.svg";
// import { ReactComponent as Logo } from "../images/Symbol_color@300x.svg";
import { ReactComponent as Down } from "../images/Down.svg";
import { ReactComponent as Talk } from "../images/Talk.svg";
import { ReactComponent as Star } from "../images/Star.svg";

import {
  Aside,
  CommunityDashboard,
  CommunityProfileFrame,
  CommunityList,
  CommunityMenuList,
  CommunityProfilePart,
  CommunityProfile,
  CommunityProfileImg,
  Container,
  Hidden,
  Note,
  Page,
  Section,
  TextCenter,
  TextLog,
  TextFrame,
  Title,
  DashboardButton,
  DashboardButtonFrame,
  CommunityMenuItem,
  CommunityLink,
  CommunitySVG,
  CommunityMenuText,
  CommunityMenuButton,
  CommunityItem,
  CommunityItemList,
  MessageBox,
  SVGX,
} from "../style/CommunityStyle";
import { useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../axios/CommunityAxios";
import Common from "../utils/Common";
import useWebSocket from "../context/useWebsocket";
import CommunityComponent from "../component/community/CommunityComponent";
import CommunitySearchComponent from "../component/community/CommunitySearchComponent";
import Post from "../component/community/PostRoomComponent";
import WriteComponent from "../component/community/CommunityWriteComponent";
import MemberInfoAxiosApi from "../axios/MemberInfoAxios";

const CommunityPage = () => {
  const [isList, setIsList] = useState(false);
  const [categories, setCategories] = useState([]);
  const [email, setEmail] = useState("asd123@naver.com");
  const [userInfo, setUserInfo] = useState(null);
  const { message: wsMessage } = useWebSocket(Common.SOCKET_URL, email);
  const ListOpen = () => {
    setIsList(!isList);
  };
  const Link = styled(RouterLink)`
    display: block;
    width: 100%;
  `;

  const RotatedDown = styled(Down)`
    transition: transform 0.3s ease-in-out;
    transform: ${(props) =>
      props.isRotated ? "rotate(180deg)" : "rotate(0deg)"};
  `;
  useEffect(() => {
    const getCategories = async () => {
      try {
        const rsp = await AxiosApi.cateList();
        console.log(rsp.data);
        setCategories(rsp.data);
      } catch (error) {
        console.log(error);
      }
    };
    const getUserInfo = async () => {
      const userInfoResponse = await MemberInfoAxiosApi.getUserInfo(email);
      console.log(userInfoResponse.data);
      setUserInfo(userInfoResponse.data);
    };
    getUserInfo();
    getCategories();
  }, []);

  return (
    <>
      <Page>
        <Hidden>
          <Container>
            <Section>
              <Title>음악을 사랑하는 여러분의 의견을 나눠주세요.</Title>
              <Note>
                <SvgS />
              </Note>
            </Section>
          </Container>
          <CommunityList>
            <Aside>
              <CommunityDashboard>
                <CommunityProfile>
                  <CommunityProfileFrame>
                    <CommunityProfilePart></CommunityProfilePart>
                  </CommunityProfileFrame>
                  <CommunityProfileImg img={userInfo} />
                </CommunityProfile>
                <TextCenter>
                  <TextFrame>
                    <TextLog>로그인 후 더 편하게 이용해 보세요</TextLog>
                  </TextFrame>
                </TextCenter>
                <DashboardButtonFrame>
                  <DashboardButton>로그인</DashboardButton>
                </DashboardButtonFrame>
              </CommunityDashboard>
              <CommunityMenuList>
                <CommunityMenuItem>
                  <Link to="/communitypage">
                    <CommunityLink>
                      <CommunitySVG>
                        <SVGX>
                          <Menu />
                        </SVGX>
                        <CommunityItem>
                          <CommunityMenuText>전체 게시판</CommunityMenuText>
                        </CommunityItem>
                      </CommunitySVG>
                    </CommunityLink>
                  </Link>

                  <CommunityLink>
                    <CommunityMenuButton>
                      <SVGX>
                        <Talk />
                      </SVGX>
                      <CommunityItem onClick={ListOpen}>
                        <CommunityMenuText>일반 커뮤니티</CommunityMenuText>
                      </CommunityItem>
                      <RotatedDown isRotated={isList}></RotatedDown>
                    </CommunityMenuButton>
                  </CommunityLink>
                  {isList && (
                    <CommunityItemList>
                      {categories.map((category) => (
                        <Link
                          to={`/communitypage/${category.categoryId}`}
                          key={category.categoryId}
                        >
                          <CommunityLink key={category.categoryId}>
                            <CommunityItem>
                              <CommunityMenuText>
                                {category.categoryName} 게시판
                              </CommunityMenuText>
                              <Star />
                            </CommunityItem>
                          </CommunityLink>
                        </Link>
                      ))}
                    </CommunityItemList>
                  )}
                </CommunityMenuItem>
              </CommunityMenuList>
            </Aside>
            <Routes>
              <Route path="/" element={<CommunityComponent />} />
              <Route
                path="search/:searchTerm"
                element={<CommunitySearchComponent />}
              />
              <Route path=":categoryId" element={<CommunityComponent />} />
              <Route path="detail/:id" element={<Post />} />
              <Route path="write" element={<WriteComponent />} />
            </Routes>
          </CommunityList>
          {wsMessage && <MessageBox key={wsMessage}>{wsMessage}</MessageBox>}
        </Hidden>
      </Page>
    </>
  );
};

export default CommunityPage;
