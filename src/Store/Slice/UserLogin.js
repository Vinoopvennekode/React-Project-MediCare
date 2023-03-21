import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  name: null,
  token: null,
  id:null,
  block:null
};

export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.name = action.payload.name;
      state.id=action.payload.id
      state.token = action.payload.token;
      state.block=action.payload.block
    },
    setLogout: (state, action) => {
      state.user = null;
      state.name = null;
      state.id=null;
      state.token = null;
      state.block=null
    },
  },
});

export const {setLogin,setLogout}=userLoginSlice.actions;

export default userLoginSlice.reducer;