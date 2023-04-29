import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setUser, clearUser } from "@/redux/UserSlice";
import { firebaseConfig } from "@/config/firebase";
import { initializeApp } from "firebase/app";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { makeInstance } from "@/utils/axios";

export const useAuth = (): boolean => {
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth(initializeApp(firebaseConfig));
    onAuthStateChanged(auth, async (user) => {
      const tokenResult = user
        ? await user.getIdTokenResult().then((tokenResult) => tokenResult)
        : null;

      if (tokenResult && user) {
        // メールでユーザいるかチェック
        const axiosInstance = makeInstance(tokenResult.token);
        const res = await axiosInstance
          .get("/user/email/" + user.email)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            console.log("err:", err);
            return null;
          });
        if (
          res &&
          res.id &&
          res.userName &&
          tokenResult &&
          tokenResult.token &&
          tokenResult.claims.exp &&
          user.refreshToken
        ) {
          dispatch(
            setUser({
              id: res.id,
              userName: res.userName,
              email: user.email,
              accessToken: tokenResult.token,
              expirationTime: tokenResult.claims.exp,
              refleshToken: user.refreshToken,
            })
          );
          setIsLoading(false);
        }
      } else {
        dispatch(clearUser());
        setIsLoading(false);
      }
    });
  }, [accessToken, dispatch]);
  return isLoading;
};
