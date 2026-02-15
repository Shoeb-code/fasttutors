import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContextTutor.jsx";
import {AuthParent} from "./context/AuthParent.jsx";
import { Toaster } from "react-hot-toast";
// Pages
import LandingPage from "./home/LandingPage.jsx";
import RegisterTutor from "./pages/Tutor/Registertutor.jsx";
import LoginTutor from "./pages/Tutor/LoginTutor.jsx"


import useAuthInit from "./hooks/useAuthInit.js";

import './axiosInterceptor.js'


import ParentPost from "./pages/Student/ParentPost.jsx";

import TutorDashboard from "./pages/Tutor/TutorDashboard.jsx";
<Route path="/tutor/profile/:tutorId" element={<TutorPublicProfile />} />
// Components
import Navbar from "./components/Navbar/Navbar.jsx";
import PrivateRoute from "./components/ProtectRoute.jsx";

import Learnmore from "./home/lernMore/LearnMore.jsx";
import LoginStudent from "./pages/Student/LoginStudent.jsx";
import AddTuition from "./pages/Student/AddTuition.jsx";
import MyEnquery from "./pages/Student/MyEnquery.jsx";
import AllTuitions from "./pages/AllTuitions.jsx";
import EditTutorProfile from "./pages/Tutor/EditTutorProfile.jsx";
import SearchTutors from "./pages//SearchTutors.jsx";
import TutorPublicProfile from "./pages/TutorPublicProfile.jsx";
import BuyCoins from "./pages/Tutor/BuyCoins.jsx";
import TutorApplyHistory from "./pages/Tutor/TutorApplyHistory.jsx";

import StudyMaterialSubjects from "./pages/StudyMaterial/StudyMaterialSubjects.jsx";
import StudyMaterialContent from "./pages/StudyMaterial/StudyMaterialContent.jsx";

function App() {

  useAuthInit();
  return (
    <AuthProvider>
      <AuthParent>
        <Router>
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
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/tutor-register" element={<RegisterTutor />} />
            <Route path="/parent-register" element={<ParentPost />} />
            <Route path="/tutor-login" element={<LoginTutor />} />
            <Route path="/parent-login" element={<LoginStudent />} />
      
           

            <Route path="/learn-more" element={<Learnmore />} />

            <Route
              path="/parent/search-tutors"
              element={
                <PrivateRoute role="student">
                  <SearchTutors />
                </PrivateRoute>
              }
            />

            <Route path="/parent/add-tuition" element={<PrivateRoute role="student"> <AddTuition/> </PrivateRoute> }/>

            <Route
              path="/parent/my-post"
              element={
                <PrivateRoute role="student">
                   <MyEnquery/>
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
                  <BuyCoins/>
                </PrivateRoute>
              }
            />

           <Route
              path="/tutor/applied-tuittions"
              element={
                <PrivateRoute role="tutor">
                  <TutorApplyHistory/>
                </PrivateRoute>
              }
            />



            <Route
              path="/tutor/tuitions-post"
              element={
                <PrivateRoute role="tutor">
                  <AllTuitions/>
                </PrivateRoute>
              }
            />



            <Route
              path="/tutor/dashboard"
              element={
                <PrivateRoute role="tutor">
                  <TutorDashboard/>
                </PrivateRoute>
              }
            />


<Route path="/tutor/profile/:tutorId" element={<TutorPublicProfile />} />


  <Route path="/study-materials" element={<StudyMaterialSubjects/>} />

  <Route
  path="/study-materials/:className/:subject"
  element={<StudyMaterialContent />}
/>




          </Routes>
        </Router>
      </AuthParent>
    </AuthProvider>
  );
}
export default App