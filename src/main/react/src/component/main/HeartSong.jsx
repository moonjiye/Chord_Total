import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainAxios from "../../axios/MainAxios";
import styled from "styled-components";
import Heart from "../../images/HeartBox.svg";
// import a from "../../images/musicplay.gif";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.9);
`;

const Main = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  background-color: rgba(255, 255, 255, 0.08);
`;

const Contents = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  /* flex-wrap: wrap; */
  justify-content: center;
  align-items: center;
  box-shadow: inset -0.5px -9.5px 15px 0.5px rgba(0, 0, 0, 0.3);
`;

const Content = styled.div`
  width: ${(props) => props.width || "10%"};
  color: white;
  font-size: 1.3rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const HeartTag = styled.div`
  background-image: url(${Heart});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeartSong = () => {
  const usenavigate = useNavigate();

  const [list, setList] = useState([]);

  const onClick = () => {
    usenavigate(`/music-list`);
  };

  useEffect(() => {
    const getList = async () => {
      const res = await MainAxios.heartSong();
      console.log("음악 좋아요 정렬", res);
      if (res.status === 200) {
        // heartCount를 기준으로 내림차순 정렬
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
    };
    getList();
  }, []);

  return (
    <>
      <Container>
        <Main>
          {list.slice(0, 10).map((data, index) => (
            <Contents key={index}>
              {/* <Content onDoubleClick={onClick}>{index + 1}</Content> */}
              <img
                src={data.musicDTO.thumbnailImage}
                alt="썸네일"
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
              />
              <Content width="15%" onDoubleClick={onClick}>
                <h1 style={{ lineHeight: "0", fontSize: "1.5rem" }}>
                  {data.musicDTO.musicTitle}
                </h1>
                <p style={{ lineHeight: "0" }}>
                  by: {data.userResDto.userNickname}
                </p>
              </Content>
              {/* <Content onDoubleClick={onClick} width="20%">
                <img
                  src={a}
                  alt="음악 실행"
                  style={{ width: "30px", height: "30px" }}
                />
              </Content> */}
              <Content width="20%" onDoubleClick={onClick}>
                {data.musicDTO.genre}
              </Content>
              <Content width="20%" style={{ color: "#00FFA8" }}>
                {data.musicDTO.releaseDate}
              </Content>
              <Content>
                <HeartTag>{data.musicDTO.heartCount}</HeartTag>
              </Content>
            </Contents>
          ))}
        </Main>
      </Container>
    </>
  );
};

export default HeartSong;
