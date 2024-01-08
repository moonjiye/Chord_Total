import { ReactComponent as Prev } from "../../images/Prev.svg";
import { ReactComponent as Next } from "../../images/Next.svg";
import { ReactComponent as Text } from "../../images/write-svgrepo-com.svg";
import { ReactComponent as Image } from "../../images/image-svgrepo-com.svg";
import { ReactComponent as Video } from "../../images/video-camera-svgrepo-com.svg";
import {
  Pagination,
  MiddlePage,
  PageContant,
  PostContainer,
  PostList,
  PostListTitle,
  PostPage,
  PostSection,
  PostTable,
  TableBody,
  TableNormalRow,
  TableRow,
  TableRowDataDate,
  TableRowDataTitle,
  TableRowDataViews,
  TitleContent,
  TableRowDataWriter,
  Page,
  TableRowDataIcon,
} from "../../style/CommunityPostStyle";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Common from "../../utils/Common";
import CommunityRankComponent from "./CommunityRankComponent";
import axios from "axios";
import CommunityAxiosApi from "../../axios/CommunityAxios";
import SearchComponent from "./SearchComponent";

const CommunitySearchComponent = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalComments, setTotalComments] = useState([]);
  const location = useLocation();
  const result = location.state.result;
  const pageSize = 10;

  const checkMediaContent = (html) => {
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(html, "text/html");
    const imgTag = parsedHtml.querySelector("img");
    const videoTag = parsedHtml.querySelector("video");
    const iframeTag = parsedHtml.querySelector("iframe");

    return {
      image: imgTag !== null,
      video: videoTag !== null || iframeTag !== null, // iframe 태그 추가
    }; // 이미지 태그와 동영상 태그가 각각 있으면 true, 없으면 false를 반환
  };
  useEffect(() => {
    const postPage = async () => {
      setTotalPages();
    };

    postPage();
  }, [currentPage, pageSize]);
  useEffect(() => {
    const postList = async () => {
      try {
        console.log(result);

        setPosts(result.content);
        setTotalPages(result.totalPages);
        // 전체 댓글 수 조회
        const totalCommentsResponses = await Promise.all(
          result.content.map((post) =>
            CommunityAxiosApi.getTotalComments(post.id)
          )
        );
        const totalComments = totalCommentsResponses.map(
          (response) => response.data
        );
        setTotalComments(totalComments);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.log(error);
        }
      }
    };
    postList();
  }, [result, currentPage, pageSize, totalPages]);

  return (
    <>
      <PostContainer>
        <PostSection>
          <CommunityRankComponent categoryName={"검색된"} />
          <PostListTitle>
            <TitleContent>전체</TitleContent>
          </PostListTitle>
          <PostList>
            <PostTable>
              <TableBody>
                <TableRow>
                  <TableRowDataIcon></TableRowDataIcon>
                  <TableRowDataWriter>작성자</TableRowDataWriter>
                  <TableRowDataTitle>제목</TableRowDataTitle>
                  <TableRowDataDate>작성시간</TableRowDataDate>
                  <TableRowDataViews>조회수</TableRowDataViews>
                </TableRow>
                {posts.length > 0 ? (
                  posts.map((post) => {
                    const segments = post.ipAddress
                      ? post.ipAddress.split(".")
                      : "";
                    const ipAddress = segments
                      ? `${segments[0]}.${segments[1]}`
                      : "";
                    const hasMediaContent = checkMediaContent(post.content);
                    const writerInfo = post.email
                      ? post.email
                      : `${Common.truncateText(
                          post.nickName,
                          10
                        )}(${ipAddress})`;

                    return (
                      <TableNormalRow
                        key={post.id}
                        onClick={() => {
                          navigate(`/communitypage/detail/${post.id}`);
                        }}
                      >
                        <TableRowDataIcon>
                          {hasMediaContent.video ? (
                            <Video />
                          ) : hasMediaContent.image ? (
                            <Image />
                          ) : (
                            <Text />
                          )}
                        </TableRowDataIcon>
                        <TableRowDataWriter>{writerInfo}</TableRowDataWriter>
                        <TableRowDataTitle>
                          {Common.truncateText(post.title, 20)}{" "}
                          {totalComments[posts.indexOf(post)] > 0 &&
                            `(${totalComments[posts.indexOf(post)]})`}
                        </TableRowDataTitle>
                        <TableRowDataDate>
                          {Common.timeFromNow(post.regDate)}
                        </TableRowDataDate>
                        <TableRowDataViews>{post.viewCount}</TableRowDataViews>
                      </TableNormalRow>
                    );
                  })
                ) : (
                  <TableNormalRow>
                    <TableRowDataTitle>
                      검색된 결과가 없습니다
                    </TableRowDataTitle>
                  </TableNormalRow>
                )}
              </TableBody>
            </PostTable>
            <SearchComponent />
            <PostPage>
              <Pagination>
                <PageContant>
                  <Prev />
                </PageContant>
                <PageContant
                  onClick={() =>
                    setCurrentPage(currentPage > 1 ? currentPage - 1 : 0)
                  }
                  disabled={currentPage === 0}
                >
                  이전
                </PageContant>
              </Pagination>
              {/* for 문처럼 페이지를 생성하기 위해 Array 인스턴스 생성, _이건 아무의미없는값이고 서서히 늘어나는 현식 */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <MiddlePage
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum - 1)}
                    active={currentPage === pageNum ? "true" : "false"}
                  >
                    <Page selected={currentPage === pageNum - 1} href="#">
                      {pageNum}
                    </Page>
                  </MiddlePage>
                )
              )}
              <Pagination>
                <PageContant
                  onClick={() =>
                    setCurrentPage(
                      currentPage < totalPages - 1
                        ? currentPage + 1
                        : currentPage
                    )
                  }
                  disabled={currentPage === totalPages - 1}
                >
                  다음
                </PageContant>
                <PageContant>
                  <Next />
                </PageContant>
              </Pagination>
            </PostPage>
          </PostList>
        </PostSection>
      </PostContainer>
    </>
  );
};

export default CommunitySearchComponent;
