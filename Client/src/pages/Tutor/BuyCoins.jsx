import axios from "../../axiosConfig.js";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContextTutor";
import { motion } from "framer-motion";
import { pageMotion, cardMotion, hoverScale } from "../../ui/motion";
import { colors } from "../../ui/colors";

export default function BuyCoins() {
  const { user, setUser } = useContext(AuthContext);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/coins/packages").then(res => {
      if (res.data.success) setPackages(res.data.packages);
      setLoading(false);
    });
  }, []);

  const handleBuy = async (id) => {
    try {
      const { data } = await axios.post("/coins/buy", { packageId: id });
      if (data.success) {
        setUser({ ...user, coins: data.coins });
        alert(data.message);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Payment failed");
    }
  };

  return (
    <motion.div {...pageMotion}
      className={`min-h-screen bg-gradient-to-br ${colors.bg} px-6 py-16 text-white`}
    >
      <div className="max-w-5xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-amber-400">
            Buy Coins
          </h1>
          <p className="text-gray-400 mt-2">
            Current Balance: <span className="text-white font-bold">{user.coins} 🪙</span>
          </p>
        </div>

        {/* PACKAGES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map(pkg => (
            <motion.div key={pkg.id}
              {...cardMotion}
              className={`${colors.card} rounded-2xl p-6 text-center`}
            >
              <h2 className="text-2xl font-bold mb-2">{pkg.coins} Coins</h2>
              <p className="text-gray-400 mb-4">₹{pkg.price}</p>

              <motion.button
                {...hoverScale}
                onClick={() => handleBuy(pkg.id)}
                className={`w-full py-3 rounded-xl bg-gradient-to-r ${colors.primary}
                            text-white font-semibold`}
              >
                Buy Now
              </motion.button>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.div>
  );
}
