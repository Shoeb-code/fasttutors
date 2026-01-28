import { useEffect } from "react";
import axios from "../axiosConfig.js";
import { setAccessToken } from "../utils/tokenService.js";

const useAuthInit = () => {
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data } = await axios.post("/auth/refresh-token");

        if (data?.accessToken) {
          setAccessToken(data.accessToken);
        }
      } catch (error) {
        console.log("No active session");
      }
    };

    initAuth();
  }, []);
};

export default useAuthInit;
