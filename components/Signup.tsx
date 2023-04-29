import React, { useState } from "react";
import { firebaseConfig } from "@/config/firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/UserSlice";
import { useRouter } from "next/router";
import { makeInstance } from "@/utils/axios";
import { User } from "@/types/types";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const isUser = async () => {
    // GoのAPI呼び出し
    const axiosInstance = makeInstance();
    const res: boolean = await axiosInstance
      .get("user/name/" + userName)
      .then((res) => {
        console.log(res);
        if (res.data.id) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log("err:", err);
        // エラー発生したときは存在することにする。
        return true;
      });

      return res
  };

  // 登録ボタン押下
  const handleClick = async () => {
    setIsLoading(true);
    const isUserRes: boolean = await isUser();
    if (isUserRes) {
      setErrMessage("このユーザ名はすでに存在します。");
      setIsLoading(false);
      return;
    }
    const auth = getAuth(initializeApp(firebaseConfig));
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const { user } = userCredential;
        const tokenResult = await user
          .getIdTokenResult()
          .then((tokenResult) => tokenResult);
        const refreshToken = user.refreshToken;
        // GoのAPI呼び出し
        const axiosInstance = makeInstance(tokenResult.token);
        const res: User = await axiosInstance
          .put("/user", {
            userName: userName,
            email: email,
            password: password,
          })
          .then((res) => {
            return res.data;
          })
          .catch((error) => {
            console.log(error);
            setErrMessage("登録に失敗しました。");
            return null;
          });

        if (
          user &&
          tokenResult.token &&
          tokenResult.claims.exp &&
          refreshToken &&
          res.id
        ) {
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
          router.push("/");
        } else {
          setErrMessage("登録に失敗しました。");
        }
      })
      .catch((error) => {
        console.log(error);
        setErrMessage("登録に失敗しました。");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <div className="text-red-600">{errMessage}</div>
      <div>
        <div>ユーザ名</div>
        <input
          type="text"
          value={userName}
          placeholder="ユーザ名"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserName(e.target.value)
          }
          className="border-2 border-current"
        />
      </div>
      <br />
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
          登録
        </button>
      </div>
      <br />
      <div>
        <Link href="/login">ログインはこちら</Link>
      </div>
    </div>
  );
};

export default Signup;
