import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TodoType } from "../components/todos/TodosList";

export interface TodoListState {
  value: TodoType[];
}

const initialState: TodoListState = {
  value: [],
};

export const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    setInitialTodoList: (state, action: PayloadAction<TodoType[]>) => {
      state.value = action.payload;
    },
    addTodo: (state, action: PayloadAction<TodoType>) => {
      state.value = [...state.value, action.payload];
      return;
    },
    updateTodo: (state, action: PayloadAction<TodoType>) => {
      const targetIndex = state.value.findIndex((el) => el.id === action.payload.id);
      state.value[targetIndex] = action.payload;
      return;
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const targetId = action.payload;
      state.value = state.value.filter((el) => el.id !== targetId);
      return;
    },
  },
});

export const { setInitialTodoList, addTodo, updateTodo, deleteTodo } = todoListSlice.actions;

export default todoListSlice.reducer;
