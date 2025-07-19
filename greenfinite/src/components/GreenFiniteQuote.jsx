import React from 'react';

export default function GreenFiniteQuote() {
  return (
    <div className="min-h-screen w-full bg-[#F5F1E9] flex items-center justify-center px-6 py-12 font-inter text-[#2C3E2C]">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl gap-12">
        
        {/* Logo Section */}
        <div className="flex items-center justify-center w-full md:w-1/2">
          <img
            className="w-full max-w-sm h-auto object-contain"
            src="/logo.png"
            alt="Greenfinite Logo"
          />
        </div>

        {/* Quote Section */}
        <div className="text-center md:text-left w-full md:w-1/2">
          <p className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-6">
            "It's high time we move beyond promises. The planet doesn't need more talk, it needs action."
          </p>
          <p className="text-2xl sm:text-3xl md:text-4xl font-normal">— Greenfinite</p>
        </div>
        
      </div>
    </div>
  );
}
