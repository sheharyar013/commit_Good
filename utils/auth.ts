import { IUser } from "../interfaces/user";
export const isLoggedIn = () => {
  const token = localStorage.getItem("access_token");
  const user = localStorage.getItem("userInfo");
  return token && user;
};

export const getSessionUser = (): IUser | null => {
  let user = window.localStorage.getItem("userInfo");
  if (user) user = JSON.parse(user);
  return (user as unknown as IUser) ?? null;
};

export const getGlobalId = () => {
  return window.sessionStorage.getItem("globalId");
};

export const logoutSessionUser = () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("access_token");
  sessionStorage.removeItem("globalId");
};
