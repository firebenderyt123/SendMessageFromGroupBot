import React from "react";
import jwt_decode from "jwt-decode";

interface AuthContextInterface {
  token: string | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const authContextDefaults: AuthContextInterface = {
  token: null,
  isAuthenticated: false,
  login: () => null,
  logout: () => null,
};

type AuthProviderProps = {
  children: JSX.Element;
};

const AuthContext =
  React.createContext<AuthContextInterface>(authContextDefaults);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const token = localStorage.getItem("jwtToken");
  const isAuth = token ? true : false;

  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(isAuth);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const value = {
    token,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
