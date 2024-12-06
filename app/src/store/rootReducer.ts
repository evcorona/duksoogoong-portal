import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "@/src/store/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
