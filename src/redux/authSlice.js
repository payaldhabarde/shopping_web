import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user") || "null");
const token = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: { user, token },
  reducers: {
    setAuth(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
