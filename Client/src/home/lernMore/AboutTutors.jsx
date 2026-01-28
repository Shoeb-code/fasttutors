import Ab12 from "../../assets/ab1.jpg";
import Ab13 from "../../assets/ab2.jpg";
import Ab14 from "../../assets/ab3.jpg";

export default function AboutTutors() {
  return (
    <section className="bg-gradient-to-br from-black via-gray-950 to-gray-900
                        px-6 py-20 text-white">
      
      {/* Section Heading */}
      <div className="max-w-6xl mx-auto text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-500 mb-4">
          Home Tuition <span className="text-white">(Online & Offline)</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Choose flexible learning modes designed to fit every student’s needs.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Offline Tuition */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10
                        rounded-3xl p-6 hover:border-green-400 transition">
          <img
            src={Ab12}
            alt="Offline Home Tuition"
            className="w-full h-48 object-cover rounded-2xl mb-5"
          />

          <h3 className="text-xl font-bold text-green-400 mb-2">
            🏠 Offline Home Tuition
          </h3>

          <p className="text-gray-300 text-sm leading-relaxed">
            A tutor visits your home at scheduled times. Ideal for students who
            benefit from personal, face-to-face interaction.
          </p>
        </div>

        {/* Online Tuition */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10
                        rounded-3xl p-6 hover:border-blue-400 transition">
          <img
            src={Ab13}
            alt="Online Home Tuition"
            className="w-full h-48 object-cover rounded-2xl mb-5"
          />

          <h3 className="text-xl font-bold text-blue-400 mb-2">
            💻 Online Home Tuition
          </h3>

          <p className="text-gray-300 text-sm leading-relaxed">
            Learn live via Zoom or Google Meet. Perfect for students seeking
            flexibility and access to top tutors across regions.
          </p>
        </div>

        {/* Scheduling */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10
                        rounded-3xl p-6 hover:border-amber-400 transition">
          <img
            src={Ab14}
            alt="Easy Scheduling"
            className="w-full h-48 object-cover rounded-2xl mb-5"
          />

          <h3 className="text-xl font-bold text-amber-400 mb-2">
            📅 Easy Scheduling
          </h3>

          <p className="text-gray-300 text-sm leading-relaxed">
            Plan sessions effortlessly using our integrated calendar system
            that works around your availability.
          </p>
        </div>

      </div>
    </section>
  );
}
