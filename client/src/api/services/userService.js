import { userAxiosInstance } from "../axios";

//? ============================================= Authorization =============================================

export const userStart = (values) => {
  return userAxiosInstance.post("/start", values);
};

export const getUser = () => {
  return userAxiosInstance.get("/get-user");
};

export const findUser = (searchTerm) => {
  return userAxiosInstance.get(`/find-user?search=${searchTerm}`);
};

//? ================================================= Chat =================================================

export const accessChat = (values) => {
  return userAxiosInstance.post("/access-chat", values);
};

export const fetchChat = () => {
  return userAxiosInstance.get("/fetch-chat");
};

//? ================================================ Message ================================================

export const listMessage = (chatId) => {
  return userAxiosInstance.get(`/list-message/${chatId}`);
};

export const sendMessage = (values) => {
  return userAxiosInstance.post("/send-message", values);
};
