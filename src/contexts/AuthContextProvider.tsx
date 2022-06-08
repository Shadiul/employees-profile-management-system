import React, { createContext, FC, useContext, useState } from "react";

export function useAuth() {
  return useContext(AuthContext);
}

interface AuthInterface {
  role: Role;
  isLoggedIn: boolean;
  login: (params: ILoginParams) => Promise<string | undefined>;
  logout: () => Promise<string | undefined>;
}

export const AuthContext = createContext({} as AuthInterface);

type Props = {
  children: React.ReactNode;
};

export type Role = "admin" | "system_manager" | "user" | "none";

export interface ILoginParams {
  role: Role;
  username: string;
  password: string;
}

const AuthContextProvider: FC<Props> = ({ children }) => {
  const [role, setRole] = useState<Role>("none");
  const [isLogggedIn, setIsLogggedIn] = useState(false);

  const login = (params: ILoginParams) => {
    console.log(params);
    if (params.role === "admin") {
      if (
        params.username === process.env.REACT_APP_ADMIN_USERNAME &&
        params.password === process.env.REACT_APP_ADMIN_PASSWORD
      ) {
        setRole("admin");
        setIsLogggedIn(true);
        return Promise.resolve("success");
      }
    }
    if (params.role === "system_manager") {
      if (true) {
        setRole("system_manager");
        setIsLogggedIn(true);
        return Promise.resolve("success");
      }
    }

    return Promise.resolve("error");
  };
  const logout = () => {
    setIsLogggedIn(false);
    return Promise.resolve("success");
  };

  return (
    <AuthContext.Provider
      value={{ role: role, isLoggedIn: isLogggedIn, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
