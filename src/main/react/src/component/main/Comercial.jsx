import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import MainAxios from "../../axios/MainAxios";

const Container = styled.div`
  /* border: 3px solid black; */
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Contents = styled.div`
  width: 30%;
  height: 40%;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  background-image: ${(props) => `url(${props.imagePath})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
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
  flex-direction: column;
  justify-content: center;
  .text {
    font-size: 2rem;
    font-weight: 900;
    line-height: 0;
    margin-left: 5%;
  }

  .venue {
    font-size: 2rem;
    font-weight: 600;
    line-height: 1;
    margin-left: 5%;
  }
`;
const Comercial = () => {
  const usenavigate = useNavigate();
  const [list, setList] = useState([]);

  // 해당 링크로 이동
  const onClick = (id) => {
    // 임시
    usenavigate(`/PerformanceDetail/${id}`);
  };

  useEffect(() => {
    const getList = async () => {
      const res = await MainAxios.notLoginPerformList();
      console.log("공연 정보 : ", res.data);
      if (res.status === 200) {
        setList(res.data.slice(0, 6));
      } else {
        setList(null);
      }
    };
    getList();
  }, []);

  return (
    <Container>
      {list.map((data, index) => (
        <Contents key={index}>
          <Content
            onDoubleClick={() => onClick(data.performanceId)}
            imagePath={data.performanceImage}
          >
            <Text>
              {/* 역정렬이므로 가장 아래있을게 가장 먼저 등장 */}
              <p className="text">{data.performanceName}</p>

              <p className="text">
                {data.nicknames.map((nickname, index) => (
                  <span key={index}>{nickname} </span>
                ))}
              </p>
              <p className="venue">{data.venue}</p>
            </Text>
          </Content>
        </Contents>
      ))}
    </Container>
  );
};

export default Comercial;
