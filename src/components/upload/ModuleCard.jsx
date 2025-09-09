import React, { useState, useCallback } from "react";
import {
  FileText,
  Users,
  Scale,
  Globe,
  CheckCircle,
  ClipboardList,
  Zap,
  Fuel,
  Flame,
  Plane,
  Truck,
} from "lucide-react";

const modulesData = {
  "ESG Analyzer": {
    title: "Analyze Your ESG Policies in Minutes",
    subtitle:
      "Upload your ESG policies and certifications. Our AI highlights gaps and provides a simple scorecard with recommendations.",
    instruction: "Select your documents to upload",
    note: "You don’t need all of these — just pick what you have.",
    cards: [
      { icon: <FileText size={16} />, label: "ESG Policy" },
      { icon: <Users size={16} />, label: "Diversity & Inclusion Policy" },
      { icon: <Scale size={16} />, label: "Code of Conduct" },
      { icon: <Globe size={16} />, label: "Human Rights Policy" },
      { icon: <CheckCircle size={16} />, label: "Certifications (ISO 14001, B Corp, etc.)" },
      { icon: <ClipboardList size={16} />, label: "Audit Reports/Incident Summaries" },
    ],
    footer:
      "🔑 Even if you only have one document, that’s enough to start. We’ll score it and show you where to improve.",
  },

  "Carbon Estimator": {
    title: "Estimate Your Carbon Footprint in Minutes",
    subtitle:
      "Upload your energy, fuel, and activity data. Our AI calculates your emissions and offers reduction insights.",
    instruction: "Select your data to upload",
    note: "You don’t need everything — just provide information you have.",
    cards: [
      { icon: <Zap size={16} />, label: "Electricity Usage" },
      { icon: <Fuel size={16} />, label: "Vehicle Fuel" },
      { icon: <Flame size={16} />, label: "Heating" },
      { icon: <Plane size={16} />, label: "Company Travel" },
      { icon: <Truck size={16} />, label: "Freight Transport" },
      { icon: <ClipboardList size={16} />, label: "Audit Reports/Incident Summaries" },
    ],
    footer:
      "➡️ No problem if you only fill in part of the picture — we’ll use what you have to estimate your total footprint.",
  },

  "Sustainability Report Generator": {
    title: "Generate Your Sustainability Report",
    subtitle:
      "Turn your ESG and carbon efforts into a polished report. Upload your goals and branding elements.",
    instruction: "Select your inputs to upload",
    note: "You don’t need everything — just provide what you have.",
    cards: [
      { icon: <FileText size={16} />, label: "Company Mission/Vision" },
      { icon: <Users size={16} />, label: "ESG Milestones" },
      { icon: <ClipboardList size={16} />, label: "Stakeholder Feedback" },
      { icon: <Globe size={16} />, label: "Brand Visuals/Charts" },
      { icon: <CheckCircle size={16} />, label: "Outputs from ESG Analyzer/Carbon Estimator" },
    ],
    footer:
      "📝 Ready for a pro-level report? We’ll turn your inputs into a shareable PDF.",
  },
};

// Tab selector
const ModuleSelector = ({ modules, activeModule, onModuleClick }) => (
  <div
    style={{ fontFamily: "var(--font-primary) !important" }}
    className="!flex !flex-col sm:!flex-row sm:!justify-center sm:!gap-4 !gap-3 !mb-4"
  >
    {Object.keys(modules).map((label) => (
      <button
        key={label}
        onClick={() => onModuleClick(label)}
        style={{ fontFamily: "var(--font-primary) !important" }}
        className={`
          !flex !items-center !justify-center !text-center !text-wrap
          !transition-all !duration-150 !ease-in-out
          !border !border-gray-400 !border-solid
          !rounded-none
          !w-full sm:!w-[160px] !min-h-[50px]
          !text-sm sm:!text-xs !leading-tight !font-normal
          ${
            activeModule === label
              ? "!bg-green-900 !text-white"
              : "!bg-gray-50 !text-green-950 hover:!bg-white"
          }
          !cursor-pointer
        `}
      >
        {label}
      </button>
    ))}
  </div>
);

// Module details
const ModuleContent = ({ module }) => (
  <div className="flex flex-col justify-between h-full text-center space-y-2">
    <div>
      <h2 className="text-base sm:text-lg md:text-lg font-bold text-gray-900 mt-1">
        {module.title}
      </h2>
      <p className="text-gray-600 text-xs sm:text-sm md:text-base mt-2">
        {module.subtitle}
      </p>

      <h3 className="mt-2 font-semibold text-gray-800 text-sm sm:text-base">
        {module.instruction}
      </h3>
      <p className="text-gray-500 text-xs sm:text-sm">{module.note}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-1">
        {module.cards.map((card, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center border border-gray-200 rounded-xl p-3 bg-white"
          >
            {card.icon}
            <p className="mt-0 text-xs sm:text-sm font-medium text-gray-800 text-center leading-snug">
              {card.label}
            </p>
          </div>
        ))}
      </div>
    </div>

    <p className="text-xs sm:text-sm text-gray-500 italic mt-0">{module.footer}</p>
  </div>
);

const App = ({ onModuleSelect }) => {
  const [activeModule, setActiveModule] = useState("ESG Analyzer");

  const handleModuleClick = useCallback(
    (label) => {
      setActiveModule(label);
      if (onModuleSelect) onModuleSelect(label);
    },
    [onModuleSelect]
  );

  const currentModuleData = modulesData[activeModule];

  return (
    <div
      style={{ fontFamily: "var(--font-primary) !important" }}
      className="!w-full !max-w-[35em] !h-auto md:!h-[35em] !flex !flex-col !justify-between !items-center !p-6 md:!p-10 !bg-white !bg-opacity-80 !rounded-xl !space-y-6  !font-inter border border-gray-200" 
    >
      <ModuleSelector
        modules={modulesData}
        activeModule={activeModule}
        onModuleClick={handleModuleClick}
      />

      {currentModuleData ? (
        <ModuleContent module={currentModuleData} />
      ) : (
        <p className="!text-red-500">Module data not found.</p>
      )}
    </div>
  );
};

export default App;