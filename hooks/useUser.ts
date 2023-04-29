import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/redux/UserSlice";

// ログイン中のユーザ情報取得
export const useUser = (): User => {
  return useSelector((state: RootState) => state.user);
};
