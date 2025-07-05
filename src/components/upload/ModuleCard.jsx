import React from 'react';

const ModuleCard = ({ onModuleSelect }) => {
  return (
    <div className="w-[35em] h-[35em] flex flex-col justify-between items-center p-10 bg-white bg-opacity-80 rounded-xl shadow-2xl space-y-8 border-4 border-transparent">
      {/* Module Tabs */}
      <div className="flex gap-3 mb-4">
        {['MODULE ONE', 'MODULE TWO', 'MODULE THREE'].map((label) => (
          <button
            key={label}
            onClick={() => onModuleSelect(label)}
            className="
              px-6 py-2
              !border !border-gray-300 !border-solid
              !rounded-3xl
              font-mono !text-md !font-medium
              !text-[#083417]
              !bg-[#F8F7F2] hover:!bg-white active:!bg-[#D2DAB6]
              transition-all duration-150 ease-in-out
              cursor-pointer
            "
          >
            {label}
          </button>
        ))}
      </div>

      {/* Title */}
      <h2 className="text-gray-800 text-2xl italic font-serif text-center">module description</h2>

      {/* Description */}
      <div className="space-y-2 text-gray-700 text-sm leading-relaxed text-center px-4">
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut</p>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut</p>
      </div>
    </div>
  );
};

export default ModuleCard;
