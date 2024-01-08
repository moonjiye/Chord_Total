import styled from "styled-components";
import { PieChart } from "react-minimal-pie-chart";
import React, { PureComponent, useEffect, useState } from "react";
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

const PerformanceList = ({
  selectedButton,
  performanceList,
  pageList,
  purchaseCount,
}) => {
  const data = performanceList.slice(0, 10).map((data, index) => ({
    performanceName: data.performanceName,
    // ?? (Nullish coalescing)는 null이나 undefined일 때만 뒤의 값을 사용하는 연산자
    value: data.price * (purchaseCount[index]?.data ?? 0),
  }));

  return (
    <>
      {selectedButton === "Performance" && (
        <Table>
          <thead>
            <tr>
              <Th>NO.</Th>
              <Th>TITLE</Th>
              <Th>PRICE</Th>
              <Th>SEATCOUNT</Th>
              <Th>VENUE</Th>
            </tr>
          </thead>
          <tbody>
            {pageList.map((data, index) => (
              <tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{data.performanceName}</Td>
                <Td>{data.price}</Td>
                <Td>{data.seatCount}</Td>
                <Td>{data.venue}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {["PerformanceGraph1", "PerformanceGraph2"].includes(selectedButton) && (
        <Container>
          <p style={{ fontSize: "5rem", fontWeight: "900" }}>공연별 총 매출</p>

          <ResponsiveContainer width="80%" height="60%">
            <BarChart width={600} height={300} data={data}>
              <XAxis dataKey="performanceName" />
              <YAxis />
              <Bar dataKey="value" fill="orange" />
            </BarChart>
          </ResponsiveContainer>
        </Container>
      )}
    </>
  );
};

export default PerformanceList;
