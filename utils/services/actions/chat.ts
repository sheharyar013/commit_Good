import {
  ADD_USER_TO_CHAT_GROUP,
  CHAT_UNREAD_COUNT,
  CREATE_CHAT_ROOM,
  GET_CHATROOM_HISTORY,
  GET_CHAT_HISTORY,
  GET_CHAT_ROOMS,
  GET_CHAT_USERS,
  GET_USERS_FOR_GROUP_CHAT,
  POST_GROUP_MESSAGE,
  POST_MESSAGE,
  REMOVE_USER_FROM_CHAT_GROUP,
} from "../end-points";

import { AxiosResponse } from "axios";
import { api } from "..";

export const sendMessage = (data: any) =>
  api.post(POST_MESSAGE, data, {
    params: data,
  });
export const getChatUsers = () => api.get(GET_CHAT_USERS);
export const getChatHistory = (id: number | string) =>
  api.get(GET_CHAT_HISTORY(id));

// Chat Rooms

export const createChatRoom = (data: any) => api.post(CREATE_CHAT_ROOM, data);
export const getAllChatRooms = () => api.get(GET_CHAT_ROOMS);
/**
 *
 * @param {string} chatroom_id
 * @returns
 */
export const getChatRoomHistory = (chatroom_id: string) =>
  api.get(GET_CHATROOM_HISTORY(chatroom_id));
export const getUsersForChatRoom = () => api.get(GET_USERS_FOR_GROUP_CHAT);

export const postGroupMessage = (data: any) =>
  api.post(POST_GROUP_MESSAGE, data, {
    params: data,
  });

/**
 *
 * @param {string|number} chatroom_id
 * @param {string|number|string[]|number[]} user_ids
 * @returns
 */
export const addUsersToChatRoom = (
  chatroom_id: string | number,
  user_ids: string | number | string[] | number[]
) => api.get(ADD_USER_TO_CHAT_GROUP(chatroom_id, user_ids));

/**
 *
 * @param {string|number} chatroom_id
 * @param {string|number|string[]|number[]} user_ids
 * @returns
 */
export const removeUsersFromChatRoom = (
  chatroom_id: string | number,
  user_ids: string | number | string[] | number[]
) => api.delete(REMOVE_USER_FROM_CHAT_GROUP(chatroom_id, user_ids));

export const chatUnreadCountApi = () =>
  api.get<AxiosResponse<{ unread_messages: number }>>(CHAT_UNREAD_COUNT);
