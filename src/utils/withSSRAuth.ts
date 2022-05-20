import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next/types";
import { parseCookies } from "nookies";

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
    return await fn(ctx);
  };
}
