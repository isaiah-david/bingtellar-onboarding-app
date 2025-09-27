import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiLightningBolt, HiCurrencyDollar, HiGlobeAlt } from "react-icons/hi";
import { FaRocket, FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";


const steps = [
  {
    title: "Welcome to Bingtellar 🎉",
    content: "The smart, cheaper, and faster way to send money globally.",
    color: "from-purple-600 to-blue-500",
    icon: <HiGlobeAlt className="text-6xl mb-4" />,
  },
  {
    title: "Traditional Transfers 💸",
    content: "Sending $100 via banks or Western Union can cost $10+ in fees.",
    color: "from-red-500 to-orange-400",
    icon: <HiCurrencyDollar className="text-6xl mb-4" />,
  },
  {
    title: "Bingtellar’s Way ⚡",
    content: "Send the same $100 for under $1 using stablecoins and rails.",
    color: "from-green-500 to-teal-400",
    icon: <HiLightningBolt className="text-6xl mb-4" />,
  },
  {
    title: "See the Difference 📊",
    content: "Save up to 90% compared to traditional transfers.",
    color: "from-indigo-500 to-cyan-400",
    icon: <FaChartLine className="text-6xl mb-4" />,
  },
  {
    title: "Get Started 🚀",
    content: "Join Bingtellar today and make your money move smarter.",
    color: "from-yellow-400 to-orange-500",
    icon: <FaRocket className="text-6xl mb-4" />,
  },
];

export default function App() {
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-lg text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className={`bg-gradient-to-r ${steps[step].color} p-10 rounded-3xl shadow-2xl text-white`}
          >
            <div className="flex flex-col items-center">
              {steps[step].icon}
              <h1 className="text-3xl font-bold mb-4">{steps[step].title}</h1>
              <p className="text-lg mb-6">{steps[step].content}</p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep(Math.max(step - 1, 0))}
                disabled={step === 0}
                className="px-4 py-2 bg-white/20 rounded-lg disabled:opacity-30"
              >
                Back
              </button>
{step < steps.length - 1 ? (
  <button
    onClick={() => setStep(step + 1)}
    className="px-4 py-2 bg-white/30 rounded-lg font-semibold"
  >
    Next →
  </button>
) : (
  <Link
    to="/dashboard"
    className="px-6 py-3 bg-yellow-300 text-black rounded-lg font-bold shadow-md hover:bg-yellow-400 transition"
  >
    Start Now
  </Link>
)}

            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="flex mt-6 justify-center space-x-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-10 rounded-full ${
                i <= step ? "bg-blue-400" : "bg-gray-600"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
