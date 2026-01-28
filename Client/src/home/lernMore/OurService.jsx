import Ch1 from "../../assets/ch1.jpg";
import Ch2 from "../../assets/ch2.jpg";
import Ch3 from "../../assets/ch3.jpg";
import Ch4 from "../../assets/ch4.jpg";
import Ch5 from "../../assets/ch5.jpg";
import Ch6 from "../../assets/ch6.jpg";

export default function OurServices() {
  return (
    <section className="bg-gradient-to-br from-black via-gray-950 to-gray-900
                        px-6 py-20 text-white rounded-3xl m-6">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

        {/* LEFT – SERVICES */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-500 mb-6">
            Our Services
          </h2>

          <p className="text-gray-400 mb-10 max-w-xl">
            FastTutors offers a wide range of academic services designed to help
            students excel and tutors grow professionally.
          </p>

          <div className="space-y-5">
            <ServiceItem
              icon="📚"
              title="Subject Tutoring"
              desc="Maths, Science, English, Social Studies, Languages & more."
            />

            <ServiceItem
              icon="✍️"
              title="Exam Preparation"
              desc="Boards, Olympiads, JEE, NEET, SAT, IELTS and competitive exams."
            />

            <ServiceItem
              icon="💻"
              title="Homework & Assignments"
              desc="Guidance and support for daily homework and projects."
            />

            <ServiceItem
              icon="🎓"
              title="Test Series & Assessments"
              desc="Regular tests with performance tracking and feedback."
            />

            <ServiceItem
              icon="🧠"
              title="Learning Strategy Consulting"
              desc="Personalized learning plans for both high performers and struggling learners."
            />
          </div>
        </div>

        {/* RIGHT – IMAGES */}
        <div className="grid grid-cols-2 gap-5">
          {[Ch1, Ch2, Ch3, Ch4, Ch5, Ch6].map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt="FastTutors services"
              className="w-full h-40 object-cover rounded-2xl
                         border border-white/10 shadow-md
                         hover:scale-[1.03] transition"
            />
          ))}
        </div>

      </div>
    </section>
  );
}

/* ---------- Service Item ---------- */
const ServiceItem = ({ icon, title, desc }) => (
  <div className="flex gap-4 bg-white/5 backdrop-blur-xl
                  border border-white/10 rounded-2xl p-4
                  hover:border-blue-400 transition">
    <span className="text-2xl">{icon}</span>
    <div>
      <h4 className="text-lg font-semibold text-white">{title}</h4>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>
  </div>
);
