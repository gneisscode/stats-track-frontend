import { Context } from "@/context/Context";
import axios from "axios";
import { useContext } from "react";

const baseURL = "http://localhost:4000/api";

export const axiosWithoutToken = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

export const axiosWithToken = () => {
  let user
  if (process.browser){
    user = JSON.parse(localStorage.getItem("user") as any) || null;
    return axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    });

  }

  
};
