import React from 'react';

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center">
      <div
        className="w-full"
        id="about"
        style={{ fontFamily: 'var(--font-primary) !important' }}
      >
        {/* Top Divider Line with Responsive Margin */}
        <div className="mx-4 md:mx-[4em]">
          <div className="border-t border-gray-500 opacity-40" />
        </div>

        {/* Tilted White Background Section with Responsive Padding */}
        <div className="mx-4 md:mx-[4em]">
          <div
            className="text-black text-center py-12 px-4 sm:px-8 md:px-[3em]"
            style={{
              backgroundColor: '#F8F7F2',
            }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl italic font-bold mb-8 tracking-wide">
              ABOUT US
            </h1>

            <p className="text-lg md:text-xl leading-relaxed mb-4 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
            </p>
            <p className="text-lg md:text-xl leading-relaxed mb-4 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
            </p>
            <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
