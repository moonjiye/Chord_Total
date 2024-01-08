import styled from "styled-components";
import { PieChart } from "react-minimal-pie-chart";
import React, { PureComponent } from "react";
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
import { useEffect } from "react";
import AdminAxios from "../../axios/AdminAxios";

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

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PIESTYLE = styled.div`
  text-align: center;
  width: 500px;
  height: 500px;
  margin-bottom: 57px;
`;

const UserList = ({
  selectedButton,
  male,
  female,
  userList,
  userAgeList,
  userDataList,
}) => {
  // piechart
  const data = [
    { title: "Male", value: male.length, color: "#ff8000" },
    { title: "Female", value: female.length, color: "#ff0800" },
  ];

  const ageData = [
    { name: "20대", twentiesvalue: userAgeList.twenties.length },
    { name: "30대", thirtiesvalue: userAgeList.thirties.length },
    { name: "40대", fortiesvalue: userAgeList.forties.length },
    { name: "기타", others: userAgeList.others.length },
  ];

  // 회원 삭제
  const onClickDelete = async (id) => {
    console.log("삭제할 Id : ", id);
    AdminAxios.deleteUser(id);
  };

  return (
    <>
      {selectedButton === "User" && (
        <Table>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>NAME</Th>
              <Th>NICKNAME</Th>
              <Th>GENDER</Th>
              <Th>EMAIL</Th>
              <Th>AGE</Th>
              <Th>POINT</Th>
              <Th>AUTHORITY</Th>
              <Th>DELETE</Th>
            </tr>
          </thead>
          <tbody>
            {userList.map((data, index) => (
              <tr key={index}>
                <Td>{data.id}</Td>
                <Td>{data.userName}</Td>
                <Td>{data.userNickname}</Td>
                <Td>{data.userGen}</Td>
                <Td>{data.userEmail}</Td>
                <Td>{data.userAge}</Td>
                <Td>{data.userPoint}</Td>
                <Td>{data.authority}</Td>
                <Td
                  style={{ cursor: "pointer" }}
                  onClick={() => onClickDelete(data.id)}
                >
                  {"delete"}
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {selectedButton === "UserGraph1" && (
        <Container>
          <p style={{ fontSize: "5rem", fontWeight: "900" }}>성 비</p>
          <PIESTYLE>
            <PieChart
              data={data}
              label={({ dataEntry }) => ` ${Math.round(dataEntry.percentage)}%`}
              labelStyle={{
                fontSize: "0.5rem",
                fontWeight: "900",
              }}
            />
            <span style={{ color: "#ff8000", fontSize: "4rem" }}>
              {data[0].title}
            </span>
            <span
              style={{
                color: "#ff0800",
                fontSize: "4rem",
                marginLeft: "3rem",
              }}
            >
              {data[1].title}
            </span>
          </PIESTYLE>
        </Container>
      )}
      {selectedButton === "UserGraph2" && (
        <Container>
          <p style={{ fontSize: "5rem", fontWeight: "900" }}>연 령</p>

          <ResponsiveContainer width="80%" height="60%">
            <BarChart width={600} height={300} data={ageData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="twentiesvalue" fill="#8884d8" />
              <Bar dataKey="thirtiesvalue" fill="#82ca9d" />
              <Bar dataKey="fortiesvalue" fill="#ffc658" />
              <Bar dataKey="othres" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </Container>
      )}
    </>
  );
};

export default UserList;
