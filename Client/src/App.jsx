import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContextTutor.jsx";
import { AuthParent } from "./context/AuthParent.jsx";
import { Toaster } from "react-hot-toast";

/* ================= AUTH INIT ================= */
import useAuthInit from "./hooks/useAuthInit.js";

/* ================= AXIOS INTERCEPTOR ================= */
import "./axiosInterceptor.js";

/* ================= NAVBAR ================= */
import Navbar from "./components/Navbar/Navbar.jsx";

/* ================= PUBLIC PAGES ================= */
import LandingPage from "./home/LandingPage.jsx";
import Learnmore from "./home/lernMore/LearnMore.jsx";

/* ================= TUTOR ================= */
import RegisterTutor from "./pages/Tutor/Registertutor.jsx";
import LoginTutor from "./pages/Tutor/LoginTutor.jsx";
import TutorDashboard from "./pages/Tutor/TutorDashboard.jsx";
import EditTutorProfile from "./pages/Tutor/EditTutorProfile.jsx";
import BuyCoins from "./pages/Tutor/BuyCoins.jsx";
import TutorApplyHistory from "./pages/Tutor/TutorApplyHistory.jsx";

/* ================= STUDENT ================= */
import ParentPost from "./pages/Student/ParentPost.jsx";
import LoginStudent from "./pages/Student/LoginStudent.jsx";
import AddTuition from "./pages/Student/AddTuition.jsx";
import MyEnquery from "./pages/Student/MyEnquery.jsx";
import SearchTutors from "./pages/SearchTutors.jsx";

/* ================= SHARED ================= */
import AllTuitions from "./pages/AllTuitions.jsx";
import TutorPublicProfile from "./pages/TutorPublicProfile.jsx";

/* ================= STUDY MATERIAL ================= */
import StudyMaterialSubjects from "./pages/StudyMaterial/StudyMaterialSubjects.jsx";
import StudyMaterialContent from "./pages/StudyMaterial/StudyMaterialContent.jsx";
import StudentMaterialViewer from "./pages/StudyMaterial/StudentMaterialViewer.jsx";


/* ================= ADMIN ================= */


import StudyMaterialContentAdmin from "./admin/pages/StudyMaterialContentAdmin.jsx";

import UploadMaterial from "./admin/pages/UploadMaterial.jsx";
import AdminDashboard from "./admin/pages/AdminDashboard.jsx";
import AdminLogin from "./admin/pages/AdminLogin.jsx";
import AdminProtect from "./admin/AdminProtect.jsx";


/* ================= ROUTE GUARD ================= */
import PrivateRoute from "./components/ProtectRoute.jsx";
import AdminLayout from "./admin/layout/ AdminLayout.jsx";




/* =====================================================
   AUTH INITIALIZER COMPONENT (INSIDE ROUTER)
===================================================== */

function AuthInitializer() {
  const location = useLocation();

  useAuthInit(location.pathname);

  return null;
}

/* =====================================================
   MAIN APP ROUTER
===================================================== */

function AppRouter() {
  return (
    <>
      <AuthInitializer />

      <Navbar />

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3500,
          style: {
            background: "#0f172a",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      />

      <Routes>

        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/learn-more" element={<Learnmore />} />

        {/* ================= AUTH ================= */}
        <Route path="/tutor-register" element={<RegisterTutor />} />
        <Route path="/parent-register" element={<ParentPost />} />
        <Route path="/tutor-login" element={<LoginTutor />} />
        <Route path="/parent-login" element={<LoginStudent />} />

        {/* ================= STUDENT ================= */}
        <Route
          path="/parent/search-tutors"
          element={
            <PrivateRoute role="student">
              <SearchTutors />
            </PrivateRoute>
          }
        />

        <Route
          path="/parent/add-tuition"
          element={
            <PrivateRoute role="student">
              <AddTuition />
            </PrivateRoute>
          }
        />

        <Route
          path="/parent/my-post"
          element={
            <PrivateRoute role="student">
              <MyEnquery />
            </PrivateRoute>
          }
        />



<Route
  path="/student/study-materials/:className/:subject"
  element={<StudyMaterialContent />}
/>

<Route
  path="/student/material-viewer"
  element={<StudentMaterialViewer />}
/>


<Route
          path="/public/all-tuitions"
          element={
              <PublicTuitions />
          }
        />






        {/* ================= TUTOR ================= */}
        <Route
          path="/tutor/dashboard"
          element={
            <PrivateRoute role="tutor">
              <TutorDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/tutor/edit-profile"
          element={
            <PrivateRoute role="tutor">
              <EditTutorProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/tutor/buy-coins"
          element={
            <PrivateRoute role="tutor">
              <BuyCoins />
            </PrivateRoute>
          }
        />

        <Route
          path="/tutor/applied-tuittions"
          element={
            <PrivateRoute role="tutor">
              <TutorApplyHistory />
            </PrivateRoute>
          }
        />

        <Route
          path="/tutor/tuitions-post"
          element={
            <PrivateRoute role="tutor">
              <AllTuitions />
            </PrivateRoute>
          }
        />

        <Route path="/tutor/profile/:tutorId" element={<TutorPublicProfile />} />

        {/* ================= STUDY MATERIAL ================= */}
        <Route path="/study-materials" element={<StudyMaterialSubjects />} />

       
        <Route
      path="/student/study-materials/:className/:subject"
       element={<StudyMaterialContent />}
      />





        {/* ================= ADMIN ================= */}
        <Route path="/admin-login" element={<AdminLogin />} />

<Route
  path="/root-control-panel"
  element={
    <AdminProtect>
      <AdminLayout />
    </AdminProtect>
  }
>
  <Route index element={<AdminDashboard />} />
  <Route path="materials" element={<StudyMaterialContentAdmin />} />
  <Route path="upload" element={<UploadMaterial />} />
</Route>

      </Routes>
    </>
  );
}

/* =====================================================
   ROOT APP
===================================================== */

function App() {
  return (
    <AuthProvider>
      <AuthParent>
        <Router>
          <AppRouter />
        </Router>
      </AuthParent>
    </AuthProvider>
  );
}

export default App;
