import { useNavigate } from "react-router-dom";

const SubjectCard = ({ tutor }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900/80 border border-gray-700 rounded-2xl p-5 text-white">
      <img
        src={tutor.profilePhoto || "/default-avatar.png"}
        className="w-20 h-20 rounded-full mx-auto mb-3"
      />

      <h3 className="text-xl font-bold text-center">
        {tutor.firstName} {tutor.lastName}
      </h3>

      <p className="text-center text-gray-400">
        {tutor.subject} • {tutor.city}
      </p>

      <p className="text-center text-amber-400 mt-1">
        ⭐ {tutor.rating || 4.8}
      </p>

      <button
        onClick={() => navigate(`/tutor/profile/${tutor._id}`)}
        className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700
                   text-white py-2 rounded-xl"
      >
        View Profile
      </button>
    </div>
  );
};

export default SubjectCard;
