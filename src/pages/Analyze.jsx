// src/pages/Analyze.jsx

import React from 'react';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import ChatBot from '../components/analyze/ChatBot';
import DocPreview from '../components/analyze/DocPreview';

const sessionId = location.state?.sessionId;

export default function Analyze() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{backgroundColor: "#F8F7F2", backgroundSize: "cover" }}
    >
      <div className="w-screen">
        <div className="min-h-[30vh] flex flex-col">
          <Navbar />
          <main className="w-full min-h-screen flex flex-col md:flex-row items-start justify-center gap-6 px-4 md:px-8 py-10">
            <ChatBot sessionId={sessionId} />
            <DocPreview />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
