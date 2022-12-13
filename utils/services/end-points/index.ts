import * as NFT_ENDPOINTS from "./nft";
export const baseUrlAPI = process.env.NEXT_PUBLIC_BASE_URL;
const walletBaseUrl = process.env.NEXT_PUBLIC_WALLET_API_URL;
const walletAddress = process.env.NEXT_PUBLIC_WALLET_ADDRESS;
const proxyUrl = process.env.NEXT_PUBLIC_PROXY_URL;

export const Login = `/api/v1/users/sign_in`;
export const SignUp = `/api/v1/users/sign_up`;
export const FORGET_PASSWORD_API = `/api/v1/forget_password`;
export const RESET_PASSWORD_API = `/api/v1/update_password`;
export const GetCampaigns = `/api/v1/campaigns`;
export const GetCountries = `/api/v1/countries`;
export const GetWalletTokens = `${proxyUrl}/${walletBaseUrl}/v2/wallets/${walletAddress}/tokens`;

export const AreasOfInterestEndPoint = `/api/v1/area_of_interest`;
export const ProjectCoordinatorsEndPoint = `/api/v1/project_coordinators`;

export const ADD_CAMPAIGN_ENDPOINT = `/api/v1/campaigns`;

export const POST_MESSAGE = `/api/v1/messages`;
export const POST_GROUP_MESSAGE = `/api/v1/group_message`;
export const GET_CHAT_USERS = `/api/v1/users`;

/**
 *
 * @param {string|number} receiver_id
 * @returns {string}
 */
export const GET_CHAT_HISTORY = (receiver_id: string | number): string =>
  `/api/v1/messages/${receiver_id}`;

export const CREATE_CHAT_ROOM = `/api/v1/chatrooms`;

export const GET_CHAT_ROOMS = `/api/v1/chatrooms`;
/**
 *
 * @param {string|number} chatroom_id
 * @returns {string}
 */
export const GET_CHATROOM_HISTORY = (chatroom_id: string | number): string =>
  `/api/v1/messages?chatroom_id=${chatroom_id}`;
export const GET_USERS_FOR_GROUP_CHAT = `/api/v1/users`;

/**
 *
 * @param {string|number} chatroom_id
 * @param {string|number|string[]|number[]} user_ids
 * @returns {string}
 */
export const ADD_USER_TO_CHAT_GROUP = (
  chatroom_id: string | number,
  user_ids: string | number | string[] | number[]
): string =>
  `/api/v1/add_users?chatroom_id=${chatroom_id}&user_ids=${
    Array.isArray(user_ids) ? user_ids.join(",") : user_ids
  }`;
/**
 *
 * @param {string|number} chatroom_id
 * @param {string|number|string[]|number[]} user_ids
 * @returns {string}
 */
export const REMOVE_USER_FROM_CHAT_GROUP = (
  chatroom_id: string | number,
  user_ids: string | number | string[] | number[]
): string =>
  `/api/v1/remove_users?chatroom_id=${chatroom_id}&user_ids=${
    Array.isArray(user_ids) ? user_ids.join(",") : user_ids
  }`;

export const CHAT_UNREAD_COUNT = `/api/v1/unread_messages`;

export const GET_CAMPAIGN_VOLUNTEERS = (campaign_id: string | number): string =>
  `/api/v1/campaigns/${campaign_id}`;

export const APPLY_FOR_VOLUNTEER = `/api/v1/volunteer_applier`;
export const CLEAR_HOURS = `/api/v1/campaign_check_in_histories`;
export const ALL_REGISTERED_EMAILS = `/api/v1/all_emails`;
export const CAMPAIGN_TOGGLE_COMPLETION = (id: string | number) =>
  `/api/v1/update_status?id=${id}`;

export const VOLUNTEER_TASKS = `/api/v1/tasks`;

export const GET_USER_DETAILS = `/api/v1/user_detail`;
export const UPDATE_USER = `api/v1/update_user`;

export const GET_CAMPAIGN_BY_ID = (campaign_id: string | number) =>
  `/api/v1/campaigns/${campaign_id}?get_campaign=true`;

export const GET_NFT_PRICE = `https://www.biconomy.com/api/v1/ticker/GOOD_USDT`;

export const GET_PAID_STATUS = (
  campaign_id: string | number,
  volunteer_id: string | number
) =>
  `/api/v1/volunteer_applier_paid?campaign_id=${campaign_id}&volunteer_id=${volunteer_id}`;

export const ADD_DONATE_TOKENS = `/api/v1/transactions`;

export { NFT_ENDPOINTS };
