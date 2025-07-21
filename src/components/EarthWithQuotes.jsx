import React, { useRef, useEffect, useState, useCallback } from 'react';

const climateQuotes = [
  {
    text: "We are the first generation to feel the effect of climate change and the last generation who can do something about it.",
    author: "Barack Obama",
    position: "top-left",
  },
  {
    text: "Sustainability is no longer about doing less harm. It’s about doing more good.",
    author: "Jochen Zeitz",
    position: "top-right",
  },
  {
    text: "There is no Plan B because we do not have a Planet B.",
    author: "Kofi Annan",
    position: "left",
  },
  {
    text: "The greatest threat to our planet is the belief that someone else will save it.",
    author: "Robert Swan",
    position: "right",
  },
  {
    text: "It’s no longer enough to just talk about change. It’s time to be the change.",
    author: "Mahatma Gandhi",
    position: "bottom-left",
  },
  {
    text: "Every company can do two things: make people’s lives better through its products and services, and act as a force for good.",
    author: "Richard Branson",
    position: "bottom-right",
  },
];

export default function ClimateQuotesGlobe() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true); // Keep track of play/pause for future functionality
  const quoteIntervalRef = useRef(null);
  // Determine if it's a mobile view, considering initial render and potential resize
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showNextQuote = useCallback(() => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % climateQuotes.length);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      if (quoteIntervalRef.current) clearInterval(quoteIntervalRef.current);
      quoteIntervalRef.current = setInterval(showNextQuote, 8000);
    } else {
      if (quoteIntervalRef.current) clearInterval(quoteIntervalRef.current);
    }
    return () => {
      if (quoteIntervalRef.current) clearInterval(quoteIntervalRef.current);
    };
  }, [isPlaying, showNextQuote]);

  // Mobile positions are a subset of desktop positions for simplicity
  const mobilePositions = ["top-left", "top-right", "bottom-left", "bottom-right"];

  return (
    <div className="relative min-h-screen bg-offwhite text-gray-900 flex flex-col items-center justify-center p-4 font-inter overflow-hidden">
      <style>{`
        /* Earth rotation animation */
        @keyframes rotate-earth {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .earth-rotate {
          animation: rotate-earth 60s linear infinite;
        }

        /* New floating animation for desktop quotes */
        @keyframes float-around-desktop {
          0% { transform: translate(0, 0); }
          25% { transform: translate(5px, -5px); }
          50% { transform: translate(0, 10px); }
          75% { transform: translate(-5px, -5px); }
          100% { transform: translate(0, 0); }
        }
        .quote-float-desktop {
          animation: float-around-desktop 6s ease-in-out infinite alternate;
        }

        /* New floating animation for mobile quotes (subtle vertical drift) */
        @keyframes float-around-mobile {
          0% { transform: translateY(0); }
          50% { transform: translateY(5px); }
          100% { transform: translateY(0); }
        }
        .quote-float-mobile {
          animation: float-around-mobile 4s ease-in-out infinite alternate;
        }
      `}</style>

      {/* Wrapper div for the Earth image */}
      <div className="group relative w-full max-w-[10rem] sm:max-w-[14rem] md:max-w-[20rem] lg:max-w-[24rem] xl:max-w-[28rem] aspect-square flex items-center justify-center z-20 mb-4">
        <img
          src="./earth.png" // Placeholder for earth image
          alt="Earth"
          className="w-full h-full object-contain rounded-full shadow-2xl earth-rotate select-none outline-none focus:outline-none"
          draggable={false}
        />
      </div>

      {climateQuotes.map((quote, idx) => {
        // Filter out quotes not intended for mobile if on mobile
        if (isMobile && !mobilePositions.includes(quote.position)) return null;

        // Determine base position classes, adjusted for "floating around"
        const basePosition = isMobile
          ? {
              'top-left': 'top-[15%] left-[2%]',
              'top-right': 'top-[15%] right-[2%]',
              'bottom-left': 'bottom-[18%] left-[2%]',
              'bottom-right': 'bottom-[18%] right-[2%]',
            }[quote.position]
          : {
              'top-left': 'top-[10%] left-[10%]',
              'top-right': 'top-[10%] right-[10%]',
              'left': 'top-1/2 left-[5%] -translate-y-1/2',
              'right': 'top-1/2 right-[5%] -translate-y-1/2',
              'bottom-left': 'bottom-[10%] left-[10%]',
              'bottom-right': 'bottom-[10%] right-[10%]',
            }[quote.position];

        const isActive = idx === currentQuoteIndex;

        return (
          <div
            key={idx}
            onClick={() => setCurrentQuoteIndex(idx)}
            className={`absolute ${basePosition}
              text-center flex flex-col justify-center items-center
              bg-white/60 backdrop-blur-md rounded-xl shadow-md border cursor-pointer
              transition-all duration-500 ease-in-out overflow-hidden
              ${isActive
                ? '' // Active quote doesn't have extra styling for now
                : 'z-30 scale-100 border-gray-400 text-gray-700 hover:scale-105'
              }
              ${isMobile ? 'quote-float-mobile' : 'quote-float-desktop'}
              ${isMobile
                ? 'w-40 h-28 p-2 text-[0.55rem]' // Tighter, responsive for mobile
                : 'w-48 h-36 sm:w-56 sm:h-40 md:w-72 md:h-44 lg:w-80 lg:h-48 xl:w-96 xl:h-52 p-3 sm:p-4 md:p-5'
              }
            `}
          >
            <p className={`leading-snug transition-all duration-300
              ${isMobile ? 'text-[0.55rem]' : 'text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl'}
            `}>
              "{quote.text}"
            </p>
            <p className={`${isMobile ? 'text-[0.45rem] mt-1' : 'font-semibold text-[0.6rem] sm:text-xs md:text-sm mt-2'}`}>
              — {quote.author}
            </p>
          </div>
        );
      })}
    </div>
  );
}
