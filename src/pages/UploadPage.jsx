import React, { useState } from 'react';
import Upload from '../components/upload/Upload';
import ModuleCard from '../components/upload/ModuleCard';
import ChatBot from '../components/analyze/ChatBot';

export default function UploadPage() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [showChat, setShowChat] = useState(true); // toggle chat visibility

  const handleModuleSelect = (moduleName) => {
    console.log('Selected module:', moduleName);
    setSelectedModule(moduleName);
  };

  return (
    <div className="min-h-screen flex flex-col bg-offwhite overflow-x-hidden relative">
      {/* Page Content */}
      <div className="w-full">
        <div className="min-h-[30vh] flex flex-col">
          <div className="text-center py-10">
            <h6 className="text-lg sm:text-3xl font-bold text-green-900">
              Upload. Analyze. Report. AI-powered ESG compliance for SMEs.
            </h6>
            <p className="mt-1 text-sm sm:text-base text-gray-600">
              Simplifying sustainability, Guiding you from Zero to NetZero
            </p>
          </div>

          <main
            className="
              flex-1 flex flex-col md:flex-row 
              justify-center items-center 
              gap-6 md:gap-[8em] 
              px-4 py-0 md:px-0 md:py-3
              w-full max-w-screen-xl mx-auto
            "
          >
            <ModuleCard onModuleSelect={handleModuleSelect} />
            <Upload selectedModule={selectedModule} />
          </main>
        </div>
      </div>

      {/* Floating ChatBot on the left side */}
      {showChat && (
        <div className="fixed bottom-6 left-6 z-50 w-[360px] md:w-[950px]">
          <ChatBot
            sessionId={'Ask me how to get started.'}
            moduleName={selectedModule || ''}
            endpoint="/homepagechatbot"
            onClose={() => setShowChat(false)}
          />
        </div>
      )}

      {/* Optional Chat Toggle Button */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 left-6 z-50 bg-transparent  text-white px-0 py-1 rounded-full "
        >
          <img className="w-20 h-auto md:w-[6vw]" src="/chatbot.png" alt="Chatbot" />
        </button>
      )}

    </div>
  );
}
