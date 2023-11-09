import { axiosWithoutToken } from "@/utils/axios";
import { TUser } from "@/types";

class AuthServiceClass {
  signUp(payload: TUser) {
    return axiosWithoutToken.post("/auth/sign-up", {
      ...payload,
    });
  }

 
  signIn(payload:{email: string, password: string}) {
    return axiosWithoutToken.post("/auth/sign-in", {
      ...payload,
    });
  }


}

const AuthService = new AuthServiceClass();

export default AuthService;
