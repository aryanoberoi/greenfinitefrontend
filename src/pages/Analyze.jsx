import React, { useState } from 'react';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import ChatBot from '../components/analyze/ChatBot';
import DocPreview from '../components/analyze/DocPreview';

const sessionId = location.state?.sessionId;

export default function Analyze() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative" style={{ backgroundColor: "#F8F7F2" }}>
      <Navbar />

      <main className="w-full min-h-screen flex flex-col md:flex-row items-start justify-center gap-6 px-4 md:px-8 py-10 relative">
        
        {isChatOpen && (
          <ChatBot sessionId={sessionId} onClose={() => setIsChatOpen(false)} />
        )}

<DocPreview fullWidth={!isChatOpen} />
      </main>

      {/* Floating ChatBot Icon (when minimized) */}
      {!isChatOpen && (
        <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 left-1 !bg-transparent rounded-full z-50 flex items-center justify-center transition-transform hover:scale-110"
        style={{ width: '8.5rem', height: '4.5rem' }} // ~72px
      >
        <img
          src="/chatbot.png"
          alt="Chatbot Icon"
          className="w-25 h-25 opacity-100 hover: transition duration-200"
        />
      </button>
      )}

      <Footer />
    </div>
  );
}
