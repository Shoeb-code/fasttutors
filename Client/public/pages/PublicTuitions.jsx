import React, { useEffect, useState } from "react";
import axios from "../../src/axiosConfig.js";
import { MapPin, CalendarDays, Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PublicTuitions() {

  const navigate = useNavigate();

  const [allTuitions, setAllTuitions] = useState([]);
  const [filteredTuitions, setFilteredTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterSubject,setFilterSubject]=useState("all");
  const [filterCity,setFilterCity]=useState("all");
  const [filterClass,setFilterClass]=useState("all");


  const [formData, setFormData] = useState({
    subject: "",
    city: "",
    student_Class: "",
  });

  /* ================= INPUT CHANGE ================= */

  const handlechange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= FETCH ALL ================= */

  const fetchAllTuitions = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/public/all-tuitions");

      // sort by newest enquiry
      const sorted = data.requestTuitions.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setAllTuitions(sorted);

    } catch (error) {
      console.log("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTuitions();
  }, []);

  /* ================= SEARCH ================= */
  
  useEffect(()=>{
    let filtered = [...allTuitions]

    if(filterSubject!=='all'){

    }
  })
  

  /* ================= RESET ================= */

  const handleReset = () => {

    setFilteredTuitions([]);

    setFormData({
      subject: "",
      city: "",
      student_Class: "",
    });

  };

  /* ================= APPLY ================= */

  const handleApply = async (tuitionId) => {

    try {

      const { data } = await axios.post("/tutor/apply", {
        tuitionId
      });

      if (data.success) {
        alert("Applied successfully!");
      }

    } catch (error) {

      if (error.response?.status === 401) {

        navigate("/login");

      } else {

        alert("Unable to apply");

      }

    }

  };

  const displayedTuitions =
    filteredTuitions.length > 0 ? filteredTuitions : allTuitions;

  /* ================= LOADING ================= */

  if (loading) {

    return (
      <div className="min-h-screen flex justify-center items-center bg-black text-white">
        Loading enquiries...
      </div>
    );

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-900 text-white px-6 py-12">

      {/* ================= HEADER ================= */}

      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Tuition Enquiries
        </h1>
        <p className="text-gray-400">
          Find students looking for home tutors
        </p>
      </div>

      {/* ================= SEARCH BAR ================= */}

      <div className="max-w-6xl mx-auto bg-gray-900 border border-gray-700 p-6 rounded-xl mb-10">

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-4 gap-4"
        >

          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handlechange}
            placeholder="Subject"
            className="bg-black border border-gray-700 px-4 py-2 rounded-lg"
          />

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handlechange}
            placeholder="City"
            className="bg-black border border-gray-700 px-4 py-2 rounded-lg"
          />

          <input
            type="text"
            name="class"
            value={formData.student_Class}
            onChange={handlechange}
            placeholder="Class"
            className="bg-black border border-gray-700 px-4 py-2 rounded-lg"
          />

          <div className="flex gap-2">

            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Search
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="flex-1 bg-gray-700 rounded-lg"
            >
              Reset
            </button>

          </div>

        </form>

      </div>

      {/* ================= CARDS ================= */}

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {displayedTuitions.map((tuition) => (

          <div
            key={tuition._id}
            className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition"
          >

            {/* SUBJECT */}
            <h3 className="text-xl font-semibold text-cyan-400">
              {tuition.subject}
            </h3>

            {/* CLASS */}
            <p className="text-gray-300">
              Class {tuition.studentClass}
            </p>

            {/* LOCATION */}
            <p className="flex items-center gap-2 text-gray-400 mt-2">
              <MapPin size={14} />
              {tuition.location}
            </p>

            {/* WEEK */}
            <p className="flex items-center gap-2 text-gray-400 mt-1">
              <CalendarDays size={14} />
              {tuition.classInWeek} classes / week
            </p>

            {/* FEE */}
            <p className="flex items-center gap-2 text-amber-400 font-semibold mt-3">
              <Coins size={16} />
              ₹{tuition.fee}
            </p>

            {/* DATE */}
            <p className="text-xs text-gray-500 mt-2">
              Posted on{" "}
              {new Date(tuition.createdAt).toLocaleDateString()}
            </p>

            {/* APPLY BUTTON */}
            <button
              onClick={() => handleApply(tuition._id)}
              className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-blue-600 py-2 rounded-lg hover:shadow-lg"
            >
              Apply Now
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default PublicTuitions;