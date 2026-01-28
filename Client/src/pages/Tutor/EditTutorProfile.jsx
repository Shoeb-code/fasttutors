import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContextTutor.jsx";
import axios from "../../axiosConfig.js";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function EditTutorProfile() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    whatShap: "",
    mobile: "",
    city: "",
    gender: "",
    highestQualification: "",
    experience: "",
    subject: "",
    modeOfTeaching: "",
    aboutTutor: "",
    profileCompleted: true,
  });

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    if (!user) {
      navigate("/tutor-login");
      return;
    }

    setEditForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      whatShap: user.whatShap || "",
      mobile: user.mobile || "",
      city: user.city || "",
      gender: user.gender || "",
      highestQualification: user.highestQualification || "",
      experience: user.experience || "",
      subject: user.subject || "",
      modeOfTeaching: user.modeOfTeaching || "",
      aboutTutor: user.aboutTutor || "",
      profileCompleted: true,
    });

    setPreview(user.profilePhoto || null);
  }, [user, navigate]);

  const handleChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const wordCount = editForm.aboutTutor
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const isBioValid = wordCount >= 50;

  /* ================= UPDATE PROFILE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isBioValid) return alert("Minimum 50 words required");

    try {
      const { data } = await axios.put(
        "/tutor/auth/edit-profile",
        editForm
      );

      if (data.success) {
        setUser(data.user);
        alert("Profile updated successfully 🎉");
        navigate("/tutor/dashboard");
      }
    } catch {
      alert("Update failed");
    }
  };

  /* ================= PHOTO ================= */
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/"))
      return alert("Invalid image file");
    if (file.size > 10 * 1024 * 1024)
      return alert("Max 10MB allowed");

    setProfilePhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!profilePhoto) return alert("Select image first");

    try {
      setUploading(true);
      const fd = new FormData();
      fd.append("profilePhoto", profilePhoto);

      const { data } = await axios.put(
        "/tutor/auth/update-photo",
        fd
      );

      if (data.success && data.user) {
        setUser(data.user);
        setPreview(data.user.profilePhoto);
        alert("Profile photo updated");
      }
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950/40 to-black px-4 py-16 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* HEADER */}
        <div className="mb-14">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Edit Tutor Profile
          </h1>
          <p className="text-neutral-400 mt-2">
            A complete profile attracts more parents & better leads
          </p>
        </div>

        {/* PHOTO */}
        <motion.div className="mb-12 rounded-3xl bg-white/5 p-8 border border-white/10 flex flex-col items-center">
          <img
            src={preview || "/default-avatar.png"}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover border-4 border-amber-400/60 mb-4"
          />

          <label className="text-sm text-amber-400 cursor-pointer mb-3">
            Change profile photo
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </label>

          <motion.button
            onClick={handleUpload}
            disabled={uploading}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold"
          >
            {uploading ? "Uploading..." : "Update Photo"}
          </motion.button>
        </motion.div>

        {/* FORM */}
        <motion.div className="rounded-3xl bg-white/5 p-10 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-16">
            <Section title="Personal Information">
              <TwoCol>
                <Input label="First Name" name="firstName" value={editForm.firstName} onChange={handleChange} />
                <Input label="Last Name" name="lastName" value={editForm.lastName} onChange={handleChange} />
                <Input label="WhatsApp Number" name="whatShap" value={editForm.whatShap} onChange={handleChange} />
                <Input label="Mobile Number" name="mobile" value={editForm.mobile} onChange={handleChange} />
                <Input label="City" name="city" value={editForm.city} onChange={handleChange} />

                <Select label="Gender" name="gender" value={editForm.gender} onChange={handleChange} options={["Male", "Female", "Other"]} />
                <Input label="Highest Qualification" name="highestQualification" value={editForm.highestQualification} onChange={handleChange} />
                <Input label="Experience (Years)" name="experience" type="number" value={editForm.experience} onChange={handleChange} />
                <Input label="Subject(s)" name="subject" value={editForm.subject} onChange={handleChange} />
                <Select label="Mode of Teaching" name="modeOfTeaching" value={editForm.modeOfTeaching} onChange={handleChange} options={["Online", "Offline", "Both"]} />
              </TwoCol>
            </Section>

            <Section title="About You">
              <textarea
                name="aboutTutor"
                value={editForm.aboutTutor}
                onChange={handleChange}
                rows={6}
                className="w-full rounded-2xl px-5 py-4 bg-neutral-800 border border-neutral-700 text-white"
              />
              <p className={`text-sm ${isBioValid ? "text-green-400" : "text-red-400"}`}>
                {wordCount}/50 words minimum
              </p>
            </Section>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!isBioValid}
                className="px-10 py-4 rounded-xl bg-white text-black font-bold disabled:opacity-50"
              >
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default EditTutorProfile;

/* ===== UI HELPERS ===== */

function Section({ title, children }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-neutral-200">{title}</h2>
      {children}
    </div>
  );
}

function TwoCol({ children }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>;
}

function Input({ label, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-neutral-400">{label}</label>
      <input
        {...props}
        className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-3 text-white"
      />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-neutral-400">{label}</label>
      <select
        {...props}
        className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-3 text-white"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
