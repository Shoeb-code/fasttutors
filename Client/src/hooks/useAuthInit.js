import { useEffect } from "react";
import axios from "../axiosConfig.js";
import { setAccessToken } from "../utils/tokenService.js";

const useAuthInit = (pathname) => {

  useEffect(() => {

    /* 🚫 Skip tutor refresh on admin pages */
    if (
      pathname?.startsWith("/admin") ||
      pathname?.startsWith("/root-control-panel")
    ) {
      return;
    }

    const initAuth = async () => {
      try {
        const { data } = await axios.post("/auth/refresh-token");

        if (data?.accessToken) {
          setAccessToken(data.accessToken);
        }
      } catch (error) {
        if (error.response?.status !== 401) {
          console.error(error);
        }
        console.log("No active session");
      }
    };

    initAuth();

  }, [pathname]);
};

export default useAuthInit;
