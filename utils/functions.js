/**
 *
 * @param {string} string
 * @returns {string}
 */
import { CheckIfGetParamExistsInUrl } from "./check-get-param-exists";
import axios from "axios";
import { baseUrlAPI } from "../utils/services/end-points";

const capitalizeFirstLetter = (string) => {
  return `${string.slice(0, 1).toUpperCase()}${string.slice(1)}`;
};
/**
 *
 * @param {string} string
 * @returns {string}
 */
const capitalizeFirstLetterAndSplitByUnderscore = (string) => {
  return `${string.slice(0, 1).toUpperCase()}${string.slice(1)}`
    .split("_")
    .join(" ");
};

const getGlobalIdUserDetails = async (code, fromLogin = false) => {
  const [client_id, client_secret] = [
    "15c0a458-92c5-409a-b935-9922eac52b6f",
    "5328518a845f4c1ea1129ef1bff25524",
  ];
  const globalCode = CheckIfGetParamExistsInUrl("code");
  const redirectUri = fromLogin
    ? process.env.NEXT_PUBLIC_GLOBAL_LOGIN_REDIRECT
    : process.env.NEXT_PUBLIC_GLOBAL_REDIRECT;

  return axios.get(`${baseUrlAPI}/api/v1/access_token`, {
    params: {
      grant_type: "authorization_code",
      client_id,
      client_secret,
      redirect_uri: redirectUri,
      code: globalCode ?? code,
    },
  });
};

/**
 * @param {string} type
 */
const checkIfRemovingUserInChat = (type) => type === "removeuser";

/**
 * @param {(string|number)?} prefix
 * @return {string|number}
 */

const uniqueId = (prefix = null) =>
  prefix ? `${prefix}${Math.random()}` : Math.random();

export {
  capitalizeFirstLetter,
  capitalizeFirstLetterAndSplitByUnderscore,
  getGlobalIdUserDetails,
  checkIfRemovingUserInChat,
  uniqueId,
};

/**
 * @param {string} url
 * @param {"twitter"| "facebook"|"pinterest"|"linkedin"} type
 */
export const shareViaSocial = (url, type) => {
  let urlToOpen;
  switch (type) {
    case "twitter":
      urlToOpen = `https://twitter.com/intent/tweet?text=Commit+Good+Project&url=${url}`;
      break;
    case "facebook":
      urlToOpen = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
    case "pinterest":
      urlToOpen = `https://pinterest.com/pin/create/button/?url=${url}&media=&description=`;
      break;
    case "linkedin":
      urlToOpen = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;
      break;
    default:
      urlToOpen = url;
  }
  window.open(urlToOpen, "_blank");
};

/**
 *
 * @param {keyof USER_WALLET_STATUS} status
 * @returns {string}
 */
export const GetUserWalletStatusValueMessage = (status) => {
  switch (status) {
    case "Unverified":
      return "Your profile is incomplete, please update your profile by providing your wallet address";
    case "Pending":
      return "Your profile verification is under process, please wait until it is approved to interact with NFTs";
    case "Approved":
      return "Your profile is complete, you can create and buy NFTs";
    default:
      return "";
  }
};
