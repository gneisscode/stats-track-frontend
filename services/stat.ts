import { axiosWithToken } from "@/utils/axios";


class StatServiceClass {
  createStat(payload: any) {
    //@ts-ignore
    return axiosWithToken().post("/stat/create", {
      ...payload,
    });
  }
  getAllStats() {
    //@ts-ignore
    return axiosWithToken().get("/stats");
  }
}

const StatService = new StatServiceClass();

export default StatService;
