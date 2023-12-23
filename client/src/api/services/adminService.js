import { adminAxiosInstance } from "../axios";

//? ============================================= Authorization =============================================

export const adminLogin = (values) => {
  return adminAxiosInstance.post("/signin", values);
};

export const getAdmin = () => {
  return adminAxiosInstance.get("/get-admin");
};

//? ============================================== User Manage ==============================================

export const listUser = () => {
  return adminAxiosInstance.get("/list-user");
};

export const blockUser = (userId) => {
  return adminAxiosInstance.post(`/block-user/${userId}`);
};

export const unblockUser = (userId) => {
  return adminAxiosInstance.post(`/unblock-user/${userId}`);
};
