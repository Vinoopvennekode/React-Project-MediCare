import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  name: null,
  id:null,
  token: null,
};

export const DoctorLoginSlice = createSlice({
  name: "doctorLogin",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.name = action.payload.name;
      state.id=action.payload.id
      state.token = action.payload.token;
    },
    setLogout: (state, action) => {
      state.user = null;
      state.name = null;
      state.id=null
      state.token = null;
    },
  },
});

export const { setLogin, setLogout } = DoctorLoginSlice.actions;
export default DoctorLoginSlice.reducer;
