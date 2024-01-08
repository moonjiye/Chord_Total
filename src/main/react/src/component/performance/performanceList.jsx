import AxiosApi from "../../axios/PerformanceAxios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PerformanceCardView from "./PerformanceCardView";

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 220rem;
  gap: 2rem;
  margin: 2rem 0;
  justify-content: center;
  /* margin: 20px; */
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
  width: 100%;
  height: auto;
`;

const PageButton = styled.button`
  border: 1px solid #ddd;
  padding: 5px;
  width: 3rem;
  height: 3rem;
  margin: 0 5px;
  background-color: #f0f0f0;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.3s;

  &:hover {
    background-color: darkgray;
  }

  &:focus {
    outline: none;
    background-color: var(--mainblue);
    color: white;
  }
`;

const PerformanceList = ({ performanceList, onCardMouseOver }) => {
  // const[performanceList, setPerformanceList] = useState([]); // 공연목록 데이터
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
  const itemsPerPage = 5; // 한 페이지에 보여줄 아이템 수
  const [totalPage, setTotalPage] = useState(0); // 전체 페이지

  // 총 페이지 수 계산
  useEffect(() => {
    const totalPage = async () => {
      try {
        console.log("performanceList 총페이지수계산 시도");
        console.log(performanceList);
        const res = await AxiosApi.getPerformancePage(0, 5);
        setTotalPage(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    totalPage();
  }, []);

  // 페이지 이동
  const handlePageChange = (number) => {
    console.log(number);
    setCurrentPage(number - 1);
  };

  // 페이지네이션 렌더링
  const renderPagination = () => {
    const totalPage = Math.ceil(performanceList.length / itemsPerPage);
    return (
      <PaginationContainer>
        {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
          <PageButton key={page} onClick={() => handlePageChange(page)}>
            {page}
          </PageButton>
        ))}
      </PaginationContainer>
    );
  };

  return (
    <>
      <CardContainer>
        {performanceList
          .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
          .map((performance) => (
            <PerformanceCardView
              key={performance.performanceId}
              performanceId={performance.performanceId}
              image={performance.performanceImage}
              title={performance.performanceName}
              venue={performance.venue}
              performer={[performance.nicknames]}
              date={performance.performanceDate}
              onMouseOver={onCardMouseOver}
            />
          ))}
      </CardContainer>
      {renderPagination()}
    </>
  );
};

export default PerformanceList;
