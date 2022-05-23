import { AuthTokenError } from "./../services/errors/AuthTokenError";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next/types";
import { destroyCookie, parseCookies } from "nookies";

export function withSSRAuth(fn: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const cookies = parseCookies(ctx);

    if (!cookies["dashgo.token"]) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        console.log(err);
        destroyCookie(ctx, "dashgo.refreshToken");
        destroyCookie(ctx, "dashgo.token");
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      } else {
        console.log(err);
      }
    }
  };
}
