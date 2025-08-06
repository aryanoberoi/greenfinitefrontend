import React, { useState, useCallback } from 'react';

const modulesData = {
  'ESG Analyzer': {
    description: [
      "Help us understand your sustainability practices by uploading your policies and certifications.",
      "We’ll assess your ESG readiness, highlight gaps, and recommend improvements — all in a simple, jargon-free scorecard."
    ],
    files: [
      "ESG Policy", "Code of Conduct", "Diversity & Inclusion Policy", "Human Rights Policy",
      "Certifications (e.g., ISO 14001, B Corp)", "ESG audit reports or incident summaries"
    ],
    tooltip: "📄 Upload your ESG policy, code of conduct, or anything close — we’ll score it and guide you on what’s missing."
  },
  'Carbon Estimator': {
    description: [
      "Let’s calculate your carbon footprint together. Upload utility bills, fuel receipts, or travel logs.",
      "We’ll give you a Scope 1–3 emissions snapshot using AI + industry benchmarks."
    ],
    files: [
      "Electricity and heating bills", "Fuel invoices (diesel, petrol, natural gas)",
      "Vehicle logs/mileage sheets", "Business travel reports", "Waste disposal documents",
      "Procurement or shipping records"
    ],
    tooltip: "🔌 No carbon calculator? No worries. Upload a few bills or travel logs — we’ll estimate your emissions and tag what's assumed."
  },
  'Sustainability Report Generator': {
    description: [
      "Want to turn your ESG and carbon efforts into a beautiful report? Just upload your goals and branding elements.",
      "We’ll generate a share-ready PDF aligned with global frameworks like GRI, CSRD, and SDGs."
    ],
    files: [
      "Company mission/vision statement", "ESG milestones or achievements",
      "Stakeholder feedback/testimonials", "Brand visuals or charts",
      "Final outputs from ESG Analyzer or Carbon Estimator"
    ],
    tooltip: "📝 Ready for a pro-level report? Just give us your goals, wins, and docs — we’ll turn them into a shareable PDF."
  }
};

const ModuleSelector = ({ modules, activeModule, onModuleClick }) => (
  <div style={{fontFamily: 'var(--font-primary) !important'}} className="!flex !flex-col sm:!flex-row sm:!justify-center sm:!gap-4 !gap-3 !mb-4">
    {Object.keys(modules).map((label) => (
      <button
        key={label}
        onClick={() => onModuleClick(label)}
        style={{fontFamily: 'var(--font-primary) !important'}}
        className={`
          !flex !items-center !justify-center !text-center !text-wrap
          !transition-all !duration-150 !ease-in-out
          !border !border-gray-400 !border-solid
          !rounded-none
          !w-full sm:!w-[160px] !min-h-[50px]
          !text-sm sm:!text-xs !leading-tight !font-normal
          ${activeModule === label
            ? '!bg-green-900 !text-white'
            : '!bg-gray-50 !text-green-950 hover:!bg-white'}
          !cursor-pointer
        `}
      >
        {label}
      </button>
    ))}
  </div>
);

const ModuleDetails = ({ moduleData }) => (
  <div style={{fontFamily: 'var(--font-primary) !important'}} className="!space-y-2 !text-gray-700 !text-sm !leading-relaxed !text-center !px-4">
    <h2 className="!font-semibold !text-gray-800 !text-2xl !text-center !mb-4">
      {moduleData.title}
    </h2>

    {moduleData.description.map((line, idx) => (
      <p key={idx} className="!text-gray-700 !text-sm">{line}</p>
    ))}

    <h3 className="!mt-4 !font-semibold !text-gray-800 !text-base">
      Suggested Files to Upload:
    </h3>
    <ul className="!text-left !list-disc !list-inside !mt-2">
      {moduleData.files.map((file, idx) => (
        <li key={idx} className="!text-gray-700">{file}</li>
      ))}
    </ul>

    <p className="!mt-2 !italic !text-xs !text-gray-500">{moduleData.tooltip}</p>
  </div>
);

const App = ({ onModuleSelect }) => {
  const [activeModule, setActiveModule] = useState('ESG Analyzer');

  const handleModuleClick = useCallback((label) => {
    setActiveModule(label);
    if (onModuleSelect) onModuleSelect(label);
  }, [onModuleSelect]);

  const currentModuleData = modulesData[activeModule];

  return (
    <div style={{fontFamily: 'var(--font-primary) !important'}} className="!w-full !max-w-[35em] !h-auto md:!h-[35em] !flex !flex-col !justify-between !items-center !p-6 md:!p-10 !bg-white !bg-opacity-80 !rounded-xl !shadow-2xl !space-y-6 !border-4 !border-transparent !font-inter">
      <ModuleSelector
        modules={modulesData}
        activeModule={activeModule}
        onModuleClick={handleModuleClick}
      />

      {currentModuleData ? (
        <ModuleDetails
          moduleData={{ ...currentModuleData, title: activeModule }}
        />
      ) : (
        <p className="!text-red-500">Module data not found.</p>
      )}
    </div>
  );
};

export default App;
