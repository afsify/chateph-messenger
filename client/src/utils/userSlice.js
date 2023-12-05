import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authorized: false,
  },
  reducers: {
    userLogin(state) {
      state.authorized = true;
    },
    userLogout(state) {
      state.authorized = false;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
