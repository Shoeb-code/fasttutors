import { motion } from "framer-motion";

const fee = {
  1: [
    "₹1000–1500 for 8 classes / month",
    "₹2000–2500 for 12 classes / month",
    "₹2500–3000 for 16 classes / month",
    "₹3500 for 20 classes / month",
  ],
  2: [
    "₹1000–1500 for 8 classes / month",
    "₹2000–2500 for 12 classes / month",
    "₹2500–3000 for 16 classes / month",
    "₹3500 for 20 classes / month",
  ],
  3: [
    "₹1000–1500 for 8 classes / month",
    "₹2000–2500 for 12 classes / month",
    "₹2500–3000 for 16 classes / month",
    "₹3500 for 20 classes / month",
  ],
  4: [
    "₹1500–2000 for 8 classes / month",
    "₹2500–3000 for 12 classes / month",
    "₹3000–3500 for 16 classes / month",
    "₹4000 for 20 classes / month",
  ],
  5: [
    "₹2000–2500 for 8 classes / month",
    "₹2500–3500 for 12 classes / month",
    "₹3500–4000 for 16 classes / month",
    "₹4500 for 20 classes / month",
  ],
  6: [
    "₹2000–2500 for 8 classes / month",
    "₹2500–3500 for 12 classes / month",
    "₹3500–4000 for 16 classes / month",
    "₹4500 for 20 classes / month",
  ],
  7: [
    "₹2500–3000 for 8 classes / month",
    "₹3000–3500 for 12 classes / month",
    "₹3500–4500 for 16 classes / month",
    "₹5000 for 20 classes / month",
  ],
  8: [
    "₹2500–3000 for 8 classes / month",
    "₹3000–3500 for 12 classes / month",
    "₹3500–4500 for 16 classes / month",
    "₹5000 for 20 classes / month",
  ],
  9: [
    "₹2500–3000 for 8 classes / month",
    "₹3000–3500 for 12 classes / month",
    "₹4000–4500 for 16 classes / month",
    "₹5000–5500 for 20 classes / month",
  ],
  10: [
    "₹2500–3000 for 8 classes / month",
    "₹3000–3500 for 12 classes / month",
    "₹4000–4500 for 16 classes / month",
    "₹5000–6000 for 20 classes / month",
  ],
  11: [
    "₹3000–3500 for 8 classes / month",
    "₹4000–5000 for 12 classes / month",
    "₹5500–6500 for 16 classes / month",
    "₹7000–8000 for 20 classes / month",
  ],
  12: [
    "₹3000–3500 for 8 classes / month",
    "₹4000–5000 for 12 classes / month",
    "₹5500–6500 for 16 classes / month",
    "₹7000–8000 for 20 classes / month",
  ],
};

function StepFour({ onNext, onPrev, data, setData }) {
  const selectedClass = data.studentClass;
  const feeOptions = fee[selectedClass] || [];

  return (
    <div className="w-full border border-white/10 rounded-2xl p-6 lg:p-8 text-gray-200 bg-white/5 backdrop-blur-sm">
      
     

      {/* Title */}
      <h2 className="text-3xl font-bold mb-2">
        Choose Your Budget
      </h2>
      <p className="text-gray-400 mb-8">
        Select a monthly fee range that works best for you
      </p>

      {/* Fee Options */}
      <div className="grid gap-4 mb-14">
        {feeOptions.map((value, index) => {
          const selected = data.fee === value;

          return (
            <motion.label
              key={index}
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
                name="fee"
                value={value}
                checked={selected}
                onChange={() => setData({ ...data, fee: value })}
                className="hidden"
              />

              <span className="text-lg font-medium">{value}</span>

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
          disabled={!data.fee}
          className="px-12 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600
                     text-white font-bold shadow-lg disabled:opacity-40"
        >
          Continue →
        </motion.button>
      </div>
    </div>
  );
}

export default StepFour;
