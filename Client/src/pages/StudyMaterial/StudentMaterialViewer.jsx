import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Maximize,
  ZoomIn,
  ZoomOut,
  X,
  Sun,
  Moon,
  RotateCcw
} from "lucide-react";

/* =========================================================
   🦄 UNICORN v8 — PRODUCTION SAAS MATERIAL VIEWER
========================================================= */

export default function StudentMaterialViewer(){

  const { search } = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(search);

  const url = params.get("url");
  const type = params.get("type");

  const [dark,setDark] = useState(true);
  const [zoom,setZoom] = useState(1);

  if(!url){
    return(
      <div className="min-h-screen flex items-center justify-center text-white">
        Invalid Material
      </div>
    );
  }

  /* =========================================================
     🎥 VIDEO VIEW
  ========================================================= */

  if(type === "video"){
    return(
      <div className="min-h-screen bg-black flex items-center justify-center">
        <video src={url} controls className="w-full h-full"/>
      </div>
    );
  }

  /* =========================================================
     📄 PDF VIEWER
  ========================================================= */

  return(
    <div className={`${dark ? "bg-[#05060a]" : "bg-gray-100"} min-h-screen`}>

      {/* =====================================================
          🚀 UNICORN FLOATING TOOLBAR
      ===================================================== */}

      <div className="
        fixed top-5 left-1/2 -translate-x-1/2 z-50
        flex items-center gap-3
        px-4 py-2 rounded-2xl
        backdrop-blur-xl
        bg-black/60 border border-white/10
        shadow-[0_0_40px_rgba(79,70,229,0.25)]
        text-white
      ">

        {/* ZOOM OUT */}
        <button
          onClick={()=>setZoom(z=>Math.max(0.6, z - 0.1))}
          className="hover:text-indigo-400 transition"
        >
          <ZoomOut size={18}/>
        </button>

        {/* ZOOM IN */}
        <button
          onClick={()=>setZoom(z=>Math.min(2, z + 0.1))}
          className="hover:text-indigo-400 transition"
        >
          <ZoomIn size={18}/>
        </button>

        {/* RESET ZOOM */}
        <button
          onClick={()=>setZoom(1)}
          className="hover:text-indigo-400 transition"
        >
          <RotateCcw size={18}/>
        </button>

        {/* DARK MODE */}
        <button onClick={()=>setDark(!dark)}>
          {dark ? <Sun size={18}/> : <Moon size={18}/>}
        </button>

        {/* FULLSCREEN */}
        <button
          onClick={()=>document.documentElement.requestFullscreen()}
          className="hover:text-indigo-400"
        >
          <Maximize size={18}/>
        </button>

        {/* CLOSE PDF */}
        <button
          onClick={()=>navigate(-1)}
          className="text-red-400 hover:text-red-300"
        >
          <X size={18}/>
        </button>

      </div>

      {/* =====================================================
          📚 PDF CONTAINER (ZOOMABLE)
      ===================================================== */}

      <div className="pt-20 overflow-auto h-screen flex justify-center">

        <div
          style={{
            transform:`scale(${zoom})`,
            transformOrigin:"top center",
            transition:"transform 0.25s ease"
          }}
          className="w-full max-w-5xl"
        >
          <iframe
            src={`https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`}
            title="PDF Viewer"
            className="w-full h-[90vh] rounded-2xl border border-white/10 shadow-2xl"
          />
        </div>

      </div>

    </div>
  );
}