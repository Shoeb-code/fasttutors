import { useState } from "react";
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
} from "lucide-react";

/* =========================================================
   SUBJECT DATA
========================================================= */

const subjects = [
  { name: "Mathematics", icon: <Calculator size={30} /> },
  { name: "Biology", icon: <Microscope size={30} /> },
  { name: "Economics", icon: <BarChart3 size={30} /> },
  { name: "History", icon: <History size={30} /> },
  { name: "Physics", icon: <Atom size={30} /> },
  { name: "Chemistry", icon: <FlaskConical size={30} /> },
  { name: "English", icon: <BookOpen size={30} /> },
  { name: "Hindi", icon: <Languages size={30} /> },
];

const classes = [
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
];

const materialTypes = ["Notes", "Videos", "PDFs"];

/* =========================================================
   MAIN SUBJECT GRID
========================================================= */

export default function StudyMaterialSubjects() {
  const [subject, setSubject] = useState(null);

  return (
    <div className="
  relative min-h-screen
  bg-gradient-to-br from-[#040507] via-[#0a0c14] to-[#06070a]
  text-white px-6 py-20 overflow-hidden
">

  {/* ===== AMBIENT BACKGROUND GLOW ===== */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-600/10 blur-[140px] rounded-full" />
    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />
  </div>

  {/* ===== HEADER ===== */}
  <div className="relative z-10 text-center mb-16">
    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
      Find Tutors According to your needs
    </h1>

    <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm">
      Choose your subject and explore structured study materials designed
      for modern learning.
    </p>
  </div>

  {/* ===== SUBJECT GRID ===== */}
  <div className="
    relative z-10
    max-w-6xl mx-auto
    grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7
  ">
    {subjects.map((s, i) => (
      <motion.div
        key={i}
        whileHover={{ y: -10, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setSubject(s)}
        className="
          group relative
          rounded-[26px] p-[1px]
          bg-gradient-to-b from-white/10 to-white/[0.02]
          transition-all duration-300
          cursor-pointer
        "
      >
        {/* CARD INNER */}
        <div className="
          relative h-full
          rounded-[26px]
          bg-[#0b0d12]
          border border-white/10
          backdrop-blur-xl
          px-6 py-10
          flex flex-col items-center
          transition-all duration-300
          group-hover:border-indigo-500
        ">

          {/* ICON GLOW */}
          <div className="
            absolute inset-0 opacity-0
            group-hover:opacity-100
            transition duration-500
            bg-gradient-to-br from-indigo-600/10 to-blue-600/5
            rounded-[26px]
          " />

          {/* ICON */}
          <div className="
            relative text-indigo-400 mb-4
            transition-transform duration-300
            group-hover:scale-110
          ">
            {s.icon}
          </div>

          {/* SUBJECT NAME */}
          <p className="relative text-sm font-medium tracking-wide">
            {s.name}
          </p>

          {/* BOTTOM HOVER LINE */}
          <span className="
            absolute bottom-0 left-1/2 -translate-x-1/2
            w-0 h-[2px] bg-gradient-to-r from-indigo-500 to-blue-500
            group-hover:w-16 transition-all duration-300
          " />
        </div>
      </motion.div>
    ))}
  </div>

  {/* ===== WIZARD ===== */}
  <AnimatePresence>
    {subject && (
      <SiliconWizard
        subject={subject}
        onClose={() => setSubject(null)}
      />
    )}
  </AnimatePresence>

</div>

  );
}

/* =========================================================
   SILICON VALLEY LEVEL WIZARD
========================================================= */

function SiliconWizard({ subject, onClose }) {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [selectedClass, setSelectedClass] = useState("");
  const [type, setType] = useState("");

  const steps = ["Class", "Material", "Confirm"];

  const canNext =
    (step === 0 && selectedClass) ||
    (step === 1 && type) ||
    step === 2;

  const handleContinue = () => {
    const slugSubject = subject.name.toLowerCase().replace(/\s+/g, "-");
    const slugClass = selectedClass.toLowerCase().replace(/\s+/g, "-");
    navigate(`/study-materials/${slugClass}/${slugSubject}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="
      fixed inset-0 z-50
      bg-black/70 backdrop-blur-2xl
      flex items-center justify-center
    "
    >
      {/* FLOATING PANEL */}
      <div className="
        w-[900px] h-[540px]
        rounded-[28px]
        bg-[#0b0d12]
        border border-white/10
        shadow-[0_0_120px_rgba(79,70,229,0.2)]
        flex overflow-hidden
      ">

        {/* ================= LEFT STEP RAIL ================= */}

        <div className="w-72 border-r border-white/10 p-10 relative">

          {/* Glow Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/10 to-transparent pointer-events-none" />

          <h2 className="text-indigo-400 font-semibold mb-12">
            {subject.name}
          </h2>

          {steps.map((s, i) => (
            <motion.div
              key={i}
              animate={{ scale: step === i ? 1.08 : 1 }}
              className="flex items-center gap-4 mb-8"
            >
              <div
                className={`
                w-10 h-10 rounded-xl flex items-center justify-center
                ${
                  step >= i
                    ? "bg-gradient-to-r from-indigo-600 to-blue-600"
                    : "bg-gray-800"
                }
              `}
              >
                {step > i ? <Check size={16} /> : i + 1}
              </div>

              <p className={`${step === i ? "text-white" : "text-gray-500"}`}>
                {s}
              </p>
            </motion.div>
          ))}

          <button
            onClick={onClose}
            className="absolute bottom-8 text-sm text-gray-400 hover:text-white"
          >
            Close ✕
          </button>
        </div>

        {/* ================= RIGHT CONTENT ================= */}

        <div className="flex-1 flex flex-col justify-center items-center px-12 relative">

          {/* Radial Glow */}
          <div className="absolute w-[420px] h-[420px] bg-indigo-600/10 blur-[120px] rounded-full" />

          <AnimatePresence mode="wait">

            {/* STEP 1 */}
            {step === 0 && (
              <WizardPage key="step1" title="Select Class">
                <Grid>
                  {classes.map((c) => (
                    <SiliconCard
                      key={c}
                      active={selectedClass === c}
                      onClick={() => setSelectedClass(c)}
                    >
                      {c}
                    </SiliconCard>
                  ))}
                </Grid>
              </WizardPage>
            )}

            {/* STEP 2 */}
            {step === 1 && (
              <WizardPage key="step2" title="Choose Material Type">
                <div className="flex gap-4">
                  {materialTypes.map((m) => (
                    <SiliconCard
                      key={m}
                      active={type === m}
                      onClick={() => setType(m)}
                    >
                      {m}
                    </SiliconCard>
                  ))}
                </div>
              </WizardPage>
            )}

            {/* STEP 3 */}
            {step === 2 && (
              <WizardPage key="step3" title="Confirm">
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 w-[320px]">
                  <p className="text-sm text-gray-400">Subject</p>
                  <p className="mb-3">{subject.name}</p>

                  <p className="text-sm text-gray-400">Class</p>
                  <p className="mb-3">{selectedClass}</p>

                  <p className="text-sm text-gray-400">Material</p>
                  <p>{type}</p>
                </div>
              </WizardPage>
            )}

          </AnimatePresence>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-10 z-10">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 rounded-xl bg-gray-800 hover:bg-gray-700"
              >
                Back
              </button>
            )}

            {step < 2 ? (
              <button
                disabled={!canNext}
                onClick={() => setStep(step + 1)}
                className={`
                px-8 py-2 rounded-xl font-medium
                ${
                  canNext
                    ? "bg-gradient-to-r from-indigo-600 to-blue-600"
                    : "bg-gray-800 cursor-not-allowed"
                }
              `}
              >
                Next →
              </button>
            ) : (
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

/* =========================================================
   PAGE WRAPPER
========================================================= */

function WizardPage({ title, children }) {
  return (
    <motion.div
      initial={{ y: 50, scale: 0.98, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="text-center z-10"
    >
      <h2 className="text-3xl font-semibold mb-10">{title}</h2>
      {children}
    </motion.div>
  );
}

/* =========================================================
   GRID
========================================================= */

const Grid = ({ children }) => (
  <div className="grid grid-cols-3 gap-4">{children}</div>
);

/* =========================================================
   SILICON CARD OPTION
========================================================= */

function SiliconCard({ children, active, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.06 }}
      onClick={onClick}
      className={`
      px-6 py-4 rounded-2xl border backdrop-blur-xl transition
      ${
        active
          ? "bg-gradient-to-r from-indigo-600 to-blue-600 border-indigo-500"
          : "bg-white/[0.02] border-white/10 hover:border-indigo-400"
      }
    `}
    >
      {children}
    </motion.button>
  );
}
