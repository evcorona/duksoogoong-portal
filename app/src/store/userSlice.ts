import { createSlice } from "@reduxjs/toolkit";

export interface IPayload {
  userId: string;
  role: "student" | "tutor" | "teacher" | "admin" | "main" | "schoolAdmin";
  isInitialSetup: string;
  schoolId: string;
}

const initialState = {
  schoolId: "",
  role: "",
  userId: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState: () => {
      const token = sessionStorage.getItem("DSG");
      if (!token) return;

      const tokenPayload = JSON.parse(atob(token.split(".")[1])) as IPayload;

      return {
        schoolId: tokenPayload.schoolId,
        role: tokenPayload.role,
        userId: tokenPayload.userId,
      };
    },
    clearUserState: () => {
      sessionStorage.removeItem("DSG");

      return initialState;
    },
  },
});

export const { setUserState, clearUserState } = userSlice.actions;

export default userSlice.reducer;
