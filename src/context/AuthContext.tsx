import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";

import { authApi } from "../services/apiAuthClient";

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
  user: User;
};

type AuthProviderProps = {
  children: ReactNode;
};

type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }) {
  const router = useRouter();

  const [user, setUser] = useState<User>();

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "dashgo.token": token } = parseCookies();

    if (token) {
      authApi.get("/me").then((response) => {
        try {
          const { email, permissions, roles } = response.data;

          setUser({ email, permissions, roles });
        } catch (err) {
          destroyCookie(undefined, "dashgo.token");
          destroyCookie(undefined, "dashgo.refreshTokne");

          router.push("/");
        }
      });
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await authApi.post("/sessions", {
        email,
        password,
      });

      const { token, refreshToken, permissions, roles } = response.data;

      setCookie(undefined, "dashgo.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      setCookie(undefined, "dashgo.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      setUser({
        email,
        permissions,
        roles,
      });

      authApi.defaults.headers["Authorization"] = `Bearer ${token}`;

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
