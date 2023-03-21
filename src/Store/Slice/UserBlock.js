import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  block: null,
};

export const userBlockSlice = createSlice({
  name: "userBlock",
  initialState,
  reducers: {
    setBlock: (state, action) => {
      state.block = action.payload.block;
    },
    setUnblock: (state, action) => {
      state.block = null;
    },
  },
});

export const { setBlock, setUnblock } = userBlockSlice.actions;

export default userBlockSlice.reducer;
