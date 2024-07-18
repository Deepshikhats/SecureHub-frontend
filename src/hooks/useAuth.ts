import React, { useState, useEffect } from "react";
import Services from "../services";

const useAuth = () => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const { validateToken } = Services.AuthServices;
  useEffect(() => {
    validateToken().then((value) => setIsValid(value));
  }, []);
  return isValid;
};

export default useAuth;
