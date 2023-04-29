import axios, { AxiosResponse } from "axios";
import { commonConfig } from "@/config/common";

export const makeInstance = (token: string = "", baseUrl: string = "") => {
  if (!baseUrl) {
    baseUrl = `http://${commonConfig.apiHost}:${commonConfig.apiPort}`;
  }

  const instance = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    timeout: 2000,
  });
  instance.interceptors.response.use(
    // リクエスト成功時の処理
    (config) => requestSuccess(config),
    // リクエスト失敗時の処理
    (config) => requestFailure(config)
  );
  return instance;
};

function requestFailure(config: AxiosResponse<any, any>) {
  //request失敗した時の処理
  console.log("// REQUEST FAILURE", config);
  return Promise.reject(config);
}
function requestSuccess(config: AxiosResponse<any, any>) {
  //request成功した時の処理
  console.log("// REQUEST SUCCESS", config);
  return config;
}
