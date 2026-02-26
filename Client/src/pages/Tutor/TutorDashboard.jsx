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
  Sparkles
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

     

     

      {/* ===================================================
          📊 CONTENT AREA
      =================================================== */}

      <div className="flex-1 px-6 md:px-10 py-8 space-y-10">

        {/* ===================================================
            🌌 TOP NAVBAR
        =================================================== */}

        <div className="
          flex justify-between items-center
          bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-2xl px-6 py-4
        ">
          <h1 className="text-xl font-semibold">
            Tutor Dashboard
          </h1>

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-400">
              Welcome,
            </div>
            <div className="font-semibold">
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
        ">

          <div className="flex justify-between items-center flex-wrap gap-6">

            {/* LEFT */}
            <div className="flex items-center gap-6">

              {tutor.profilePhoto ? (
                <img
                  src={tutor.profilePhoto}
                  className="
                    w-24 h-24 rounded-full object-cover
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
                  bg-gradient-to-r from-indigo-400 to-cyan-400
                  bg-clip-text text-transparent
                ">
                  {tutor.firstName} {tutor.lastName}
                </h2>

                <p className="text-gray-400 flex items-center gap-2 mt-1">
                  <Sparkles size={14}/>
                  {tutor.subject || "Tutor"}
                </p>
              </div>

            </div>

            {/* COINS */}
            <div className="
              px-6 py-4 rounded-2xl
              bg-gradient-to-br from-amber-500/10 to-orange-500/10
              border border-amber-400/20
            ">
              <div className="flex items-center gap-2 text-amber-400">
                <Wallet size={16}/>
                Coins Balance
              </div>

              <p className="text-3xl font-bold text-amber-400 mt-2">
                {tutor.coins || 0} 🪙
              </p>

              <button
                onClick={()=>window.location.href="/tutor/buy-coins"}
                className="
                  mt-3 px-5 py-2 rounded-xl
                  bg-gradient-to-r from-amber-400 to-orange-500
                  text-black text-sm font-semibold
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
            icon={<GraduationCap size={16}/>}
            label="Qualification"
            value={tutor.highestQualification}
          />

          <InfoCard
            icon={<Briefcase size={16}/>}
            label="Experience"
            value={`${tutor.experience || 0} yrs`}
          />

          <InfoCard
            icon={<BookOpen size={16}/>}
            label="Mode of Teaching"
            value={tutor.modeOfTeaching}
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
          ">
            <p className="text-xs text-gray-400 mb-2">
              About Tutor
            </p>

            <p className="text-sm text-gray-200 leading-relaxed">
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
    bg-white/5 backdrop-blur-xl
    border border-white/10
    p-6
    hover:border-indigo-400/30
    transition
  ">
    <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
      {icon}
      {label}
    </div>

    <p className="text-lg font-semibold">
      {value || "—"}
    </p>
  </div>
);
