import axios from "axios";

const userBaseUrl = import.meta.env.VITE_USER_URL;
const adminBaseUrl = import.meta.env.VITE_ADMIN_URL;

const createAxiosClient = (baseURL) => {
  const client = axios.create({
    baseURL,
    timeout: 10000,
    timeoutErrorMessage: "Request Timeout , Please Try Again",
  });
  return client;
};

const attachToken = (req, token) => {
  let authToken = localStorage.getItem(token);
  if (authToken) {
    req.headers.Authorization = `Bearer ${authToken}`;
  }
  return req;
};

const userAxiosInstance = createAxiosClient(userBaseUrl);
userAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "userToken");
  return modifiedReq;
});

const adminAxiosInstance = createAxiosClient(adminBaseUrl);
adminAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "adminToken");
  return modifiedReq;
});

export { userAxiosInstance, adminAxiosInstance };
