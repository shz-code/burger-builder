import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.userId = action.payload.localId;
      state.email = action.payload.email;
    },
    setLocalStorage: (state, action) => {
      // Set LocalStorage
      localStorage.setItem(
        "auth",
        JSON.stringify({
          userId: action.payload.localId,
          email: action.payload.email,
          expiresIn: new Date(
            new Date().getTime() + action.payload.expiresIn * 1000
          ),
        })
      );
    },
    userLoggedOut: (state) => {
      state.userId = undefined;
      state.email = undefined;
      // Remove local storage
      localStorage.removeItem("auth");
    },
  },
});

export const { userLoggedIn, userLoggedOut, setLocalStorage } =
  authSlice.actions;
export default authSlice.reducer;
