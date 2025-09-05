import React from 'react';
import { motion } from 'framer-motion';

// Data for the testimonials
const testimonials = [
  {
    quote: "Thanks to the carbon estimator, we finally have a clear picture of our emissions. It gave us the confidence to apply for sustainability-linked tenders.",
    author: "Procurement Lead",
    role: "SME in Construction",
  },
  {
    quote: "As a consultant, I can now serve more clients with less manual work. GreenfiniteAI automates the scoring and frees me up for strategy.",
    author: "Independent ESG Consultant",
    role: "Germany",
  },
  {
    quote: "The confidence score feature is a game-changer. It shows us exactly where our data is strong — and where we need to improve.",
    author: "CFO",
    role: "Tech Startup, Netherlands",
  },
  {
    quote: "GreenfiniteAI’s report generator saved us over 10 hours on our first compliance submission. The format was clear and investor-ready.",
    author: "Sustainability Officer",
    role: "Healthcare SME",
  },
];

const App = () => {
  return (
    <div style={{ fontFamily: 'var(--font-primary) !important' }} className="bg-offwhite py-12 md:py-24 font-sans">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        {/* Section Heading */}
        <div className="text-center mb-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-green-600 mb-2"
          >
            What Our Users Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-500 text-base md:text-lg"
          >
            Trusted by sustainability leaders worldwide
          </motion.p>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col justify-between"
            >
              {/* Quote Icon - Replaced with an inline SVG */}
              <div className="text-green-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-quote">
                  <path d="M14 2H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4" />
                  <path d="M18 2h-8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                </svg>
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 text-base md:text-lg italic leading-relaxed mb-6 flex-grow">
                {testimonial.quote}
              </p>

              {/* Author & Role with Avatar */}
              <div className="flex flex-col md:flex-row items-center md:justify-end space-y-2 md:space-y-0 md:space-x-4">
                {/* Custom Avatar SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#65a30d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user rounded-full p-2 bg-green-50">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="10" r="3" />
                  <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
                </svg>
                <div className="text-center md:text-right">
                  <p className="font-semibold text-gray-800 text-sm md:text-base">
                    — {testimonial.author}
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
