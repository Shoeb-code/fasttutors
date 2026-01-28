export default function SelectFt() {
    return (
      <section className="bg-gradient-to-br from-black via-gray-950 to-gray-900
                          px-6 py-20 text-white">
        
        <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-xl
                        border border-white/10 rounded-3xl p-10">
  
          {/* Heading */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-400 mb-3">
              Why Choose <span className="text-amber-400">FastTutors?</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We focus on quality, flexibility, and trust to give you the best
              learning experience.
            </p>
          </div>
  
          {/* Points */}
          <ul className="space-y-6 max-w-3xl mx-auto">
            
            <li className="flex items-start gap-4 bg-black/40
                           border border-white/5 rounded-xl p-4
                           hover:border-emerald-400 transition">
              <span className="text-emerald-400 text-xl">✔</span>
              <p className="text-gray-300 text-lg">
                <span className="text-white font-medium">
                  Verified Tutors
                </span>{" "}
                with transparent profiles and trusted ratings.
              </p>
            </li>
  
            <li className="flex items-start gap-4 bg-black/40
                           border border-white/5 rounded-xl p-4
                           hover:border-blue-400 transition">
              <span className="text-blue-400 text-xl">✔</span>
              <p className="text-gray-300 text-lg">
                <span className="text-white font-medium">
                  Flexible Pricing
                </span>{" "}
                — pay per session or choose affordable plans.
              </p>
            </li>
  
            <li className="flex items-start gap-4 bg-black/40
                           border border-white/5 rounded-xl p-4
                           hover:border-violet-400 transition">
              <span className="text-violet-400 text-xl">✔</span>
              <p className="text-gray-300 text-lg">
                <span className="text-white font-medium">
                  Customized Study Plans
                </span>{" "}
                tailored for every learner.
              </p>
            </li>
  
            <li className="flex items-start gap-4 bg-black/40
                           border border-white/5 rounded-xl p-4
                           hover:border-amber-400 transition">
              <span className="text-amber-400 text-xl">✔</span>
              <p className="text-gray-300 text-lg">
                <span className="text-white font-medium">
                  Safe & Secure Learning
                </span>{" "}
                with student-first policies.
              </p>
            </li>
  
            <li className="flex items-start gap-4 bg-black/40
                           border border-white/5 rounded-xl p-4
                           hover:border-green-400 transition">
              <span className="text-green-400 text-xl">✔</span>
              <p className="text-gray-300 text-lg">
                <span className="text-white font-medium">
                  Easy Rescheduling
                </span>{" "}
                with live customer support.
              </p>
            </li>
  
          </ul>
        </div>
      </section>
    );
  }
  