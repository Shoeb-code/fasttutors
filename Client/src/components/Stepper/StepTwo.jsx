import { motion } from "framer-motion";
import { Home, Laptop, User } from "lucide-react";

const StepTwo = ({ onNext, onPrev, data, setData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full border-2 border-gray-800 m-3 p-4 rounded-2xl text-gray-200"
    >
     

      {/* Tuition Location */}
      <h2 className="text-2xl font-bold mb-6">
        Where would you like to take tuitions?
      </h2>

      <div className="grid gap-4 mb-14">
        {[
          { label: "At Your Home", value: "home", icon: <Home /> },
          { label: "At Tutor's Home", value: "tutor_home", icon: <User /> },
          { label: "Online", value: "online", icon: <Laptop /> },
        ].map((item) => {
          const selected = data.tuitionPlace === item.value;
          return (
            <motion.label
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              key={item.value}
              className={`flex items-center gap-5 p-5 rounded-2xl cursor-pointer border transition
                ${
                  selected
                    ? "border-blue-600 bg-blue-600/10"
                    : "border-white/10 bg-white/5 hover:border-blue-400/50"
                }`}
            >
              <input
                type="radio"
                name="tuitionPlace"
                value={item.value}
                checked={selected}
                onChange={(e) =>
                  setData({ ...data, tuitionPlace: e.target.value })
                }
                className="hidden"
              />

              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center
                ${
                  selected
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-300"
                }`}
              >
                {item.icon}
              </div>

              <span className="text-lg font-medium">{item.label}</span>

              {/* Radio */}
              <div
                className={`ml-auto w-6 h-6 rounded-full border-2 flex items-center justify-center
                ${
                  selected ? "border-blue-600" : "border-gray-400"
                }`}
              >
                {selected && (
                  <span className="w-3 h-3 bg-blue-500 rounded-full" />
                )}
              </div>
            </motion.label>
          );
        })}
      </div>

      {/* Tutor Gender */}
      <h2 className="text-2xl font-bold mb-6">
        Select Preferred Tutor's Gender
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
        {[
          { label: "Any", value: "any" },
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ].map((item) => {
          const selected = data.gender === item.value;
          return (
            <motion.label
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              key={item.value}
              className={`flex items-center justify-between px-6 py-4 rounded-xl cursor-pointer border transition
                ${
                  selected
                    ? "border-blue-600 bg-blue-600/10"
                    : "border-white/10 bg-white/5 hover:border-blue-400/50"
                }`}
            >
              <input
                type="radio"
                name="gender"
                value={item.value}
                checked={selected}
                onChange={(e) =>
                  setData({ ...data, gender: e.target.value })
                }
                className="hidden"
              />

              <span className="text-lg font-medium">{item.label}</span>

              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                ${
                  selected ? "border-blue-600" : "border-gray-400"
                }`}
              >
                {selected && (
                  <span className="w-3 h-3 bg-blue-500 rounded-full" />
                )}
              </div>
            </motion.label>
          );
        })}
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-6">
        <button
          onClick={onPrev}
          className="px-10 py-4 rounded-xl border border-gray-500 text-gray-300 hover:bg-gray-800 transition font-semibold"
        >
          ← Previous
        </button>

        <motion.button
  onClick={onNext}
  disabled={!data.tuitionPlace || !data.gender}
  className="px-12 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600
             text-white font-bold shadow-lg disabled:opacity-40"
>
  Continue →
</motion.button>
      </div>
    </motion.div>
  );
};

export default StepTwo;
