import React, { useEffect, useState } from "react";
import MainAxios from "../../axios/MainAxios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import a from "../../images/Login_Bg.png";

const Nologin = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${a});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  font-size: 4rem;
  font-weight: 900;
  color: white;
  text-align: center;
  padding: 50px;
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  border-radius: 20px;
  margin: 0 auto;
  width: 800px;
  height: 600px;
  box-shadow: 0px 10px 25px -5px rgba(0, 0, 0, 0.25);

  background-image: ${(props) => `url(${props.imagePath})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  overflow: hidden;

  @media (max-width: 1400px) {
    height: 500px;
  }

  @media (max-width: 768px) {
    height: 400px;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .text {
    font-size: 1.3rem;
    font-weight: 900;
    line-height: 0;
  }
`;

const Title = styled.p`
  display: flex;
  justify-content: center;
  color: #61e6ca;
  font-size: 4rem;
  line-height: 0;
  font-weight: 900;
  text-shadow: 0px 8px 4px rgba(97, 230, 202, 0.25);
`;

const Gender = (useAuth) => {
  //   console.log("useAuth의 값: ", useAuth.useAuth);

  const usenavigate = useNavigate();

  const [list, setList] = useState([]);

  // 해당 링크로 이동
  const onClick = (id) => {
    // 임시
    usenavigate(`/music-info/${id}`);
  };

  useEffect(() => {
    const getList = async () => {
      if (useAuth) {
        try {
          const res = await MainAxios.genderHeart();
          if (res.status === 200) {
            console.log("성별 좋아요 조회 : ", res.data);
            const sortedList = res.data.sort(
              // 비교 함수
              // a와 b를 비교하여 정렬 순서를 결정
              // a가 b보다 앞에 오려면 음수를 반환, a가 b보다 뒤에 오려면 양수를 반환, 같으면 0을 반환
              (a, b) => b.musicDTO.heartCount - a.musicDTO.heartCount
            );
            setList(sortedList);
          } else {
            setList([]);
          }
        } catch (e) {
          console.log(e);
        }
      }
    };

    getList();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
  };

  return (
    <>
      {/* <Nologin></Nologin> */}
      {!useAuth.useAuth && (
        <Nologin>
          <p style={{ fontSize: "2rem" }}>당신도 가수가 될 수 있다!</p>

          <p>로그인 하여 더 많은 기능을 누려보세요!</p>
          <p style={{ fontSize: "3rem" }}>
            우리 chord8은 회원님의 방문에 감사함을 느낍니다.
          </p>
        </Nologin>
      )}
      {useAuth.useAuth && (
        <>
          <Title>AI 추천!!</Title>
          <Slider {...settings}>
            {list.slice(0, 10).map((data, index) => (
              <Contents key={index}>
                <Content
                  onDoubleClick={() => onClick(data.musicDTO.id)}
                  imagePath={data.musicDTO.thumbnailImage}
                ></Content>
                <Text>
                  {/* <p className="text">{data.musicDTO.releaseDate}</p> */}
                  <p className="text">{data.userResDto.userNickname}</p>
                  <p className="text">{data.musicDTO.genre}</p>
                  <p className="text">{data.musicDTO.releaseDate}</p>
                </Text>
              </Contents>
            ))}
          </Slider>
        </>
      )}
    </>
  );
};

export default Gender;
