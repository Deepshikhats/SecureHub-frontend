import React, { createContext, useEffect, useState } from "react";
import services from "../services";

interface AuthContextProps {
  isValidUser: boolean | null;
}
export const authContext = createContext<AuthContextProps | null>(null);
const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isValidUser, setIsValidUser] = useState<boolean | null>(null);
  const { validateToken } = services.AuthServices;
  useEffect(() => {
    validateToken().then((value) => setIsValidUser(value));
  }, []);
  const values = { isValidUser };
  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
