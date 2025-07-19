import React from 'react';

// Static array of climate-related quotes
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

// Define approximate SVG coordinates (percentages) for the center of each quote box.
// These are relative to the parent container of the Earth (the div with relative positioning).
// These values are fine-tuned to align with the new quote positioning.
// This object is now technically not used since lines are removed, but kept for reference if lines were to be re-added.
const quoteLineCoordinates = {
  "top-left": { x: 10, y: 10 }, // Adjusted to spread out more for wider boxes
  "top-right": { x: 85, y: 15 }, // Adjusted to spread out more for wider boxes
  "left": { x: 10, y: 50 },     // Adjusted to spread out more for wider boxes
  "right": { x: 90, y: 50 },    // Adjusted to spread out more for wider boxes
  "bottom-left": { x: 15, y: 85 }, // Adjusted to spread out more for wider boxes
  "bottom-right": { x: 85, y: 85 },// Adjusted to spread out more for wider boxes
};

// Earth's center is always 50%, 50% relative to its parent container.
const earthCenterX = 50;
const earthCenterY = 50;

export default function ClimateQuotesGlobe() {
  return (
    <div className="relative min-h-screen bg- offwhitetext-gray-900 flex items-center justify-center px-4"> {/* Changed background to off-white and text to dark gray */}
      {/* Container for Earth and quotes, establishing relative positioning context */}
      <div className="relative w-full max-w-sm aspect-square flex items-center justify-center"> {/* Reduced max-w-md to max-w-sm */}
        {/* SVG for drawing connecting lines. Removed as per request. */}
        {/* <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {climateQuotes.map((quote, index) => {
            const endPoint = quoteLineCoordinates[quote.position];
            if (!endPoint) return null; // Safety check

            return (
              <line
                key={`line-${index}`}
                x1={`${earthCenterX}%`}
                y1={`${earthCenterY}%`}
                x2={`${endPoint.x}%`}
                y2={`${endPoint.y}%`}
                stroke="rgba(255, 255, 255, 0.4)" // Semi-transparent white
                strokeWidth="1.5"
                strokeDasharray="4 4" // Dashed line effect
                className="transition-all duration-300" // For potential future animations
              />
            );
          })}
        </svg> */}

        {/* Earth Image */}
        <img
          src="/public/earth.png" // Using the path from your provided code
          alt="Earth"
          // Ensure Earth scales responsively within its parent container
         className="w-[80%] h-[80%] object-contain rounded-full shadow-2xl shadow-blue-500/50 z-20"
        />

        {/* Quotes */}
        {climateQuotes.map((quote, idx) => (
          <div
            key={idx}
            className={`absolute text-center p-2 sm:p-3 bg-blur backdrop-blur-sm rounded-lg shadow-lg border border-gray-300 transition-all duration-300 hover:scale-105 hover:bg-white/90 z-30
              max-w-[180px] sm:max-w-[230px] md:max-w-[280px] text-[0.6rem] sm:text-xs md:text-sm lg:text-base
              ${quote.position === "top-left" && "top-0 left-15 -translate-x-1/1 -translate-y-1/2 transform -rotate-2"}
              ${quote.position === "top-right" && "top-0 right-20 translate-x-1/1 -translate-y-1/2 transform rotate-2"}
              ${quote.position === "left" && "top-1/2 left-0 -translate-x-full -translate-y-1/2 transform -rotate-2"}
              ${quote.position === "right" && "top-1/2 right-0 translate-x-full -translate-y-1/2 transform rotate-2"}
              ${quote.position === "bottom-left" && "bottom-0 left-20 -translate-x-1/1 translate-y-1/2 transform rotate-2"}
              ${quote.position === "bottom-right" && "bottom-0 right-20 translate-x-1/1 translate-y-1/2 transform -rotate-2"}
            `}
          >
            <p className="italic mb-1">"{quote.text}"</p>
            <p className="font-semibold text-right">— {quote.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
