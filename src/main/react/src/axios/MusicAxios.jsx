import axios from "axios";
import { CHORD8_DOMAIN, Interceptor } from "../utils/Common";

const MusicAxiosApi = {
  //음악 목록 조회
  getAllMusic: async () => {
    console.log("음악 리스트 조회 AxiosApi 작동");
    return await axios.get(CHORD8_DOMAIN + `/music/musiclist`);
  },

  //음악 상세 정보 조회
  getMusicById: async (id) => {
    console.log("음악 상세 조회 AxiosApi 작동");
    return await axios.get(CHORD8_DOMAIN + `/music/detail/${id}`);
  },

  //음악 검색 기능
  searchMusic: async (keyword) => {
    console.log("음악 검색 조회 AxiosApi 작동");
    return await axios.get(CHORD8_DOMAIN + `/music/search/${keyword}`);
  },

  //음악 등록 엔드포인트(메모: post등록 방식 axios 까먹지말것..)
  addMusic: async (
    inputSingName,
    inputSinger,
    inputComposer,
    inputLyricist,
    selectedGenre,
    inputSingInfo,
    inputLyrics,
    url,
    inputfile
  ) => {
    console.log("음악 등록 AxiosApi 작동");
    const currentdate = new Date();
    const musicDTO = {
      musicDTO: {
        composer: inputComposer,
        genre: selectedGenre,
        lyricist: inputLyricist,
        lyrics: inputLyrics,
        musicInfo: inputSingInfo,
        musicTitle: inputSingName,
        promoImage: url,
        purchaseCount: 0,
        releaseDate: currentdate,
        thumbnailImage: url,
        musicFile: inputfile,
      },
      userReqDto: {
        userNickname: inputSinger,
      },
      userResDto: {
        userNickname: inputSinger,
      },
    };
    const accessToken = localStorage.getItem("accessToken");
    return await Interceptor.post(CHORD8_DOMAIN + `/music/new`, musicDTO, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  //음악 좋아요 추가*제거
  musicHeart: async (musicId, heartChecker) => {
    console.log("음악 좋아요 추가 AxiosApi 작동");
    const musicHeartDto = {
      musicId: musicId,
      userEmail: heartChecker,
    };
    const accessToken = localStorage.getItem("accessToken");
    return await Interceptor.post(
      CHORD8_DOMAIN + `/musiclike/like`,
      musicHeartDto,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },

  // 음악 댓글 등록.

  musicCommentRegister: async (musicId, content, userEmail) => {
    console.log("음악 댓글 등록 AxiosApi 작동");
    const musiccomment = {
      musicId: musicId,
      content: content,
      userEmail: userEmail,
    };
    const accessToken = localStorage.getItem("accessToken");
    return await Interceptor.post(
      CHORD8_DOMAIN + `/musiccomment/new`,
      musiccomment,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },

  // 음악별 댓글 조회.
  musicCommentList: async (musicId) => {
    return await axios.get(CHORD8_DOMAIN + `/musiccomment/list/${musicId}`);
  },

  //댓글 삭제
  musicCommentDelete: async (musicCommentId) => {
    const accessToken = localStorage.getItem("accessToken");
    return await Interceptor.delete(
      CHORD8_DOMAIN + `/musiccomment/delete/${musicCommentId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },

  //음악 구매
  purchaseMusic: async (musicId) => {
    const accessToken = localStorage.getItem("accessToken");

    console.log("음악 구매 AxiosApi 작동", accessToken);
    const musicpurchase = {
      musicDTO: {
        id: musicId,
      },
      token: accessToken,
    };
    return await Interceptor.post(
      CHORD8_DOMAIN + `/music/purchase`,
      musicpurchase,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },

  //음악 페이지 수 조회

  getMusicPage: async (page, size) => {
    console.log("음악페이지수조회 AxiosApi 작동");
    return await axios.get(
      CHORD8_DOMAIN + `/music/list/count?page=${page}&size=${size}`
    );
  },

  //음악 페이지네이션 조회
  getMusicList: async (page, size) => {
    console.log("음악페이지네이션조회 AxiosApi 작동");
    return await axios.get(
      CHORD8_DOMAIN + `/music/list/page?page=${page}&size=${size}`
    );
  },
};

export default MusicAxiosApi;
