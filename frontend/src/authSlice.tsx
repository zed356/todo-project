import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isAuth: boolean;
  userId: string;
}

const initialState: AuthState = {
  isAuth: false,
  userId: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
