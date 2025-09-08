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
    <div className="min-h-screen flex flex-col bg-offwhite overflow-x-hidden">
      <div className="w-full">
        <div className="min-h-[30vh] flex flex-col">
          <main
            className="
              flex-1 flex flex-col md:flex-row 
              justify-center items-center 
              gap-6 md:gap-[8em] 
              px-4 py-0 md:px-0 md:py-0
              w-full max-w-screen-xl mx-auto
            "
          >
            <ModuleCard onModuleSelect={handleModuleSelect} />
            <Upload selectedModule={selectedModule} />
          </main>
        </div>
      </div>
    </div>
  );
}
