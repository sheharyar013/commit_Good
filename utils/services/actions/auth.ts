import {
  ALL_REGISTERED_EMAILS,
  Login,
  SignUp,
  GET_USER_DETAILS,
  UPDATE_USER,
  FORGET_PASSWORD_API,
  RESET_PASSWORD_API,
  GET_NFT_PRICE,
} from "../end-points";

import { api } from "..";
import { IUserDetails } from "../../../interfaces/user";
import { toast } from "react-toastify";
import { getSessionUser } from "../../auth";
import { PROFILE_UPDATE } from "../../../constants/constants";
import axios from "axios";

export const loginUser = (
  data: { email: string; password: string } | { uuid: string } | FormData
) => api.post(Login, { ...data });

export const getAllRegisteredEmails = () => api.get(ALL_REGISTERED_EMAILS);

export const registerUser = (data: any) => api.post(SignUp, data);

export const getUserDetails = () => api.get<IUserDetails>(GET_USER_DETAILS);

export const getNFTPrice = () => axios.get(GET_NFT_PRICE);

export const updateUserDetails = (
  data:
    | {
        name: string;
        email: string;
        address_line1: string;
        address_line2?: string;
        address_city: string;
        address_state: string;
        address_country: string;
        address_zip?: number | string;
        password?: string;
        password_confirmation?: string;
      }
    | FormData,
    showSuccess = true
) =>
  api.post(UPDATE_USER, data).then((res: any) => {
    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        ...getSessionUser(),
        profile_image: res.image_url,
        wallet_status: res?.wallet_status ?? 0,
      })
    );
    if (showSuccess) {
      toast.info("User Details Updated", {
        toastId: "profile-update",
      });
    }
    window.dispatchEvent(new CustomEvent(PROFILE_UPDATE, { detail: res }));
  });

export const forgetPasswordRequest = (email: string) =>
  api.get(FORGET_PASSWORD_API, {
    params: {
      email,
    },
  });

export const resetPasswordRequest = (data: {
  password: string;
  password_confirmation: string;
  token: string;
}) => api.post(RESET_PASSWORD_API, data);
