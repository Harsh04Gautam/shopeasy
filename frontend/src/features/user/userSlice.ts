import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { RootState } from "../../app/store";

export type User = {
  name: string;
  email: string;
  role: "user" | "admin";
  verified: boolean;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;
};

type InitialState = {
  user: User | null;
  accessToken: string | null;
  isLoggedIn: boolean;
};

const initialState: InitialState = {
  user: null,
  accessToken: null,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccessToken: (
      state,
      action: PayloadAction<{ accessToken: string | null }>
    ) => {
      const accessToken = action.payload.accessToken;
      if (accessToken) {
        state.user = jwtDecode(accessToken);
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
      } else {
        state.user = null;
        state.accessToken = null;
        state.isLoggedIn = false;
      }
    },

    logOut: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setAccessToken, logOut } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectAccessToken = (state: RootState) => state.user.accessToken;
export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;

export default userSlice.reducer;
