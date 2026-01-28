import React from "react";

export default function InfoSection() {
  return (
    <section className="bg-gradient-to-br from-black via-gray-950 to-gray-900 py-20 text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-amber-400 mb-4">
          What Our Users Say
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-14">
          Thousands of students and parents trust FastTutors to find the right
          learning support.
        </p>

        {/* Testimonials */}
        <div className="grid gap-8 md:grid-cols-3">
          
          <Testimonial
            text="I found an amazing math tutor within minutes. The experience was smooth and stress-free."
            name="Rahul S."
            role="Class 10 Student"
          />

          <Testimonial
            text="The platform is very easy to use and the tutors are verified. Highly reliable!"
            name="Priya M."
            role="Parent"
          />

          <Testimonial
            text="Flexible search options made it simple to find a tutor near me who fit my schedule."
            name="Ankit K."
            role="College Student"
          />

        </div>
      </div>
    </section>
  );
}

/* ---------- Reusable Testimonial Card ---------- */
const Testimonial = ({ text, name, role }) => (
  <div
    className="bg-white/5 backdrop-blur-xl border border-white/10
               rounded-2xl p-6 text-left
               hover:border-amber-400 hover:shadow-xl
               transition-all duration-300"
  >
    {/* Quote */}
    <p className="text-gray-200 text-sm leading-relaxed mb-6">
      “{text}”
    </p>

    {/* User Info */}
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-amber-500/20
                      flex items-center justify-center
                      text-amber-400 font-bold">
        {name.charAt(0)}
      </div>
      <div>
        <p className="font-semibold text-white">{name}</p>
        <p className="text-xs text-gray-400">{role}</p>
      </div>
    </div>
  </div>
);
