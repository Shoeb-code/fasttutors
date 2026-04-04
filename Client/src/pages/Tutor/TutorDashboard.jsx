import React, { useContext, useEffect, useState } from "react";
import axios from "../../axiosConfig.js";
import { AuthContext } from "../../context/AuthContextTutor.jsx";
import { getAccessToken } from "../../utils/tokenService.js";

import {
  User,
  LayoutDashboard,
  Wallet,
  GraduationCap,
  Briefcase,
  BookOpen,
  Sparkles,
  Phone,
  LocateIcon,
  LocationEdit,
  PersonStanding,
  BookAIcon,
  BookIcon,
  BookOpenCheck,
  EqualApproximatelyIcon,
  MailIcon
} from "lucide-react";

/* ===================================================
   🦄 UNICORN v6 — SAAS DASHBOARD LAYOUT
=================================================== */

export default function TutorDashboard() {

  const { user } = useContext(AuthContext);

  const [dashboard,setDashboard] = useState(null);
  const [loading,setLoading] = useState(true);

  /* ================= FETCH ================= */

  useEffect(()=>{
    const load = async()=>{
      try{
        const token = getAccessToken();
        if(!user || !token) return;

        const {data} = await axios.get("/tutor/dashboard");

        if(data.success){
          setDashboard(data);
        }
      }catch(err){
        console.log(err);
      }finally{
        setLoading(false);
      }
    };

    load();
  },[user]);

  const tutor = dashboard?.tutor || {};

  if(loading || !dashboard){
    return(
      <div className="min-h-screen flex items-center justify-center text-white text-lg">
        Loading dashboard...
      </div>
    );
  }

  /* ===================================================
     🧠 MAIN UI
  =================================================== */

  return(
    <div className="min-h-screen bg-black text-white flex">
      <div className="flex-1 px-6 md:px-10 py-8 space-y-10">
        <div className="
          flex justify-between items-center
          bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-2xl px-6 py-4
           hover:border-green-700/80
        ">
          <h1 className="text-[25px] font-semibold">
            Tutor <span className="text-green-600">Dashboard</span>
          </h1>

          <div className="flex items-center gap-3">
            <div className="text-[18px] text-gray-300">
              Welcome,
            </div>
            <div className="font-semibold text-2xl text-green-600">
              {tutor.firstName}
            </div>
          </div>
        </div>

        {/* ===================================================
            👤 PROFILE HERO CARD
        =================================================== */}

        <div className="
          rounded-3xl
          bg-gradient-to-br from-indigo-600/10 via-cyan-500/5 to-emerald-500/10
          backdrop-blur-xl
          border border-white/10
          p-8
          shadow-[0_0_40px_rgba(99,102,241,0.15)]
           hover:border-indigo-700/80
        ">

          <div className="flex justify-between items-center flex-wrap gap-6">

            {/* LEFT */}
            <div className="flex items-center gap-6">

              {tutor.profilePhoto ? (
                <img
                  src={tutor.profilePhoto}
                  className="
                    w-44 h-44 rounded-full object-cover
                    border border-indigo-400/40
                  "
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-indigo-600/20 flex items-center justify-center">
                  <User/>
                </div>
              )}

              <div>
                <h2 className="
                  text-3xl font-bold
                  bg-gradient-to-r from-indigo-700 to-cyan-500
                  bg-clip-text text-transparent
                ">
                  {tutor.firstName} {tutor.lastName}
                </h2>

                <p className="text-gray-400 text-2xl flex items-center gap-2 mt-1">
                  <BookOpenCheck  className="text-pink-900" size={44}/>
                  {tutor.subject || "Tutor"}
                </p>

                <p className="text-gray-400  flex items-center gap-2 mt-1">
                  <MailIcon className="text-gray-700" size={30}/>
                  {tutor.email || "Tutor"}
                </p>

              </div>

            </div>

            {/* COINS */}
            <div className="
              px-6 py-4 rounded-2xl
              bg-gray-950 
              border border-indigo-600
            ">
              <div className="flex items-center gap-2 text-gray-400">
                <Wallet className="text-blue-600" size={26}/>
                Coins Balance
              </div>

              <p className="text-3xl font-bold text-amber-700 mt-2">
                {tutor.coins || 0} 🪙
              </p>

              <button
                onClick={()=>window.location.href="/tutor/buy-coins"}
                className="
                  mt-3 px-5 py-2 rounded-xl
                  bg-gradient-to-r from-blue-800 to-red-600
                  text-gray-200 text-sm font-semibold
                  hover:scale-105 transition
                
                "
              >
                Buy Coins
              </button>
            </div>

          </div>

        </div>

        {/* ===================================================
            📊 INFO GRID (SAAS CARDS)
        =================================================== */}

        <div className="grid md:grid-cols-3 gap-6">

          <InfoCard
            icon={<GraduationCap className="text-amber-300"  size={30}/>}
            label="Qualification"
            value={tutor.highestQualification}
          />

          <InfoCard
            icon={<Briefcase className="text-amber-800" size={30}/>}
            label="Experience"
            value={`${tutor.experience || 0} yrs`}
          />

          <InfoCard
            icon={<BookOpen className="text-blue-500" size={30}/>}
            label="Mode of Teaching"
            value={tutor.modeOfTeaching}
          />

<InfoCard
            icon={<PersonStanding   className="text-gray-400" size={30}/>}
            label="Student I teach"
            value={tutor.studentYouTeach}
          />

          <InfoCard
            icon={<LocationEdit className="text-green-500" size={30}/>}
            label="City I lived "
            value={tutor.city}
          />
          <InfoCard
            icon={<Phone className="text-red-500" size={30}/>}
            label="My Mobile"
            value={tutor.mobile}
          />

        </div>

        {/* ===================================================
            📝 ABOUT
        =================================================== */}

        {tutor.aboutTutor && (
          <div className="
            rounded-2xl
            bg-white/5 backdrop-blur-xl
            border border-white/10
            p-6
            hover:border-indigo-700/80
    transition
  ">
          
            <p className="text-[20px] text-blue-500 mb-2">
              About Tutor
            </p>

            <p className="text-[16px] text-gray-400 leading-relaxed">
              {tutor.aboutTutor}
            </p>
          </div>
        )}

      </div>

    </div>
  );
}

/* ===================================================
   🧩 SIDEBAR ITEM
=================================================== */

const NavItem = ({icon,label,active})=>(
  <div className={`
    flex items-center gap-3 px-4 py-3 rounded-xl
    cursor-pointer transition
    ${active
      ? "bg-indigo-500/20 text-indigo-300"
      : "hover:bg-white/5 text-gray-400"}
  `}>
    {icon}
    {label}
  </div>
);

/* ===================================================
   🧩 INFO CARD
=================================================== */

const InfoCard = ({icon,label,value})=>(
  <div className="
    rounded-2xl
    bg-gray-950 backdrop-blur-xl
    border border-white/10
    p-6
    hover:border-indigo-700/80
    transition
  ">
    <div className="flex  items-center gap-2  mb-2">
    {icon}
    <span className=" text-gray-400 text-[16px] ">{label}</span> 
    </div>

    

    <p className="text-lg font-semibold">
      {value || "—"}
    </p>
  </div>
);
