import { useEffect, useState } from "react";
import { Container, SideMenu, InfoBox } from "../style/AdminStyle";
import { useNavigate } from "react-router-dom";
import SignUpAxios from "../axios/SignUpAxios";
import UserList from "../component/admin/UserList";
import MusicList from "../component/admin/MusicList";
import PerformanceAxios from "../axios/PerformanceAxios";
import AdminAxios from "../axios/AdminAxios";
import Category from "../component/category/Category";
import MainAxios from "../axios/MainAxios";
import PerformanceList from "../component/admin/PerformanceList";
import MusicAxios from "../axios/MusicAxios";
import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const PageButton = styled.button`
  border: 1px solid #ddd;
  padding: 5px;
  width: 28px;
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
    background-color: royalblue;
  }
`;

const AdminPage = () => {
  const useanvigate = useNavigate();

  // 회원 정보 및 통계
  const [selectedButton, setSelectedButton] = useState("User");
  const [selectGraph, setSelectGraph] = useState("");
  const [pageList, setPageList] = useState([]);
  const [userDataList, setUserDataList] = useState([]);
  const [musicList, setMusicList] = useState([]);
  const [performanceList, setPerformanceList] = useState([]);
  const [male, setMale] = useState([]);
  const [female, setFemale] = useState([]);
  const [userAgeList, setUserAgeList] = useState({
    twenties: [],
    thirties: [],
    forties: [],
    others: [],
  });
  const [purchaseCount, setPurchaseCount] = useState([]);

  // 페이지 네이션
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
  const [totalPage, setTotalPage] = useState(0); // 총 페이지 수

  // 타이틀 초기화
  const reset = (text) => {
    setSelectedButton(text);
    setSelectGraph("");
  };

  // 그래프 통계를 위한 클릭 함수
  // 그래프 1함수
  const onClick = (e) => {
    const value = e.target.innerText;
    setSelectGraph(value);
    if (userDataList) {
      setMale(userDataList.filter((user) => user.userGen === "male"));
      setFemale(userDataList.filter((user) => user.userGen === "female"));
      const twentiesList = userDataList.filter(
        (data) => data.userAge >= 20 && data.userAge <= 29
      );

      const thirtiesList = userDataList.filter(
        (data) => data.userAge >= 30 && data.userAge <= 39
      );

      const fortiesList = userDataList.filter(
        (data) => data.userAge >= 40 && data.userAge <= 49
      );

      const otherList = userDataList.filter(
        (data) => data.userAge <= 19 || data.userAge >= 50
      );

      setUserAgeList({
        twenties: twentiesList,
        thirties: thirtiesList,
        forties: fortiesList,
        others: otherList,
      });
    }
  };

  // 통계 데이터 호출 함수
  const getData = async () => {
    try {
      switch (selectedButton) {
        case "User":
          // 총페이지 설정
          // // 현제 페이지 설정
          const userdatares = await PerformanceAxios.getUserList();

          if (userdatares.status === 200) {
            setUserDataList(userdatares.data);
            const userres = await AdminAxios.getUserPage(currentPage, 1);
            const usercountres = await AdminAxios.getUserPageCount(0, 1);
            if (userres.status === 200) {
              setPageList(userres.data);
              setTotalPage(usercountres.data);
            }
          }
          break;
        case "Music":
          const musicres = await MainAxios.heartSong();
          if (musicres.status === 200) {
            console.log("음악 정보들 : ", musicres);
            setMusicList(musicres.data);
            const musiccount = await MusicAxios.getMusicPage(0, 1);
            const musicpagelist = await MusicAxios.getMusicList(currentPage, 1);
            if (musiccount.status === 200) {
              setPageList(musicpagelist.data);
              // console.log("음악 페이지 리스트", musicpagelist.data);
              setTotalPage(musiccount.data);
            }
          }
          break;
        case "Performance":
          const performanceres = await PerformanceAxios.getPerformanceList();
          const count = await PerformanceAxios.getPerformancePage(0, 1);
          const pageList = await PerformanceAxios.getPerformancePageList(
            currentPage,
            1
          );
          if (performanceres.status === 200) {
            setPerformanceList(performanceres.data);
            console.log("performanceres.data : ", performanceres.data);
            setTotalPage(count.data);
            setPageList(pageList.data);
            // 공연 id에 해당하는 티케터 리스트 반환
            const purchaseCount = [];

            for (const performance of performanceres.data) {
              if (performance.performanceId) {
                const res = await PerformanceAxios.getTicketList(
                  performance.performanceId
                );
                purchaseCount.push({
                  id: performance.performanceId,
                  data: res.data.length,
                });
                // console.log("공연 데이터", res.data.length);
              } else {
                console.error("공연 ID가 null입니다.", performance);
              }
            }

            setPurchaseCount(purchaseCount);
            console.log("purchaseCount : ", purchaseCount);
          }
          break;
        default:
          break;
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 페이지 클릭 이벤트
  const handlePageChange = (number) => {
    console.log(number);
    setCurrentPage(number - 1);
  };

  const renderPagination = () => {
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
  // 관리자 체크
  useEffect(() => {
    const isAdmin = async () => {
      try {
        const res = await SignUpAxios.checkAddmin();
        // console.log("어드민?", res);
        if (res.data === true) {
          getData();
        } else {
          window.localStorage.clear();
          useanvigate("/");
        }
      } catch (e) {
        console.log(e);
        // useanvigate("/");
      }
    };

    isAdmin();
  }, [selectedButton, currentPage]);

  return (
    <>
      <Container>
        <SideMenu>
          <button
            style={{
              backgroundColor:
                selectedButton === "User" ? "var(--mainsky)" : "",
            }}
            onClick={() => reset("User")}
          >
            User
          </button>
          <button
            style={{
              backgroundColor:
                selectedButton === "Music" ? "var(--mainsky)" : "",
            }}
            onClick={() => reset("Music")}
          >
            Music
          </button>
          <button
            style={{
              backgroundColor:
                selectedButton === "Performance" ? "var(--mainsky)" : "",
            }}
            onClick={() => reset("Performance")}
          >
            Performance
          </button>
          <button
            style={{
              backgroundColor:
                selectedButton === "Point" ? "var(--mainsky)" : "",
            }}
            onClick={() => reset("Category")}
          >
            Category
          </button>
        </SideMenu>
        <InfoBox>
          <div className="top">
            <div className="left">
              <div className="title">{selectedButton + selectGraph}</div>
              <div className="count">
                {/* Total a {4230} {selectedButton} */}
              </div>
            </div>
            <div className="right">
              <div className="buttonzone">
                <button
                  style={{ backgroundColor: "white", color: "var(--mainblue)" }}
                >
                  Export Excel
                </button>
              </div>
              <div className="buttonzone">
                <button onClick={onClick}>Graph1</button>
                <button onClick={onClick}>Graph2</button>
              </div>
            </div>
          </div>
          <div className="info">
            <UserList
              selectedButton={selectedButton + selectGraph}
              male={male}
              female={female}
              userList={pageList}
              userDataList={userDataList}
              userAgeList={userAgeList}
            ></UserList>
            <MusicList
              selectedButton={selectedButton + selectGraph}
              pageList={pageList}
              musicList={musicList}
            ></MusicList>
            {selectedButton === "Category" && <Category />}
            <PerformanceList
              selectedButton={selectedButton + selectGraph}
              performanceList={performanceList}
              pageList={pageList}
              purchaseCount={purchaseCount}
            ></PerformanceList>
          </div>
          {renderPagination()}
        </InfoBox>
      </Container>
    </>
  );
};
export default AdminPage;
