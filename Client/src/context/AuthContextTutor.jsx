import { createContext, useState, useEffect } from "react";
import axios from "../axiosConfig.js";

import {setAccessToken, clearAccessToken} from '../utils/tokenService.js'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
   const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  
  // Sync user + token with localStorage & axios headers
  useEffect(() => {
    if (user ) {
      localStorage.setItem("user", JSON.stringify(user)); 
    } else {
      localStorage.removeItem("user");
    }
  }, [user]); 

  // Login function
  const loginTutor  = async (formData) => {
    try {
      const { data } = await axios.post("/tutor/auth/tutor-login",formData);
      
      if (data.success) {
        setUser(data.user);
        setAccessToken(data.accessToken);  // access token in memory
      }
      return data;
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    }
  };

  // Register function
  const registerTutor = async (formData,otp) => {
    try {
      const { data } = await axios.post("/auth/tutor-register",{ ...formData,otp});

      if (data.success) {
        setUser(data.user);
        setAccessToken(data.accessToken); // ✅ FIXED
      }
      return data;
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post("/tutor/auth/tutor-logout");
    } catch (_) {}

    setUser(null);
    clearAccessToken();
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loginTutor,
        registerTutor,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
