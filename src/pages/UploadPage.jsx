import React, { useState } from 'react';
import Upload from '../components/upload/Upload';
import ModuleCard from '../components/upload/ModuleCard';

export default function UploadPage() {
  const [selectedModule, setSelectedModule] = useState(null);

  const handleModuleSelect = (moduleName) => {
    console.log('Selected module:', moduleName);
    setSelectedModule(moduleName);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      
    >
      <div className="w-screen">
        <div className="min-h-[30vh] flex flex-col">
          <main className="flex-1 flex justify-center items-center min-h-[50vh] gap-[8em]">
            {/* ✅ Pass the function to ModuleCard here */}
            <ModuleCard onModuleSelect={handleModuleSelect} />
            <Upload selectedModule={selectedModule} />
          </main>
        </div>
      </div>
    </div>
  );
}
