



const steps = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Finish"];
const Stepper = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-center gap-8">
      {steps.map((label, index) => {
        const stepNo = index + 1;
        const active = stepNo === currentStep;
        const completed = stepNo < currentStep;

        return (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center
              ${
                completed
                  ? "bg-green-800  text-white"
                  : active
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {completed ? "✓" : stepNo}
            </div>

            <span
              className={`text-sm ${
                active ? "text-blue-600 font-semibold" : "text-gray-500"
              }`}
            >
              {label}
            </span>

            {index !== steps.length - 1 && (
              <div className="w-16 h-[2px] bg-gray-300" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
