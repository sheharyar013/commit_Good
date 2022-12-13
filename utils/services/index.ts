import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { Login } from "../../routes/routes";
import { ResponseCodes } from "../../constants/response-codes";
import { baseUrlAPI } from "./end-points";
import { toast } from "react-toastify";
import { toasterMessages } from "../../constants/messages";

const api = axios.create({
  baseURL: baseUrlAPI,
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.headers) {
    config.headers.common["Content-Type"] = "application/json";
    config.headers.common["X-Requested-With"] = "XMLHttpRequest";
    if (window.localStorage.getItem("access_token")) {
      config.headers.common["access_token"] =
        window.localStorage.getItem("access_token");
      config.headers.common["token"] =
        window.localStorage.getItem("access_token");
    }
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data?.success === false) {
      toast.error(response?.data?.message ?? toasterMessages.serverError, {
        toastId: "serverError",
      });
      throw new Error(response.data?.message ?? toasterMessages.serverError);
    }
    return response.data;
  },
  (error: AxiosError<any>) => {
    toast.error(error?.response?.data?.message ?? toasterMessages.serverError, {
      toastId: "serverError",
    });
    if (error.response?.status === ResponseCodes.unAuthorized) {
      window.localStorage.clear();
      window.location.replace(Login);
    }
    return Promise.reject(error);
  }
);

export { api };
