import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  authChecked: false, // 🔹 Tracks if we've checked auth
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
      state.authChecked = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.authChecked = true;
    },
  },
});

export const { setUserDetails, clearUser } = userSlice.actions;
export default userSlice.reducer;
