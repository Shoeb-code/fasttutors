import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { studyMaterialData } from "../../data/studyMaterialData";
import { PlayCircle, FileText, BookOpen } from "lucide-react";

export default function StudyMaterialContent() {
  const { className, subject } = useParams();

  const data = studyMaterialData[className]?.[subject];

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#06070a]">
        No Study Material Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06070a] text-white px-6 py-20">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-14">
        <h1 className="text-5xl font-bold capitalize">
          {subject.replace("-", " ")} — {className.replace("-", " ")}
        </h1>

        <p className="text-gray-400 mt-4 max-w-xl">
          {data.description}
        </p>
      </div>

      {/* CHAPTERS */}
      <div className="max-w-6xl mx-auto space-y-14">

        {data.chapters.map((chapter, index) => (
          <div key={index}>

            <h2 className="text-2xl font-semibold mb-6">
              {chapter.title}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chapter.materials.map((item, i) => (
                <MaterialCard key={i} item={item} />
              ))}
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

/* =========================================================
   CARD COMPONENT
========================================================= */

function MaterialCard({ item }) {

  const icon =
    item.type === "video"
      ? <PlayCircle size={20}/>
      : item.type === "pdf"
      ? <FileText size={20}/>
      : <BookOpen size={20}/>;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group rounded-2xl border border-white/10 bg-[#0b0d12] p-6"
    >
      <div className="flex items-center gap-2 mb-3 text-indigo-400">
        {icon}
        <span className="text-xs uppercase">{item.type}</span>
      </div>

      <h3 className="text-lg font-semibold">
        {item.title}
      </h3>

      <button className="mt-5 w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500">
        Open →
      </button>
    </motion.div>
  );
}
