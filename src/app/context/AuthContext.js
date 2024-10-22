"use client";

import { me } from "@/actions/auth";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUserLogin = async () => {
      const data = await me();
      if (data?.error) {
        setUser(null);
      } else {
        setUser(data?.user);
      }
    };
    checkUserLogin();
  }, []);

  const loginContext = (user) => {
    setUser(user);
  };

  const logoutContext = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
