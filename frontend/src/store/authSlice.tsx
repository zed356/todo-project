import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

export interface AuthState {
  isAuth: boolean;
  userId: string;
  authHeader: { "x-access-token": string } | {};
}

const initialState: AuthState = {
  isAuth: false,
  userId: "",
  authHeader: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuth = true;
      const token = action.payload;
      localStorage.setItem("jwt", JSON.stringify(token));
      const decoded: { userId: string } = jwtDecode(token);
      state.authHeader = { "x-access-token": token };
      state.userId = decoded.userId;
    },
    logout: (state) => {
      state.isAuth = false;
      localStorage.removeItem("jwt");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
