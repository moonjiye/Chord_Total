import styled from "styled-components";
import { PieChart } from "react-minimal-pie-chart";
import React, { PureComponent, useEffect } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const Th = styled.th`
  width: 10%;
  height: 30px;
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
  font-size: 2rem;
`;

const Td = styled.td`
  height: 30px;
  border: 1px solid #ddd;
  text-align: left;
  padding: 10px;
  max-width: 50px;
  overflow: hidden;
`;

const MusicList = ({ selectedButton, musicList, pageList }) => {
  console.log("pageList : ", pageList);
  // 음악 장르별 좋아요
  const heartData = musicList.map((data) => ({
    genre: data.musicDTO.genre,
    heart: data.musicDTO.heartCount,
  }));
  // 음악 장르별 판매수
  const purchaseData = musicList.map((data) => ({
    genre: data.musicDTO.genre,
    purchaseCount: data.musicDTO.purchaseCount,
  }));

  return (
    <>
      {selectedButton === "Music" && (
        <Table>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>TITLE</Th>
              <Th>NICKNAME</Th>
              <Th>GENRE</Th>
              <Th>PURCHASECOUNT</Th>
              <Th>HEARTCOUNT</Th>
              <Th>RELEASEDATE</Th>
            </tr>
          </thead>
          <tbody>
            {pageList.map((data, index) => (
              <tr key={index}>
                <Td>{data.musicDTO?.id}</Td>
                <Td>{data.musicDTO?.musicTitle}</Td>
                <Td>{data.userResDto?.userNickname}</Td>
                <Td>{data.musicDTO?.genre}</Td>
                <Td>{data.musicDTO?.purchaseCount}</Td>
                <Td>{data.musicDTO?.heartCount}</Td>
                <Td>{data.musicDTO?.releaseDate}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {selectedButton === "MusicGraph1" && (
        <Container>
          <p style={{ fontSize: "5rem", fontWeight: "900" }}>장르별: 좋아요</p>

          <ResponsiveContainer width="80%" height="60%">
            <BarChart width={600} height={300} data={heartData}>
              <XAxis dataKey="genre" />
              <YAxis />
              <Bar dataKey="heart" fill="orange" />
            </BarChart>
          </ResponsiveContainer>
        </Container>
      )}
      {selectedButton === "MusicGraph2" && (
        <Container>
          <p style={{ fontSize: "5rem", fontWeight: "900" }}>장르별: 판매수</p>

          <ResponsiveContainer width="80%" height="60%">
            <BarChart width={600} height={300} data={purchaseData}>
              <XAxis dataKey="genre" />
              <YAxis />
              <Bar dataKey="purchaseCount" fill="orange" />
            </BarChart>
          </ResponsiveContainer>
        </Container>
      )}
    </>
  );
};

export default MusicList;
