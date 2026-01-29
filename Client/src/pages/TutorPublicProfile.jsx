import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axiosConfig";
import {
  Video,
  BookOpen,
  Star,
  BadgeCheck,
  MapPin,
  MessageCircle,
  Calendar,
  Brain,
 
  GraduationCap,
} from "lucide-react";

/* ===================================================== */

const TutorPublicProfile = () => {
  const { tutorId } = useParams();

  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  const parentId = localStorage.getItem("parentId");
  const token = localStorage.getItem("accessToken");

  /* ================= FETCH TUTOR ================= */
  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const { data } = await axios.get(`/tutor/public/${tutorId}`);
        if (data.success) setTutor(data.tutor);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTutor();
  }, [tutorId]);

  /* ================= FETCH REVIEWS ================= */
  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/reviews/${tutorId}`);
      if (data.success) {
        setReviews(data.reviews);
        setAvgRating(data.avgRating);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [tutorId]);

  /* ================= DELETE REVIEW ================= */
  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await axios.delete(`/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
    } catch {
      alert("Failed to delete review");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading profile...
      </div>
    );

  if (!tutor)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Tutor not found
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-900 text-white">

      {/* ================= HERO ================= */}
      <div className="border-b border-white/10 bg-gradient-to-r from-indigo-900/20 to-purple-900/10">
        <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col md:flex-row gap-10 items-center">

          <img
            src={tutor.profilePhoto || "/default-avatar.png"}
            className="w-36 h-36 rounded-full border-4 border-indigo-500/40
                       shadow-lg shadow-indigo-500/20"
          />

          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold
                           bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400
                           bg-clip-text text-transparent">
              {tutor.firstName} {tutor.lastName}
            </h1>


            

            <p className="text-gray-400 mt-2 flex items-center gap-2 text-lg">
              <BookOpen size={18} />{tutor.subject}
              <span className="mx-2">•</span>
              <MapPin size={18} /> {tutor.city}

              <span className="mx-2">•</span>
              <Brain size={18}/>{tutor.experience}+  years

              <span className="mx-2">•</span>
              <GraduationCap size={18} /> {tutor.highestQualification}
            </p>

            <div className="flex items-center gap-4 mt-4">
              <span className="flex items-center gap-2 text-amber-400 text-lg font-semibold">
                <Star size={18} /> {avgRating}
                <span className="text-gray-400 text-sm">
                  ({reviews.length} reviews)
                </span>
              </span>

              {tutor.badges?.verified && (
                <Badge icon={<BadgeCheck />} label="Verified" />
              )}
              {tutor.badges?.topTutor && (
                <Badge icon={<Star />} label="Top Tutor" />
              )}
            </div>

            <div className="flex gap-4 mt-8">
              <CTA icon={<MessageCircle />} text="Message Tutor" />
              <CTA icon={<Calendar />} text="Book Demo Class" primary />
            </div>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-6xl mx-auto px-6 py-14 space-y-16">

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Stat label="Questions Solved" value={tutor.totalQuestions} />
          <Stat label="Rating" value={`${avgRating} ⭐`} />
          <Stat label="Teaching Mode" value={tutor.modeOfTeaching} />
        </div>

        {/* DEMO VIDEO */}
        {tutor.demoVideo && (
          <Section title="🎥 Demo Teaching Video">
            <div className="aspect-video rounded-2xl overflow-hidden border border-white/10">
              <iframe
                src={tutor.demoVideo.replace("watch?v=", "embed/")}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </Section>
        )}

        {/* ABOUT */}
        <Section title="👨‍🏫 About the Tutor">
          <p className="text-gray-300 leading-relaxed">
            {tutor.aboutTutor}
          </p>
        </Section>

        {/* EXPERTISE */}
        <Section title="⭐ Why Learn With Me?">
          <ul className="grid sm:grid-cols-2 gap-4 text-gray-300">
            <li>✔ Personalized teaching approach</li>
            <li>✔ Concept-focused learning</li>
            <li>✔ Regular assessments & feedback</li>
            <li>✔ Flexible online & offline classes</li>
          </ul>
        </Section>

        {/* REVIEWS */}
        <Section
          title={
            <span className="bg-gradient-to-r from-amber-400 via-pink-400 to-indigo-500
                             bg-clip-text text-transparent">
              ⭐ Student Reviews
            </span>
          }
        >
          <button
            onClick={() => setShowReviewModal(true)}
            className="mb-6 px-6 py-3 rounded-xl
                       bg-gradient-to-r from-amber-400 to-pink-500
                       text-black font-bold hover:scale-[1.05] transition"
          >
            ✍️ Write Review
          </button>

          {reviews.length === 0 ? (
            <p className="text-gray-400">No reviews yet</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {reviews.map((r) => (
                <div
                  key={r._id}
                  className="relative bg-gradient-to-br from-gray-900/90 to-black/70
                             border border-white/10 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-white text-lg">
                      {r.parentName}
                    </p>
                    <span className="text-amber-400 font-semibold">
                      ⭐ {r.rating}
                    </span>
                  </div>

                  <p className="text-gray-300 italic">“{r.comment}”</p>

                  <p className="text-xs text-gray-500 mt-3">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </p>

                  {parentId === r.parentId && (
                    <div className="flex gap-3 mt-4 text-sm">
                      <button
                        onClick={() => setEditingReview(r)}
                        className="text-indigo-400 hover:underline"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDeleteReview(r._id)}
                        className="text-red-400 hover:underline"
                      >
                        🗑 Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Section>
      </div>

      {/* ================= MODALS ================= */}
      {showReviewModal && (
        <WriteReviewModal
          tutorId={tutorId}
          onClose={() => setShowReviewModal(false)}
          onSuccess={() => {
            fetchReviews();
            setShowReviewModal(false);
          }}
        />
      )}

      {editingReview && (
        <EditReviewModal
          review={editingReview}
          onClose={() => setEditingReview(null)}
          onSave={(updated) => {
            setReviews((prev) =>
              prev.map((r) => (r._id === updated._id ? updated : r))
            );
          }}
        />
      )}
    </div>
  );
};

export default TutorPublicProfile;

/* ================= MODALS ================= */

const WriteReviewModal = ({ tutorId, onClose, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submit = async () => {
    await axios.post(
      "/reviews",
      { tutorId, rating, comment },
      { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } }
    );
    onSuccess();
  };

  return (
    <Modal title="Write Review" onClose={onClose}>
      <StarSelector rating={rating} setRating={setRating} />
      <textarea
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="input mt-4"
        placeholder="Share your experience..."
      />
      <ModalActions onCancel={onClose} onConfirm={submit} />
    </Modal>
  );
};

const EditReviewModal = ({ review, onClose, onSave }) => {
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);

  const submit = async () => {
    const { data } = await axios.put(
      `/reviews/${review._id}`,
      { rating, comment },
      { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } }
    );
    onSave(data.review);
    onClose();
  };

  return (
    <Modal title="Edit Review" onClose={onClose}>
      <StarSelector rating={rating} setRating={setRating} />
      <textarea
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="input mt-4"
      />
      <ModalActions onCancel={onClose} onConfirm={submit} />
    </Modal>
  );
};

/* ================= UI HELPERS ================= */

const Section = ({ title, children }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
    <h3 className="text-2xl font-bold mb-6">{title}</h3>
    {children}
  </div>
);

const Stat = ({ label, value }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
    <p className="text-gray-400 text-sm uppercase">{label}</p>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

const Badge = ({ icon, label }) => (
  <span className="flex items-center gap-2 px-3 py-1 rounded-full
                   bg-indigo-500/10 text-indigo-400 text-sm">
    {icon} {label}
  </span>
);

const CTA = ({ icon, text, primary }) => (
  <button
    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold
      ${primary ? "bg-indigo-600" : "border border-white/20"}`}
  >
    {icon} {text}
  </button>
);

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-md">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      {children}
    </div>
  </div>
);

const StarSelector = ({ rating, setRating }) => (
  <div className="flex gap-2">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        size={26}
        onClick={() => setRating(i)}
        className={`cursor-pointer ${
          i <= rating ? "text-amber-400" : "text-gray-600"
        }`}
      />
    ))}
  </div>
);

const ModalActions = ({ onCancel, onConfirm }) => (
  <div className="flex justify-end gap-4 mt-6">
    <button onClick={onCancel} className="px-4 py-2 border rounded-lg">
      Cancel
    </button>
    <button onClick={onConfirm} className="px-6 py-2 bg-indigo-600 rounded-lg font-semibold">
      Save
    </button>
  </div>
);
