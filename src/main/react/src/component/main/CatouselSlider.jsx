import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MainAxios from "../../axios/MainAxios";

const Container = styled.div`
  /* border: 3px solid black; */
  height: 80%;
  width: 100%;
  margin-top: 5%;
`;

const Contents = styled.div`
  /* border: 3px solid gray; */
  width: 100%;
  height: 45vh;
`;

const Content = styled.div`
  margin: 0 auto;
  width: 90%;
  height: 90%;
  background-image: ${(props) => `url(${props.imagePath})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  overflow: hidden;
  border-radius: 20px;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const Text = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    rgba(255, 255, 255, 0.1),
    rgba(128, 128, 128, 0.6)
  );
  color: white;
  display: flex;
  // 역정렬
  flex-direction: column-reverse;

  .text {
    font-size: 2rem;
    font-weight: 900;
    line-height: 0;
    margin-left: 5%;
  }
`;

// 좌우 이동 arrow 스타일 지정
const Custom = styled.div`
  border-radius: 5px;
  height: 30vh;
  background-color: rgba(0, 0, 0, 0.1); /* 배경색 지정 */
`;

const CatouselSlider = () => {
  const usenavigate = useNavigate();
  // 백엔드의 리스트 데이터 저장
  const [list, setList] = useState([]); // 상태로 list 선언

  // 해당 링크로 이동
  const onClick = (id) => {
    // 임시
    usenavigate(`/music-info/${id}`);
  };

  // 리스트 : 백엔드에서 가져올것.
  useEffect(() => {
    const getList = async () => {
      const res = await MainAxios.notLoginList();
      console.log("리스트 데이터", res);
      if (res.status === 200) {
        // 내림차순으로 정렬
        const sortedList = res.data
          .slice()
          .sort((a, b) => b.musicDTO.purchaseCount - a.musicDTO.purchaseCount);
        setList(sortedList);
        console.log("list = res.data", sortedList);
      }
    };
    getList();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    // slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <Custom />,
    prevArrow: <Custom />,
    // break 포인트는 미디어쿼리랑 동일한 역할을 한다.
    responsive: [
      {
        breakpoint: 768, // 화면 크기가 768px 이하일 때
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 9999, // 화면 크기가 9999px 이하일 때 (무제한)
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <Container>
      <Slider {...settings}>
        {list.slice(0, 10).map((data, index) => (
          <Contents key={index}>
            <Content
              onDoubleClick={() => onClick(data.musicDTO.id)}
              imagePath={data.musicDTO.thumbnailImage}
            >
              <Text>
                {/* 역정렬이므로 가장 아래있을게 가장 먼저 등장 */}
                {/* <p className="text">-{data.musicDTO.purchaseCount} 건</p> */}
                <p className="text">{data.musicDTO.musicTitle}</p>
                <p className="text">{data.userResDto.userNickname}</p>
              </Text>
            </Content>
          </Contents>
        ))}
      </Slider>
    </Container>
  );
};
export default CatouselSlider;
