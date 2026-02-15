import React, { useContext } from "react";
import { UserStar } from "lucide-react";
import { Link } from "react-router-dom";
import { FcReadingEbook } from "react-icons/fc";
import { AuthContext } from "../../context/AuthContextTutor";
import { AuthContextParent } from "../../context/AuthParent";

function StudentAndTeacher() {

   const {user}  =useContext(AuthContext);
   const {parentUser} =useContext(AuthContextParent);

  return (
    <section className="bg-gradient-to-br from-black via-gray-950 to-gray-900
                        text-white px-6 py-20 rounded-3xl m-4">
      
      {/* Heading */}
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-extrabold text-violet-500 mb-3">
          What Are You Looking For?
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Join FastTutors as a learner or become a tutor and start your journey today.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Tutor Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10
                        rounded-3xl p-8 flex flex-col items-center text-center
                        hover:border-green-400 hover:shadow-xl transition">
          <UserStar size={72} className="text-amber-300 mb-6" />

          <h2 className="text-2xl md:text-3xl font-bold text-green-500 mb-3">
            Want to Teach?
          </h2>

          <p className="text-gray-300 mb-8 leading-relaxed">
            Share your knowledge, inspire students, and earn extra income
            by teaching subjects you love.
          </p>



      <Link
            to="/tutor-register"
            className="px-8 py-3 rounded-xl
                       bg-gradient-to-r from-green-500 to-emerald-600
                       text-black font-semibold
                       hover:scale-[1.05] transition"
          >
            Become a Tutor →
          </Link> 
          
        </div>

        {/* Student Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10
                        rounded-3xl p-8 flex flex-col items-center text-center
                        hover:border-blue-400 hover:shadow-xl transition">
          <FcReadingEbook size={72} className="mb-6" />

          <h2 className="text-2xl md:text-3xl font-bold text-blue-500 mb-3">
            Want to Learn?
          </h2>

          <p className="text-gray-300 mb-8 leading-relaxed">
            Learn at your own pace with personalized tutoring from
            verified and experienced educators.
          </p>

          <Link
            to="/parent-register"
            className="px-8 py-3 rounded-xl
                       bg-gradient-to-r from-blue-500 to-indigo-600
                       text-white font-semibold
                       hover:scale-[1.05] transition"
          >
            Find a Tutor →
          </Link>
        </div>

      </div>
    </section>
  );
}

export default StudentAndTeacher;
