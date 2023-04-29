import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/UserSlice";

export const store = configureStore({
  reducer: {
    //Reducerが増える場合はここに追加していく
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
