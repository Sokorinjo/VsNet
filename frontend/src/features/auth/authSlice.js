import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
  name: "auth",
  initialState: {
    // user: null, 
    token: null,
    currentId: null,
    username: null
  },
  reducers: {
    setCredentials: (state, action) => {
      const { currentId, accessToken, username } = action.payload;
      state.token = accessToken
      state.currentId = currentId
      state.username = username
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


export const selectCurrenToken = (state) => state.auth.token;
export const selectCurrentUsername = (state) => state.auth.username
export const selectCurrentUserId = (state) => state.auth.currentId
// export const selectCurrenUser = (state) => state.auth.user;
export default authSlice.reducer;

