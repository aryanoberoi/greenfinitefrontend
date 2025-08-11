import React, { useState, useEffect } from 'react';

// A custom component for the typewriter effect
const Typewriter = ({ text, speed = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  const [i, setI] = useState(0);

  useEffect(() => {
    if (i < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayText(displayText + text.charAt(i));
        setI(i + 1);
      }, speed);

      return () => clearTimeout(timeoutId);
    }
  }, [displayText, i, text, speed]);

  return <span>{displayText}</span>;
};

export default function GreenfiniteStatement() {
  const quote = "It's high time we move beyond promises. The planet doesn't need more talk, it needs action.";

  return (
    <div
      className="min-h-screen w-full bg-[#F8F8F8] flex items-center justify-center px-4 py-8 font-inter text-[#2C3E2C] relative overflow-hidden"
    >
      {/* Subtle Background SVG */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5 pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <radialGradient id="greenGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#2C3E2C" stopOpacity="0.05" />
          </radialGradient>
        </defs>
        <circle cx="25" cy="75" r="40" fill="url(#greenGradient)" />
        <circle cx="75" cy="25" r="50" fill="url(#greenGradient)" />
        <circle cx="50" cy="50" r="30" fill="url(#greenGradient)" />
      </svg>

      {/* Main Content */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center md:items-stretch bg-white/50 backdrop-blur-sm rounded-xl p-6 md:p-12 shadow-xl z-10 gap-6">
        
        {/* Logo Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            className="w-4/5 sm:w-3/5 md:w-full max-w-xs md:max-w-full object-contain"
            src="/logo.png"
            alt="Greenfinite Logo"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/400x200/2C3E2C/FFFFFF?text=Greenfinite+Logo";
            }}
          />
        </div>

        {/* Quote Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-snug text-emerald-900 drop-shadow-sm">
            <Typewriter text={quote} speed={70} />
          </p>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal text-green-700 mt-4">
            — Greenfinite
          </p>
        </div>
      </div>
    </div>
  );
}