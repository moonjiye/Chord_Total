import Common from "../utils/Common";
import { CHORD8_DOMAIN, Interceptor } from "../utils/Common";

const AdminAxios = {
  getUserPage: async (page, size) => {
    const accessToken = Common.getAccessToken();
    return await Interceptor.get(
      CHORD8_DOMAIN + `/user/page?page=${page}&size=${size}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },
  getUserPageCount: async (page, size) => {
    const accessToken = Common.getAccessToken();
    return await Interceptor.get(
      CHORD8_DOMAIN + `/user/count?page=${page}&size=${size}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },

  deleteUser: async (id) => {
    const accessToken = Common.getAccessToken();
    return await Interceptor.get(CHORD8_DOMAIN + `/user/del?id=${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },
};

export default AdminAxios;
