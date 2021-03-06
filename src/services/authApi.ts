import axios, { AxiosError } from "axios";
import router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { AuthTokenError } from "./errors/AuthTokenError";

let isRefreshing = false;
let failedRequestsQueue = [];

export function setupAuthClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const authApi = axios.create({
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

                setCookie(ctx, "dashgo.token", token, {
                  maxAge: 60 * 60 * 24 * 30,
                  path: "/",
                });

                setCookie(
                  ctx,
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
                failedRequestsQueue.forEach((request) =>
                  request.onFailure(err)
                );

                failedRequestsQueue = [];

                if (typeof window) {
                  destroyCookie(ctx, "dashgo.token");
                  destroyCookie(ctx, "dashgo.refreshToken");

                  router.push("/");
                } else {
                  return Promise.reject(new AuthTokenError());
                }
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
          destroyCookie(ctx, "dashgo.token");
          destroyCookie(ctx, "dashgo.refreshToken");

          router.push("/");
        }
      }

      return Promise.reject(error);
    }
  );

  return authApi;
}
