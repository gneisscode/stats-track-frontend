import { axiosWithToken } from "@/utils/axios";
import { TUser } from "@/types";

class UserServiceClass {
  UpdateUser(payload:{_id?: string} & Omit<TUser, 'password'|'organisation'| 'email'> ) {
    //@ts-ignore
    return axiosWithToken().put(`/user/${payload?._id}`, { ...payload });
  }
}

const UserService = new UserServiceClass();

export default UserService;
