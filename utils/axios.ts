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
  const { user } = useContext(Context);

  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.token}`,
    },
  });
};
