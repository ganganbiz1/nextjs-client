import { createSlice } from "@reduxjs/toolkit";

export type User = {
  id: number | null;
  userName: string | null;
  email: string | null;
  accessToken: string | null;
  expirationTime: string | null;
  refleshToken: string | null;
};

export type UserAction = {
  type: string | null;
  payload: User;
};

const initialState: User = {
  id: null,
  userName: null,
  email: null,
  accessToken: null,
  expirationTime: null,
  refleshToken: null,
};

const userSlice = createSlice({
  name: "user", // useSelectorで呼び出すときにキーになる文字列
  initialState,
  reducers: {
    setUser: (state: User, action: UserAction) => {
      state.id = action.payload.id;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      state.expirationTime = action.payload.expirationTime;
      state.refleshToken = action.payload.refleshToken;
    },
    setToken: (state: User, action) => {
      state.accessToken = action.payload.accessToken;
      state.expirationTime = action.payload.expirationTime;
      state.refleshToken = action.payload.refleshToken;
    },
    clearUser: (state: User) => {
      state.id = null;
      state.userName = null;
      state.email = null;
      state.accessToken = null;
      state.expirationTime = null;
      state.refleshToken = null;
    },
  },
});

export const { setUser, setToken, clearUser } = userSlice.actions;
export default userSlice.reducer;
