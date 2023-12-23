import userSlice from "./userSlice";
import adminSlice from "./adminSlice";
import alertSlice from "./alertSlice";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  admin: adminSlice.reducer,
  alerts: alertSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
