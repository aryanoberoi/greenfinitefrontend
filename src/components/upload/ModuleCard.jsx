import React, { useState, useCallback } from 'react';

// Define module data outside the component to prevent re-creation on every render.
// In a real-world app, this might come from a global store, context, or API.
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

/**
 * ModuleSelector Component
 * Renders the selection buttons for different modules.
 * @param {object} props - The component props.
 * @param {object} props.modules - An object containing all module data.
 * @param {string} props.activeModule - The currently active module label.
 * @param {function(string): void} props.onModuleClick - Callback function when a module button is clicked.
 */
const ModuleSelector = ({ modules, activeModule, onModuleClick }) => (
  <div className="flex flex-col sm:flex-row sm:justify-center sm:gap-4 gap-3 mb-4">
    {Object.keys(modules).map((label) => (
      <button
        key={label}
        onClick={() => onModuleClick(label)}
        className={`
          flex items-center justify-center text-center text-wrap
          transition-all duration-150 ease-in-out
          border border-gray-400 border-solid
          rounded-none
          w-full sm:w-[160px] min-h-[50px]
          text-sm sm:text-xs leading-tight font-normal
          ${activeModule === label
            ? 'bg-green-900 text-white' // Active state styling (darker green)
            : 'bg-gray-50 text-green-950 hover:bg-white'} // Inactive state styling (lighter background)
          cursor-pointer
        `}
        // Removed inline font-family style. It's assumed to be handled globally by Tailwind config or CSS.
      >
        {label}
      </button>
    ))}
  </div>
);

/**
 * ModuleDetails Component
 * Displays the detailed information for the selected module.
 * @param {object} props - The component props.
 * @param {object} props.moduleData - The data for the current active module, including its title.
 * @param {string[]} props.moduleData.description - Array of description lines.
 * @param {string[]} props.moduleData.files - Array of suggested files.
 * @param {string} props.moduleData.tooltip - The tooltip text.
 * @param {string} props.moduleData.title - The title of the module.
 */
const ModuleDetails = ({ moduleData }) => (
  <div className="space-y-2 text-gray-700 text-sm leading-relaxed text-center px-4">
    {/* Module Title */}
    <h2 className="font-semibold text-gray-800 text-2xl text-center mb-4">
      {moduleData.title}
    </h2>

    {/* Description */}
    {moduleData.description.map((line, idx) => (
      <p key={idx}>{line}</p>
    ))}

    {/* Suggested Files */}
    <h3 className="mt-4 font-semibold text-gray-800 text-base">
      Suggested Files to Upload:
    </h3>
    <ul className="text-left list-disc list-inside mt-2">
      {moduleData.files.map((file, idx) => (
        <li key={idx}>{file}</li>
      ))}
    </ul>

    {/* Tooltip */}
    <p className="mt-2 italic text-xs text-gray-500">{moduleData.tooltip}</p>
  </div>
);

/**
 * App Component (Main ModuleCard)
 * Manages the active module state and renders the selector and details components.
 * This component is named App to allow it to be directly rendered by React's default setup.
 * @param {object} props - The component props.
 * @param {function(string): void} props.onModuleSelect - Callback to notify parent of selected module.
 */
const App = ({ onModuleSelect }) => {
  // State to keep track of the currently active module
  const [activeModule, setActiveModule] = useState('ESG Analyzer');

  // useCallback memoizes the function, preventing unnecessary re-renders of ModuleSelector
  // if ModuleCard's parent re-renders for other reasons.
  const handleModuleClick = useCallback((label) => {
    setActiveModule(label);
    // Notify the parent component about the selected module
    if (onModuleSelect) {
      onModuleSelect(label);
    }
  }, [onModuleSelect]); // Dependency array ensures the function is only re-created if onModuleSelect changes

  // Get the data for the currently active module
  const currentModuleData = modulesData[activeModule];

  // Render the main card structure, delegating parts to sub-components
  return (
    <div className="w-full max-w-[35em] h-auto md:h-[35em] flex flex-col justify-between items-center p-6 md:p-10 bg-white bg-opacity-80 rounded-xl shadow-2xl space-y-6 border-4 border-transparent font-inter">
      {/* Module Selector Component */}
      <ModuleSelector
        modules={modulesData}
        activeModule={activeModule}
        onModuleClick={handleModuleClick}
      />

      {/* Module Details Component */}
      {currentModuleData ? (
        <ModuleDetails
          // Pass a new object combining module data with the active module title for clarity
          moduleData={{ ...currentModuleData, title: activeModule }}
        />
      ) : (
        <p className="text-red-500">Module data not found.</p> // Basic error handling
      )}
    </div>
  );
};

export default App;
