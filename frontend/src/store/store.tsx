import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import todoListReducer from "./todoListSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todoList: todoListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
