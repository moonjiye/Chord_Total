import axios from "axios";
import Common from "../utils/Common";

const MemberInfoAxiosApi = {
  // 유저 정보 가져오기
  getUserInfo: async (email) => {
    const accessToken = Common.getAccessToken();

    return await axios.get(Common.DOMAIN + `/auth/infoByEmail?email=${email}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },
  // 유저 음원 가져오기
  getUserMusic: async (userId) => {
    const accessToken = Common.getAccessToken();

    return await axios.get(Common.DOMAIN + `/music/user/${userId}/music`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },
  // 유저 공연 가져오기
  getUserInfoByPerformanceEmail: async (email) => {
    const accessToken = Common.getAccessToken();

    return await axios.get(
      Common.DOMAIN + `/performance/infoByEmail?email=${email}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },
  // 포인트 충전
  increasePoints: async (email, points) => {
    const accessToken = Common.getAccessToken();

    return await axios.post(
      Common.DOMAIN + `/user/increasePoints`,
      {
        email: email,
        points: points.toString(), // points 값을 문자열로 변환
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },
  // 포인트 환전
  exchangePoints: async (email, points) => {
    const accessToken = Common.getAccessToken();

    return await axios.post(
      Common.DOMAIN + `/user/exchangePoints`,
      {
        email: email,
        points: points.toString(),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },
  // 채팅방 목록 보기
  chatList: async () => {
    const accessToken = Common.getAccessToken();

    return await axios.get(Common.DOMAIN + "/chat/room", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },
  // ownerId로 채팅방 목록 가져오기
  chatListByOwnerId: async (ownerId) => {
    const accessToken = Common.getAccessToken();

    return await axios.get(`${Common.DOMAIN}/chat/rooms/owner/${ownerId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },
  // 채팅방 정보 보기
  chatDetail: async (roomId) => {
    const accessToken = Common.getAccessToken();

    return await axios.get(Common.DOMAIN + `/chat/room/${roomId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },
  // 채팅방 생성
  chatCreate: async (email, name) => {
    const chat = {
      email: email,
      name: name,
    };
    const accessToken = Common.getAccessToken();

    return await axios.post(Common.DOMAIN + "/chat/new", chat, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },
  // 이전 채팅 가져오기
  recentChatLoad: async (roomId) => {
    const accessToken = Common.getAccessToken();

    return await axios.get(Common.DOMAIN + `/chat/message/${roomId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },
  // 채팅방 세션 수 가져오기
  chatSessionCount: async (roomId) => {
    const accessToken = Common.getAccessToken();

    return await axios.get(
      Common.DOMAIN + `/chat/room/${roomId}/sessioncount`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },
};

export default MemberInfoAxiosApi;
