import axios from "./axiosConfig.js";
import {
  getAccessToken,
  setAccessToken,
  clearAccessToken,
} from "./utils/tokenService.js";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

/* ================= REQUEST ================= */
axios.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ================= RESPONSE ================= */
axios.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // safety check
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // ❌ Never retry refresh-token endpoint itself
    if (originalRequest.url?.includes("/auth/refresh-token")) {
      clearAccessToken();
      return Promise.reject(error);
    }

    // 🔁 Handle access-token expiry
    if (
      (error.response?.status === 401 ||
        error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axios(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post("/auth/refresh-token");

        setAccessToken(data.accessToken);
        processQueue(null, data.accessToken);

        originalRequest.headers.Authorization =
          `Bearer ${data.accessToken}`;

        return axios(originalRequest);
      } catch (err) {
        processQueue(err, null);
        clearAccessToken();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
