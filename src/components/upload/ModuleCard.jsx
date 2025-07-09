import React, { useState } from 'react';

const ModuleCard = ({ onModuleSelect }) => {
  const [activeModule, setActiveModule] = useState(null);

  const handleClick = (label) => {
    setActiveModule(label);
    onModuleSelect(label);
  };

  return (
    <div className="w-full max-w-[35em] h-auto md:h-[35em] flex flex-col justify-between items-center p-6 md:p-10 bg-white bg-opacity-80 rounded-xl shadow-2xl space-y-6 border-4 border-transparent">
      
      <div className="flex flex-col sm:flex-row sm:justify-center sm:gap-4 gap-3 mb-4">
      {['MODULE ONE', 'MODULE TWO', 'MODULE THREE'].map((label) => (
          <button
            key={label}
            onClick={() => handleClick(label)}
            className={`
              flex items-center justify-center text-center
              !transition-all !duration-150 !ease-in-out
              !border !border-[#828282] !border-solid
              !rounded-none
              w-full sm:!w-[160px] !h-[40px]
              !text-[14px] !leading-[16px] !font-normal
              ${activeModule === label
                ? '!bg-[#003E3E] !text-[#F8F7F2]'
                : '!bg-[#F8F7F2] !text-[#083417] hover:!bg-white'}
              cursor-pointer
            `}
            style={{
              fontFamily: 'var(--font-primary) !important',
              paddingTop: '12px !important',
              paddingBottom: '12px !important',
              paddingLeft: '10px !important',
              paddingRight: '10px !important',
              gap: '10px !important',
              whiteSpace: 'nowrap !important',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <h2 className="!font-primary-important text-gray-800 text-2xl text-center" style={{ fontFamily: 'var(--font-primary) !important' }}>
        module description
      </h2>

      <div className="space-y-2 text-gray-700 text-sm leading-relaxed text-center px-4" style={{ fontFamily: 'var(--font-primary) !important' }}>
        <p className="font-primary-important">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
        </p>
        <p className="font-primary-important">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
        </p>
      </div>
    </div>
  );
};

export default ModuleCard;
