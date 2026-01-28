import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-black via-gray-950 to-gray-900
                        text-gray-300 mt-20 border-t border-white/10">
      
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-extrabold text-blue-400 mb-4">
            Fast<span className="text-amber-400">Tutors</span>
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Connecting students with trusted tutors for online and offline
            learning across India.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-400 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/find-tutors" className="hover:text-blue-400 transition">
                Find Tutors
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-400 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* FOR STUDENTS */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            For Students
          </h4>
          <ul className="space-y-2 text-sm">
            <li>Find Home Tutors</li>
            <li>Online Classes</li>
            <li>Exam Preparation</li>
            <li>Flexible Scheduling</li>
          </ul>
        </div>

        {/* FOR TUTORS */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            For Tutors
          </h4>
          <ul className="space-y-2 text-sm">
            <li>Become a Tutor</li>
            <li>Earn Extra Income</li>
            <li>Manage Students</li>
            <li>Set Your Rates</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row
                        justify-between items-center text-sm gap-4">
          <p className="text-gray-500">
            © {new Date().getFullYear()} FastTutors. All rights reserved.
          </p>

          <div className="flex gap-6">
            <span className="hover:text-blue-400 cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-blue-400 cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
