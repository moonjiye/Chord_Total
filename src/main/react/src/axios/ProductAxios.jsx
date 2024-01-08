import axios from "axios";
import Common, { Interceptor } from "../utils/Common";

const BACK_DOMAIN = "";

const AxiosApi = {
  // 회원 정보 조회
  getUserList: async () => {
    try {
      return await axios.get(BACK_DOMAIN + "/auth/userList");
    } catch (error) {
      console.error("Error in getUserList:", error);
      throw error; // Re-throw the error for further handling if necessary
    }
  },

  // 상품 조회
  productGet: async () => {
    try {
      return await axios.get(BACK_DOMAIN + "/product/productlist");
    } catch (error) {
      console.error("Error in productGet:", error);
      throw error;
    }
  },

  // ID를 기준으로 상품을 찾음
  findProductById: async (id) => {
    try {
      const response = await axios.get(BACK_DOMAIN + `/product/${id}`);
      return response;
    } catch (error) {
      console.error("Error in findProductById:", error);
      throw error;
    }
  },

  // 뉴스 조회
  newsGet: async () => {
    try {
      return await axios.get(BACK_DOMAIN + "/news/newslist");
    } catch (error) {
      console.error("Error in newsGet:", error);
      throw error;
    }
  },

  // 물건 결제하기
  doPurchase: async (price) => {
    try {
      const accessToken = Common.getAccessToken();
      const productDto = {
        token: accessToken,
        productPrice: price,
      };
      return await Interceptor.post(
        BACK_DOMAIN + "/product/purchase",
        productDto,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      );
    } catch (error) {
      console.error("Error in doPurchase:", error);
      throw error;
    }
  },
};
export default AxiosApi;

export const getSearchedArtists = async (searchQuery) => {
  try {
    // console.log(searchQuery);s
    const response = await fetch(
      `${BACK_DOMAIN}/product/search?keyword=${searchQuery}`
    );

    if (!response.ok) {
      throw new Error("Network fail");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetching data failed:", error);
    throw error;
  }
};
