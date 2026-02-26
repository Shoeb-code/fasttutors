import { Navigate } from "react-router-dom";
import { getAccessToken } from "../utils/tokenService";

export default function AdminProtect({ children }) {

 const token = localStorage.getItem("adminAccessToken");

 console.log("ADMIN TOKEN CHECK:", token);
 
  if (!token) {
    return <Navigate to="/admin-login" />;
  }

  return children;
}
