import axios from 'axios';
import Common from "../utils/Common";
import { CHORD8_DOMAIN, Interceptor } from "../utils/Common";

const PerformanceAxios = {
    // 공연 목록 조회
    getPerformanceList: async () => {
      console.log("공연목록조회 AxiosApi 작동")
        return await axios.get(CHORD8_DOMAIN + `/performance/list`);
    },

     // 공연 페이지 수 조회
  getPerformancePage: async (page, size) => {
    console.log("공연페이지수조회 AxiosApi 작동")
    return await axios.get(
      CHORD8_DOMAIN + `/performance/list/count?page=${page}&size=${size}`
    );
  },

    // 공연 페이지네이션 조회
    getPerformancePageList: async (page, size) => {
      console.log("공연페이지네이션조회 AxiosApi 작동")
      return await axios.get(
        CHORD8_DOMAIN + `/performance/list/page?page=${page}&size=${size}`
      );
    },

    //공연 등록
setPerformance: async (performance) => {
  const accessToken = Common.getAccessToken(); 
  return axios.post(CHORD8_DOMAIN + `/performance/new`, performance, { 
    headers: {
      Authorization: `Bearer ${accessToken}` 
    }
  });
},

    // 전체유저조회
    getUserList: async () => {
      const accessToken = Common.getAccessToken();
      console.log("전체유저조회 AxiosApi 작동")
      return await Interceptor.get(
        CHORD8_DOMAIN + `/performance/userList`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      );
    },

 // 전체유저조회, 토큰없이
 getUserListNoToken: async () => {
  console.log("전체유저조회 AxiosApi 작동")
  return await axios.get(
    CHORD8_DOMAIN + `/performance/userListNoToken`);
},

    // 이메일로 유저정보 조회
    getUser: async (email) => {
      const accessToken = Common.getAccessToken();
      console.log("이메일로 유저정보조회 AxiosApi 작동")
      return await Interceptor.get(
        CHORD8_DOMAIN + `/performance/userByEmail?email=${email}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      );
    },

    // 전체공연자조회
    getPerformerList: async () => {
      const accessToken = Common.getAccessToken();
      console.log("전체공연자조회 AxiosApi 작동")
      return await Interceptor.get(
        CHORD8_DOMAIN + `/performer/list`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      );
    },

    // 공연 삭제
    deletePerformance: async (performanceId) => {
      const accessToken = Common.getAccessToken();
      console.log("공연삭제 AxiosApi 작동")
      return await Interceptor.delete(
        CHORD8_DOMAIN + `/performance/delete/${performanceId}`, { 
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      );
    },

    //공연 구매
    purchaseTicket: async (performanceId, email, count, price, totalPrice) => {
      const accessToken = Common.getAccessToken();
      console.log("공연구매 AxiosApi 작동")
      return await Interceptor.post(
        CHORD8_DOMAIN + `/ticketer/new`, {
          performanceId,
          email,
          count,
          price,
          totalPrice
        },{
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      );
    },

    // 공연 구매자조회
    getTicketList: async (performanceId) => {
      const accessToken = Common.getAccessToken();
      console.log("공연구매자조회 AxiosApi 작동")
      return await Interceptor.get(
        CHORD8_DOMAIN + `/ticketer/list/${performanceId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      );
    },

    // //공연등록닉네임 조회
    // getPerformerNick: async () => {
    //   console.log("공연등록닉네임조회 AxiosApi 작동")
    //   return await axios.get(
    //     CHORD8_DOMAIN + `/auth/`
    //   );
    // },
  };

export default PerformanceAxios;