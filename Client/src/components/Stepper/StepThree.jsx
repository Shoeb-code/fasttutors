import { motion } from "framer-motion";

export default function StepThree({ onNext, onPrev, data, setData }) {
  return (
    <div className="w-full border border-white/10 rounded-2xl p-6 lg:p-8 text-gray-200 bg-white/5 backdrop-blur-sm">
      
     
  

      {/* Title */}
      <h2 className="text-3xl font-bold mb-2">
        Weekly Sessions
      </h2>
      <p className="text-gray-400 mb-8">
        How many classes do you want per week?
      </p>

      {/* Options */}
      <div className="grid gap-4 mb-14">
        {[
       { label: "2 classes in a week", value: 2 },
       { label: "3 classes in a week", value: 3 },
       { label: "4 classes in a week", value: 4 },
       { label: "5 classes in a week", value: 5 },
       { label: "6 classes in a week", value: 6 },
        ].map((item) => {
          const selected = data.classInWeek === item.value;

          return (
            <motion.label
              key={item.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center justify-between px-6 py-4 rounded-xl cursor-pointer border transition
                ${
                  selected
                    ? "border-blue-600 bg-blue-600/10"
                    : "border-white/10 bg-white/5 hover:border-blue-400/50"
                }`}
            >
              <input
  type="radio"
  name="classInWeek"
  value={item.value}
  checked={data.classInWeek === item.value}
  onChange={(e) =>
    setData({ ...data, classInWeek: Number(e.target.value) })
  }
  className="hidden"
/>

              <span className="text-lg font-medium">{item.label}</span>

              {/* Radio */}
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
          className="px-10 py-4 rounded-xl border border-gray-500 text-gray-300
                     hover:bg-gray-800 transition font-semibold"
        >
          ← Previous
        </button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onNext}
          disabled={!data.classInWeek}
          className="px-12 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600
                     text-white font-bold shadow-lg disabled:opacity-40"
        >
          Continue →
        </motion.button>
      </div>
    </div>
  );
}
