import { createSlice } from "@reduxjs/toolkit";

export interface IPayload {
  userId: string;
  role: "student" | "tutor" | "teacher" | "admin" | "main";
  isInitialSetup: string;
  schoolId: string;
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    schoolId: "",
    role: "",
    userId: "",
  },
  reducers: {
    setUserState: () => {
      const token = sessionStorage.getItem("DSG");
      if (!token) return;

      const tokenPayload = JSON.parse(atob(token.split(".")[1])) as IPayload;

      return tokenPayload;
    },
    clearUserState: () => {
      sessionStorage.removeItem("DSG");

      return { schoolId: "", role: "", userId: "" };
    },
  },
});

export const { setUserState, clearUserState } = userSlice.actions;

export default userSlice.reducer;
