import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Calculator,
  Microscope,
  BarChart3,
  History,
  Atom,
  FlaskConical,
  BookOpen,
  Languages,
  Check,
  UploadCloud,
  Sparkles
} from "lucide-react";

import { AuthContext } from "../../context/AuthContextTutor.jsx";

/* =========================================================
   SUBJECT DATA
========================================================= */

const subjects = [
  { name: "Mathematics", icon: <Calculator size={28} /> },
  { name: "Biology", icon: <Microscope size={28} /> },
  { name: "Economics", icon: <BarChart3 size={28} /> },
  { name: "History", icon: <History size={28} /> },
  { name: "Physics", icon: <Atom size={28} /> },
  { name: "Chemistry", icon: <FlaskConical size={28} /> },
  { name: "English", icon: <BookOpen size={28} /> },
  { name: "Hindi", icon: <Languages size={28} /> },
];

const classes = [
  "Class 6","Class 7","Class 8","Class 9",
  "Class 10","Class 11","Class 12"
];

const materialTypes = ["Notes","Videos","PDFs"];

/* =========================================================
   🦄 UNICORN SAAS SUBJECT PAGE
========================================================= */

export default function StudyMaterialSubjects(){

  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";

  const [subject,setSubject] = useState(null);
  const navigate = useNavigate();

  return(
    <div className="
      relative min-h-screen
      bg-gradient-to-br from-[#040507] via-[#080b13] to-[#040507]
      text-white px-6 py-24 overflow-hidden
    ">

      {/* AMBIENT GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-indigo-600/10 blur-[180px] rounded-full"/>
      </div>

      {/* HERO */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-20">

        <div className="flex items-center justify-center gap-2 text-indigo-400 mb-4">
          <Sparkles size={16}/>
          Unicorn Study Hub
        </div>

        <h1 className="text-5xl font-bold tracking-tight">
          Explore Study Materials
        </h1>

        <p className="text-gray-400 mt-4 text-sm">
          Structured content built for modern learning.
        </p>

      </div>

      {/* ADMIN BUTTON */}
      {isAdmin && (
        <div className="fixed bottom-10 right-10 z-40">
          <button
            onClick={()=>navigate("/admin/materials")}
            className="
              flex items-center gap-2
              px-6 py-3 rounded-2xl
              backdrop-blur-xl
              bg-white/[0.06]
              border border-white/10
              hover:bg-indigo-600/20
              transition
            "
          >
            <UploadCloud size={18}/>
            Upload Material
          </button>
        </div>
      )}

      {/* SUBJECT GRID */}
      <div className="
        relative z-10
        max-w-6xl mx-auto
        grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8
      ">

        {subjects.map((s,i)=>(
          <motion.div
            key={i}
            whileHover={{y:-10,scale:1.04}}
            whileTap={{scale:0.96}}
            onClick={()=>setSubject(s)}
            className="
              group relative
              rounded-[26px]
              p-[1px]
              bg-gradient-to-b from-white/10 to-white/[0.02]
              cursor-pointer
            "
          >

            <div className="
              relative rounded-[26px]
              bg-[#0b0d12]
              border border-white/10
              backdrop-blur-xl
              px-6 py-12
              flex flex-col items-center
              transition
              group-hover:border-indigo-500
              group-hover:shadow-[0_0_40px_rgba(79,70,229,0.25)]
            ">

              <div className="
                absolute inset-0 opacity-0
                group-hover:opacity-100
                transition duration-500
                bg-gradient-to-br from-indigo-600/10 to-blue-600/5
                rounded-[26px]
              "/>

              <div className="relative text-indigo-400 mb-5">
                {s.icon}
              </div>

              <p className="relative text-sm font-semibold tracking-wide">
                {s.name}
              </p>

            </div>
          </motion.div>
        ))}

      </div>

      <AnimatePresence>
        {subject && (
          <SiliconWizard
            subject={subject}
            onClose={()=>setSubject(null)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

/* =========================================================
   🦄 WIZARD — PRODUCTION LAYOUT
========================================================= */

function SiliconWizard({subject,onClose}){

  const navigate = useNavigate();

  const [step,setStep]=useState(0);
  const [selectedClass,setSelectedClass]=useState("");
  const [type,setType]=useState("");

  const subjectMap={ mathematics:"maths" };

  const canNext =
    (step===0 && selectedClass) ||
    (step===1 && type) ||
    step===2;

  const handleContinue=()=>{
    const slugSubject = subject.name.toLowerCase().replace(/\s+/g,"-");
    const slugClass = selectedClass.toLowerCase().replace(/\s+/g,"-");
    const dbSubject = subjectMap[slugSubject] || slugSubject;
    navigate(`/student/study-materials/${slugClass}/${dbSubject}`);
  };

  return(
    <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-2xl flex items-center justify-center"
    >

      <div className="
        w-[920px] h-[560px]
        rounded-[30px]
        bg-[#0b0d12]
        border border-white/10
        shadow-[0_0_120px_rgba(79,70,229,0.25)]
        flex overflow-hidden
      ">

        {/* LEFT RAIL */}
        <div className="w-72 border-r border-white/10 p-10">

          <h2 className="text-indigo-400 font-semibold mb-12">
            {subject.name}
          </h2>

          {["Class","Material","Confirm"].map((s,i)=>(
            <div key={i} className="flex items-center gap-4 mb-8">
              <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center
                ${step>=i
                  ? "bg-gradient-to-r from-indigo-600 to-blue-600"
                  : "bg-gray-800"}
              `}>
                {step>i ? <Check size={16}/> : i+1}
              </div>

              <p className={`${step===i?"text-white":"text-gray-500"}`}>
                {s}
              </p>
            </div>
          ))}

          <button
            onClick={onClose}
            className="absolute bottom-8 text-sm text-gray-400 hover:text-white"
          >
            Close ✕
          </button>

        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 flex flex-col justify-center items-center px-12">

          <AnimatePresence mode="wait">

            {step===0 && (
              <WizardPage title="Select Class">
                <Grid>
                  {classes.map(c=>(
                    <SiliconCard
                      key={c}
                      active={selectedClass===c}
                      onClick={()=>setSelectedClass(c)}
                    >
                      {c}
                    </SiliconCard>
                  ))}
                </Grid>
              </WizardPage>
            )}

            {step===1 && (
              <WizardPage title="Choose Material Type">
                <div className="flex gap-4">
                  {materialTypes.map(m=>(
                    <SiliconCard
                      key={m}
                      active={type===m}
                      onClick={()=>setType(m)}
                    >
                      {m}
                    </SiliconCard>
                  ))}
                </div>
              </WizardPage>
            )}

            {step===2 && (
              <WizardPage title="Confirm">
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 w-[320px]">
                  <p className="text-gray-400 text-sm">Subject</p>
                  <p className="mb-3">{subject.name}</p>

                  <p className="text-gray-400 text-sm">Class</p>
                  <p className="mb-3">{selectedClass}</p>

                  <p className="text-gray-400 text-sm">Material</p>
                  <p>{type}</p>
                </div>
              </WizardPage>
            )}

          </AnimatePresence>

          <div className="flex gap-4 mt-10">
            {step>0 && (
              <button
                onClick={()=>setStep(step-1)}
                className="px-6 py-2 rounded-xl bg-gray-800 hover:bg-gray-700"
              >
                Back
              </button>
            )}

            {step<2 ? (
              <button
                disabled={!canNext}
                onClick={()=>setStep(step+1)}
                className={`
                  px-8 py-2 rounded-xl font-medium
                  ${canNext
                    ? "bg-gradient-to-r from-indigo-600 to-blue-600"
                    : "bg-gray-800 cursor-not-allowed"}
                `}
              >
                Next →
              </button>
            ):(
              <button
                onClick={handleContinue}
                className="px-8 py-2 rounded-xl bg-green-600 hover:bg-green-500"
              >
                Continue 🚀
              </button>
            )}
          </div>

        </div>

      </div>
    </motion.div>
  );
}

/* ========================================================= */

function WizardPage({title,children}){
  return(
    <motion.div
      initial={{y:40,opacity:0}}
      animate={{y:0,opacity:1}}
      exit={{y:-40,opacity:0}}
      className="text-center"
    >
      <h2 className="text-3xl font-semibold mb-10">{title}</h2>
      {children}
    </motion.div>
  );
}

const Grid = ({children}) => (
  <div className="grid grid-cols-3 gap-4">{children}</div>
);

function SiliconCard({children,active,onClick}){
  return(
    <motion.button
      whileHover={{scale:1.06}}
      onClick={onClick}
      className={`
        px-6 py-4 rounded-2xl border backdrop-blur-xl
        ${active
          ? "bg-gradient-to-r from-indigo-600 to-blue-600 border-indigo-500"
          : "bg-white/[0.02] border-white/10 hover:border-indigo-400"}
      `}
    >
      {children}
    </motion.button>
  );
}