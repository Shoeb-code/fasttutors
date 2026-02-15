import axios from "../../axiosConfig.js";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContextTutor";
import { motion } from "framer-motion";
import { pageMotion } from "../../ui/motion";

export default function BuyCoins() {
  const { user, setUser } = useContext(AuthContext);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD PACKAGES ================= */
  useEffect(() => {
    axios.get("/coins/packages").then((res) => {
      if (res.data.success) {
        const enhanced = res.data.packages.map((p, i) => ({
          ...p,
          popular: i === 1, // middle plan highlighted
          features: [
            "Unlock premium tutor leads",
            "Priority enquiry ranking",
            "Instant tutor connection",
            "Advanced visibility boost",
            "FastTutors priority support",
          ],
        }));
        setPackages(enhanced);
      }
      setLoading(false);
    });
  }, []);

  /* ================= BUY HANDLER ================= */
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

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        Loading premium plans...
      </div>
    );
  }

  return (
    <motion.div
      {...pageMotion}
      className="min-h-screen bg-neutral-950 text-white px-6 py-24"
    >
      <div className="max-w-6xl mx-auto space-y-16">

        {/* ================= HEADER ================= */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Upgrade Your <span className="text-amber-400">Coins</span>
          </h1>

          <p className="text-neutral-400 max-w-xl mx-auto">
            Unlock premium tutor leads and boost your visibility
            with FastTutors coin packs.
          </p>

          <motion.div
            key={user.coins}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-lg text-neutral-300"
          >
            Balance:
            <span className="ml-2 text-2xl font-bold text-white">
              {user.coins} 🪙
            </span>
          </motion.div>
        </div>

        {/* ================= PRICING CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 40, scale: pkg.popular ? 1.05 : 1 }}
              animate={{ opacity: 1, y: 0, scale: pkg.popular ? 1.05 : 1 }}
              whileHover={{
                y: -10,
                scale: pkg.popular ? 1.08 : 1.04,
              }}
              transition={{ duration: 0.35 }}
              className={`
                relative flex flex-col rounded-3xl p-8 border
                bg-neutral-950
          
                transition-colors duration-300
                ${
                     "hover:border-amber-500 shadow-[0_0_60px_rgba(251,191,36,0.18)]"

                }
              `}
            >
              {/* POPULAR BADGE */}
              {pkg.popular && (
                <div
                  className="
                  absolute -top-4 left-1/2 -translate-x-1/2
                  bg-amber-400 text-black text-xs font-bold
                  px-4 py-1 rounded-full
                "
                >
                  BEST VALUE
                </div>
              )}

              {/* COINS */}
              <h2 className="text-3xl font-bold mb-2">
                {pkg.coins} Coins
              </h2>

              {/* PRICE */}
              <p className="text-5xl font-extrabold mb-6">
                ₹{pkg.price}
              </p>

              {/* FEATURES */}
              <ul className="space-y-3 text-sm text-neutral-300 mb-10 flex-1">
                {pkg.features.map((f, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-emerald-400">✔</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* BUY BUTTON */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => handleBuy(pkg.id)}
                className={`
                  w-full py-3 rounded-xl font-semibold
                  transition-all duration-300 
                  ${
                       " text-white bg-blue-800 hover:bg-blue-600 "
                  }
                `}
              >
                Buy Coins 
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* ================= FOOTER NOTE ================= */}
        <p className="text-center text-xs text-neutral-500">
          Secure payments • Instant delivery • No hidden fees
        </p>
      </div>
    </motion.div>
  );
}
