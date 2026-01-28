import axios from "../axiosConfig.js";
import React, { createContext, useEffect, useState } from "react";
import { setAccessToken, clearAccessToken } from "../utils/tokenService.js";

export const AuthContextParent = createContext(null);

export const AuthParent = ({ children }) => {
  const [parentUser, setParentUser] = useState(() => {
    const stored = localStorage.getItem("parentUser");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (parentUser) {
      localStorage.setItem("parentUser", JSON.stringify(parentUser));
    } else {
      localStorage.removeItem("parentUser");
    }
  }, [parentUser]);

  const studentRegister = async (payload) => {
    try {
      const { data } =  await axios.post("/parent/auth/parent-register", payload);

      if (data.success) {
        setParentUser(data.user);
        if (data.accessToken) setAccessToken(data.accessToken);
      }
      return data;
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    }
  };

  const loginStudent = async (formData) => {
    try {
      const { data } = await axios.post("/parent/auth/parent-login", formData);

      if (data.success) {
        setParentUser(data.user);
        setAccessToken(data.accessToken);
      }
      return data;
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    }
  };

  const logoutStudent = async () => {
    try {
      await api.post("/auth/logout");
    } catch (_) {}

    clearAccessToken();
    setParentUser(null);
  };

  return (
    <AuthContextParent.Provider
      value={{
        parentUser,
        studentRegister,
        loginStudent,
        logoutStudent,
      }}
    >
      {children}
    </AuthContextParent.Provider>
  );
};
