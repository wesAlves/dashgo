import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";

let cookies = parseCookies();
let isRefreshing = false;
let failedRequestsQueue = [];

export const authApi = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    Authorization: `Bearer ${cookies["dashgo.token"]}`,
  },
});

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response.status === 401) {
      if (error.response.data?.code === "token.expired") {
        cookies = parseCookies();

        const { "dashgo.refreshToken": refreshToken } = cookies;
        const originalCongir = error.config;

        if (!isRefreshing) {
          isRefreshing = true;

          authApi
            .post("/refresh", {
              refreshToken,
            })
            .then((response) => {
              const { token } = response.data;

              setCookie(undefined, "dashgo.token", token, {
                maxAge: 60 * 60 * 24 * 30,
                path: "/",
              });

              setCookie(
                undefined,
                "dashgo.refreshToken",
                response.data.refreshToken,
                {
                  maxAge: 60 * 60 * 24 * 30,
                  path: "/",
                }
              );

              authApi.defaults.headers["Authorization"] = `Bearer ${token}`;

              failedRequestsQueue.forEach((request) =>
                request.onSuccess(token)
              );

              failedRequestsQueue = [];
            })
            .catch((err) => {
              failedRequestsQueue.forEach((request) => request.onFailure(err));

              failedRequestsQueue = [];
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalCongir.headers["Authorization"] = `Bearer ${token}`;

              resolve(authApi(originalCongir));
            },
            onFailure: (err: AxiosError) => {
              reject(err);
            },
          });
        });
      } else {
        //logout user
      }
    }
  }
);
