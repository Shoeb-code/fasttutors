import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContextParent } from "../context/AuthParent.jsx";
import { AuthContext } from "../context/AuthContextTutor.jsx";

const PrivateRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext); // tutor user
  const { parentUser } = useContext(AuthContextParent); // student/parent user

  /* ================= NO ONE LOGGED IN ================= */
  if (!user && !parentUser) {
    return <Navigate to="/" replace />;
  }

  /* ================= TUTOR ROUTES ================= */
  if (role === "tutor") {
    if (!user || user.role !== "tutor") {
      return <Navigate to="/" replace />;
    }
  }

  /* ================= STUDENT / PARENT ROUTES ================= */
  if (role === "student") {
    if (!parentUser || parentUser.role !== "student") {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default PrivateRoute;
