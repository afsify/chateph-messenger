import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    authorized: false,
  },
  reducers: {
    adminLogin(state) {
      state.authorized = true;
    },
    adminLogout(state) {
      state.adminToken = "";
      state.authorized = false;
    },
  },
});

export const adminActions = adminSlice.actions;
export default adminSlice;
