import { createSlice } from "@reduxjs/toolkit";

interface I_InitialState {
  value: number;
}

const initialState: I_InitialState = {
  value: 0,
};

const authSlice = createSlice({
  // Step 01: Give it a name
  name: "auth",

  // Step 02: Initialize it with the states

  initialState,

  // Step 03: Create reducers

  reducers: {
    increment: (state, action) => {
      state.value = state.value + action.payload;
    },
    decrement: (state, action) => {
      state.value = decrease(state.value, action.payload);
    },
  },
});

function decrease(n1: number, n2: number) {
  return n1 - n2;
}

// Step 04: Export the functions from the slice action
export const { increment, decrement } = authSlice.actions;

// Step 05: Export the reducer
export default authSlice.reducer;
