import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  PlayCircle,
  FileText,
  BookOpen,
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "../../axiosConfig";

/* =========================================================
   🦄 UNICORN SAAS STUDY MATERIAL UI
========================================================= */

export default function StudyMaterialContent() {

  const { className, subject } = useParams();

  const [chapters,setChapters] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{

    const load = async()=>{
      try{
        const {data} = await axios.get(
          `/student/study-materials?className=${className}&subject=${subject}`
        );

        if(data.success){

          const grouped = {};

          data.materials.forEach(m=>{
            if(!grouped[m.chapter]) grouped[m.chapter] = [];
            grouped[m.chapter].push(m);
          });

          const chapterArray = Object.keys(grouped).map(name=>({
            title:name,
            materials:grouped[name]
          }));

          setChapters(chapterArray);
        }

      }catch(err){
        console.log(err);
      }finally{
        setLoading(false);
      }
    };

    load();

  },[className,subject]);

  /* ========================================================= */

  if(loading){
    return(
      <div className="min-h-screen flex items-center justify-center text-white bg-[#05060a]">
        Loading materials...
      </div>
    );
  }

  if(!chapters.length){
    return(
      <div className="min-h-screen flex items-center justify-center text-white bg-[#05060a]">
        No Study Material Found
      </div>
    );
  }

  return(
    <div className="
      relative min-h-screen
      bg-gradient-to-br from-[#05060a] via-[#070912] to-[#05060a]
      text-white px-6 py-24
    ">

      {/* ===== AMBIENT GLOW ===== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-indigo-600/10 blur-[160px] rounded-full"/>
      </div>

      {/* =========================================================
         🌌 HERO HEADER
      ========================================================== */}

      <div className="relative max-w-6xl mx-auto mb-20">

        <div className="
          rounded-[28px]
          border border-white/10
          bg-white/[0.03]
          backdrop-blur-xl
          px-12 py-14
          shadow-[0_0_80px_rgba(79,70,229,0.15)]
        ">

          <div className="flex items-center gap-3 mb-4 text-indigo-400">
            <Sparkles size={18}/>
            <span className="text-sm tracking-wide">
              Study Materials
            </span>
          </div>

          <h1 className="
            text-4xl md:text-5xl font-bold capitalize
            bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400
            bg-clip-text text-transparent
          ">
            {subject.replace("-", " ")} — {className.replace("-", " ")}
          </h1>

        </div>
      </div>

      {/* =========================================================
         📚 CHAPTER LIST
      ========================================================== */}

      <div className="relative max-w-6xl mx-auto space-y-20">

        {chapters.map((chapter,index)=>(
          <motion.div
            key={index}
            initial={{opacity:0,y:40}}
            animate={{opacity:1,y:0}}
            transition={{delay:index*0.05}}
          >

            {/* CHAPTER HEADER */}
            <div className="flex items-center gap-4 mb-10">

              <div className="
                w-12 h-12 rounded-xl
                bg-gradient-to-br from-indigo-600/30 to-blue-600/20
                border border-indigo-400/20
                flex items-center justify-center
              ">
                <BookOpen size={18}/>
              </div>

              <h2 className="text-2xl font-semibold tracking-wide">
                {chapter.title}
              </h2>

            </div>

            {/* MATERIAL GRID */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {chapter.materials.map((item,i)=>(
                <MaterialCard key={i} item={item}/>
              ))}
            </div>

          </motion.div>
        ))}

      </div>

    </div>
  );
}

/* =========================================================
   🎴 MATERIAL CARD — UNICORN STYLE
========================================================= */

function MaterialCard({ item }){

  const navigate = useNavigate();

  const icon =
    item.type === "video"
      ? <PlayCircle size={18}/>
      : item.type === "pdf"
      ? <FileText size={18}/>
      : <BookOpen size={18}/>;

  return(
    <motion.div
      whileHover={{y:-10,scale:1.03}}
      transition={{type:"spring",stiffness:200}}
      className="
        group relative
        rounded-[22px]
        p-[1px]
        bg-gradient-to-b from-white/10 to-white/[0.02]
      "
    >

      {/* INNER CARD */}
      <div className="
        relative h-full
        rounded-[22px]
        bg-[#0b0d12]
        border border-white/10
        backdrop-blur-xl
        p-7
        overflow-hidden
      ">

        {/* Hover Glow */}
        <div className="
          absolute inset-0 opacity-0
          group-hover:opacity-100
          transition duration-500
          bg-gradient-to-br from-indigo-600/10 to-blue-600/5
        "/>

        {/* TYPE BADGE */}
        <div className="
          relative flex items-center gap-2
          text-indigo-400 text-xs uppercase
          mb-5
        ">
          <div className="
            w-9 h-9 rounded-lg
            bg-indigo-600/20
            flex items-center justify-center
            border border-indigo-400/20
          ">
            {icon}
          </div>

          {item.type}
        </div>

        {/* TITLE */}
        <h3 className="relative text-lg font-semibold leading-snug">
          {item.title}
        </h3>

        {/* BUTTON */}
        <button
          onClick={()=>navigate(
            `/student/material-viewer?url=${encodeURIComponent(item.url)}&type=${item.type}`
          )}
          className="
            relative mt-7 w-full py-2.5 rounded-xl
            bg-gradient-to-r from-indigo-600 to-blue-600
            hover:from-indigo-500 hover:to-blue-500
            transition font-medium
            shadow-[0_0_25px_rgba(79,70,229,0.25)]
            flex items-center justify-center gap-2
          "
        >
          Open Material
          <ArrowUpRight size={16}/>
        </button>

      </div>
    </motion.div>
  );
}