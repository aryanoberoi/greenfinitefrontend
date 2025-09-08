import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Typewriter Effect
const Typewriter = ({ text, speed = 50 }) => {
  const [displayText, setDisplayText] = useState("");
  const [i, setI] = useState(0);

  useEffect(() => {
    if (i < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayText((prev) => prev + text.charAt(i));
        setI(i + 1);
      }, speed);
      return () => clearTimeout(timeoutId);
    }
  }, [i, text, speed]);

  return <span>{displayText}</span>;
};

export default function GreenfiniteStatement() {
  const quote =
    "It's high time we move beyond promises. The planet doesn't need more talk, it needs action.";

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 px-6 py-16 font-inter overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-400/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-700/20 rounded-full blur-3xl" />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-7xl flex flex-col md:flex-row items-center gap-10 md:gap-20 bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl p-10 md:p-16"
      >
        {/* Left: Logo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <img
            src="/logo1.png"
            alt="Greenfinite Logo"
            className="w-4/5 sm:w-2/3 md:w-full max-w-sm drop-shadow-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/400x200/2C3E2C/FFFFFF?text=Greenfinite+Logo";
            }}
          />
        </motion.div>

        {/* Right: Statement */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-900 leading-snug drop-shadow-sm">
            <Typewriter text={quote} speed={50} />
          </h2>
          <p className="mt-6 text-lg sm:text-xl md:text-2xl text-green-700 font-medium">
            — Greenfinite
          </p>

          {/* Extra Trust Tagline */}
          <p className="mt-6 text-gray-600 text-base sm:text-lg md:text-xl max-w-lg mx-auto md:mx-0">
            Building credibility & action-driven solutions for businesses that
            care about sustainability. Trusted by SMEs and designed for global
            impact.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
