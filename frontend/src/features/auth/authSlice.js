import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
  name: "auth",
  initialState: {
    // user: null, 
    token: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken
      // state.user = user
      // localStorage.setItem('token', accessToken)
    },
    logout: (state, action) => {
      state.token = null;
      // state.user = null
      // localStorage.removeItem('token')
    }
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrenToken = (state) => state.auth.token;
// export const selectCurrenUser = (state) => state.auth.user;

