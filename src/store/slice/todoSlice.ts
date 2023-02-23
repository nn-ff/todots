import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEdit, ITodo } from "../../types/types";

interface TodoState {
  todo: ITodo[];
}

const initialState: TodoState = {
  todo: [],
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    todoAdd: (state, action:PayloadAction<ITodo>) => {
      state.todo = [...state.todo, action.payload]
    },
    todoRemove: (state, action: PayloadAction<number>) => {
      const removeItem = state.todo.filter((item) => item.id !== action.payload)
      state.todo = removeItem
    },
    todoComplete: (state, action: PayloadAction<number>) => {
      const todoComplete = state.todo.find((item) => item.id === action.payload)
      if (todoComplete) {
        todoComplete.isComplete = !todoComplete.isComplete
      }
    },
    todoEdit: (state, action: PayloadAction<IEdit>) => {
      const todoComplete = state.todo.find((item) => item.id === action.payload.id)
      if (todoComplete) {
        todoComplete.body = action.payload.body
      }
    },
    hideCompleted: (state) => {
      let sorted = state.todo.filter((obj) => obj.isComplete === false)
      state.todo = [...sorted]
    }
  }
})

export const {todoAdd, todoRemove, todoComplete, todoEdit, hideCompleted} = todoSlice.actions

export default todoSlice.reducer