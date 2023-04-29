import React, { useState } from "react";
import { firebaseConfig } from "@/config/firebase";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import Link from "next/link";
import { makeInstance } from "@/utils/axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/UserSlice";
import { User } from "@/types/types";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [passwordLock, setpasswordLock] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  // ログインボタン押下
  const handleClick = async () => {
    setIsLoading(true);
    if (passwordLock >= 4) {
      setErrMessage(
        "4回連続でログインに失敗しました。管理者にお問い合わせください。"
      );
      return;
    }

    // FireAuth呼び出し準備
    const auth = getAuth(initializeApp(firebaseConfig));
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const { user } = userCredential;
        const tokenResult = await user
          .getIdTokenResult()
          .then((tokenResult) => tokenResult);
        const refreshToken = user.refreshToken;
        // メールでユーザいるかチェック
        const axiosInstance = makeInstance(tokenResult.token);
        const res: User = await axiosInstance
          .get("/user/email/" + email)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            console.log("err:", err);
            return null;
          });

        if (
          res.id &&
          res.userName &&
          tokenResult.token &&
          tokenResult.claims.exp &&
          refreshToken
        ) {
          console.log("ここきた")
          dispatch(
            setUser({
              id: res.id,
              userName: res.userName,
              email: user.email,
              accessToken: tokenResult.token,
              expirationTime: tokenResult.claims.exp,
              refleshToken: refreshToken,
            })
          );
          console.log("ログインしました");
          setpasswordLock(0);
        } else {
          setErrMessage(
            "ログインに失敗しました。パスワードをご確認頂き、再度お試し下さい。4回連続で失敗するとロックされます。"
          );
          setpasswordLock((prevCount) => prevCount + 1);
        }
      })
      .catch((error) => {
        console.log(error);
        setErrMessage(
          "ログインに失敗しました。パスワードをご確認頂き、再度お試し下さい。4回連続で失敗するとロックされます。"
        );
        setpasswordLock((prevCount) => prevCount + 1);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <div className="text-red-600">{errMessage}</div>
      <div>
        <div>メールアドレス</div>
        <input
          type="text"
          value={email}
          placeholder="メールアドレス"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          className="border-2 border-current"
        />
      </div>
      <br />
      <div>
        <div>パスワード</div>
        <input
          type="text"
          value={password}
          placeholder="パスワード"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          className="border-2 border-current"
        />
      </div>
      <br />
      <div>
        <button
          type="button"
          onClick={handleClick}
          disabled={isLoading}
          className="border-2 border-current"
        >
          ログイン
        </button>
      </div>
      <br />
      <div>
        <Link href="/signup">登録はこちら</Link>
      </div>
    </div>
  );
};

export default Login;
