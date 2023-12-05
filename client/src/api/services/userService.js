import { userAxiosInstance } from "../axios";

//? ============================================= Authorization =============================================

export const userLogin = (values) => {
  return userAxiosInstance.post("/login", values);
};

export const sendOTP = (values) => {
  return userAxiosInstance.post("/send-otp", values);
};

export const verifyOTP = (values) => {
  return userAxiosInstance.post("/verify-otp", values);
};

export const getUser = () => {
  return userAxiosInstance.get("/get-user");
};

//? ============================================ Forget Password ============================================

export const forgotPassword = (values) => {
  return userAxiosInstance.post("/forgot-password", values);
};

export const checkOTP = (values) => {
  return userAxiosInstance.post("/check-otp", values);
};

export const resetPassword = (values) => {
  return userAxiosInstance.post("/reset-password", values);
};

//? ================================================ Profile ================================================

export const updateProfile = (values) => {
  return userAxiosInstance.post("/update-profile", values);
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

export const createGroup = (values) => {
  return userAxiosInstance.post("/create-group", values);
};

export const editGroup = (chatId, values) => {
  return userAxiosInstance.post(`/edit-group/${chatId}`, values);
};

export const groupRemove = (values) => {
  return userAxiosInstance.put("/group-remove", values);
};

export const groupAdd = (values) => {
  return userAxiosInstance.put("/group-add", values);
};

//? ================================================ Message ================================================

export const listMessage = (chatId) => {
  return userAxiosInstance.get(`/list-message/${chatId}`);
};

export const sendMessage = (values) => {
  return userAxiosInstance.post("/send-message", values);
};
