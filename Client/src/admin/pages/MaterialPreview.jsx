import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";

/* ================= PDF WORKER ================= */

import workerSrc from "pdfjs-dist/build/pdf.worker.min?url";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function MaterialPreview({ material, onClose }) {

  const isPdf = material?.type === "pdf";
  const isVideo = material?.type === "video";

  const [numPages,setNumPages] = useState(0);
  const [scale,setScale] = useState(1.2);
  const containerRef = useRef(null);

  /* ⭐ IMPORTANT — FIX FOR CLOUDINARY RAW PDF */
  const pdfFile = {
    url: material?.url?.replace("/image/upload/","/raw/upload/"),
    withCredentials:false
  };

  /* ================= PDF LOAD ================= */
  const onLoadSuccess = ({numPages})=>{
    setNumPages(numPages);
  };

  /* ================= KEYBOARD CONTROLS ================= */
  useEffect(()=>{
    const handleKey=(e)=>{
      if(e.key==="Escape") onClose();
      if(e.key==="ArrowUp") setScale(prev=>prev+0.1);
      if(e.key==="ArrowDown") setScale(prev=>Math.max(0.6,prev-0.1));
    };

    window.addEventListener("keydown",handleKey);
    return ()=>window.removeEventListener("keydown",handleKey);
  },[]);

  /* ================= SCROLL TO PAGE ================= */
  const scrollToPage=(index)=>{
    const el=document.getElementById(`page_${index}`);
    if(el){
      el.scrollIntoView({behavior:"smooth"});
    }
  };

  console.log("PREVIEW MATERIAL:", material);

  /* ================= UI ================= */
  return (
    <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      className="
        fixed inset-0 z-[60]
        bg-black/90 backdrop-blur-xl
        flex items-center justify-center
        p-4
      "
    >

      <motion.div
        initial={{scale:0.95,y:20}}
        animate={{scale:1,y:0}}
        className="
          w-full max-w-7xl h-[95vh]
          bg-[#07080b]
          border border-white/10
          rounded-3xl
          overflow-hidden
          flex
        "
      >

        {/* ================= SIDEBAR THUMBNAILS ================= */}
        {isPdf && numPages>0 && (
          <div className="
            w-[120px]
            overflow-y-auto
            border-r border-white/10
            p-2
            space-y-2
            bg-black/40
          ">

            <Document file={pdfFile}>
              {[...Array(numPages)].map((_,i)=>(
                <div
                  key={i}
                  onClick={()=>scrollToPage(i+1)}
                  className="cursor-pointer hover:scale-105 transition"
                >
                  <Page
                    pageNumber={i+1}
                    width={90}
                    renderTextLayer={false}
                  />
                </div>
              ))}
            </Document>

          </div>
        )}

        {/* ================= MAIN VIEWER ================= */}
        <div className="flex-1 flex flex-col">

          {/* HEADER */}
          <div className="
            flex justify-between items-center
            px-6 py-3
            border-b border-white/10
          ">
            <div>
              <p className="font-semibold">
                {material.title || "Study Material"}
              </p>
              <p className="text-xs text-gray-400 capitalize">
                {material.className} • {material.subject} • {material.chapter}
              </p>
            </div>

            <div className="flex gap-2 text-xs text-gray-400">
              <span>Zoom: {(scale*100).toFixed(0)}%</span>
              <button
                onClick={onClose}
                className="p-2 hover:bg-red-500/20 rounded-lg"
              >
                <X/>
              </button>
            </div>
          </div>

          {/* CONTENT */}
          <div
            ref={containerRef}
            className="
              flex-1 overflow-y-auto
              flex justify-center
              bg-[#050507]
            "
          >

            {/* VIDEO PREVIEW */}
            {isVideo && (
              <video
                src={material.url}
                controls
                className="w-full h-full object-contain"
              />
            )}

            {/* PDF PREVIEW */}
            {isPdf && (
              <Document
                file={pdfFile}
                onLoadSuccess={onLoadSuccess}
                loading={<p className="text-gray-400 p-6">Loading PDF...</p>}
              >
                <div className="space-y-6 py-6">

                  {[...Array(numPages)].map((_,i)=>(
                    <motion.div
                      key={i}
                      id={`page_${i+1}`}
                      initial={{opacity:0}}
                      whileInView={{opacity:1}}
                      viewport={{once:true}}
                      className="
                        bg-[#0d0f14]
                        p-2
                        rounded-xl
                        shadow-lg
                      "
                    >
                      <Page
                        pageNumber={i+1}
                        scale={scale}
                        renderTextLayer={false}
                      />
                    </motion.div>
                  ))}

                </div>
              </Document>
            )}

          </div>

        </div>

      </motion.div>
    </motion.div>
  );
}
