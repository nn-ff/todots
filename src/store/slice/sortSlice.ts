import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEdit, ITodo } from "../../types/types";

interface sortState {
  showCompleted: boolean;
}

const initialState: sortState = {
  showCompleted: true,
}

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    hideCompleted: (state) => {
      state.showCompleted = !state.showCompleted
    },
  }
})

export const {hideCompleted} = sortSlice.actions

export default sortSlice.reducer