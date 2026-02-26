import axios from "axios";

const adminAxios = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true, // 🔥 required for refresh cookie
});

/* ================= REQUEST INTERCEPTOR ================= */

adminAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminAccessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* ================= RESPONSE INTERCEPTOR ================= */

adminAxios.interceptors.response.use(
  (res) => res,
  async (error) => {

    const originalRequest = error.config;

    // 🔥 ACCESS TOKEN EXPIRED
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        console.log("🔥 Refreshing admin token...");

        const { data } = await axios.post(
          "http://localhost:4000/api/admin/refresh-token",
          {},
          { withCredentials: true }
        );

        if (data?.accessToken) {
          localStorage.setItem(
            "adminAccessToken",
            data.accessToken
          );

          originalRequest.headers.Authorization =
            `Bearer ${data.accessToken}`;

          return adminAxios(originalRequest);
        }
      } catch (refreshError) {
        console.log("Admin session expired");

        localStorage.removeItem("adminAccessToken");

        window.location.href = "/admin-login";
      }
    }

    return Promise.reject(error);
  }
);

export default adminAxios;
