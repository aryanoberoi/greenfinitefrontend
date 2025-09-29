import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const ChatMessage = ({ sender, message, timestamp }) => {
  const isUser = sender === 'user';
  const alignment = isUser ? 'justify-end' : 'justify-start';
  const bubbleStyle = isUser ? 'bg-[#7B7A81] text-white' : 'bg-[#003E3E] text-white';

  return (
    <div style={{ fontFamily: 'var(--font-primary) !important' }} className={`flex ${alignment} mb-3`}>
      <div className={`max-w-[70%] p-3 rounded-xl ${bubbleStyle} shadow-md`}>
        <p className="leading-relaxed">
          <span className="font-bold">{isUser ? 'You:' : 'AI:'}</span> {message}
        </p>
        {timestamp && (
          <p className="text-xs mt-1 text-right text-gray-300">{timestamp}</p>
        )}
      </div>
    </div>
  );
};

/**
 * Props:
 * - onClose: function to close the chat
 * - sessionId: optional string (like docId)
 * - moduleName: optional string
 * - endpoint: API route string, defaults to /chat
 */
const ChatBot = ({ onClose, sessionId = null, moduleName = '', endpoint = '/chat' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const fileUrl = location.state?.fileUrl || null;
  const docId = sessionId || location.state?.docId || null;
  const modName = moduleName || location.state?.module || '';

  const [chatHistory, setChatHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Global in-memory store
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.__chat_history__) {
      window.__chat_history__ = {};
    }
  }, []);

  // Load existing history for this session
  useEffect(() => {
    const existing = (window.__chat_history__ && window.__chat_history__[docId]) || [];
    setChatHistory(existing);
  }, [docId]);

  const persistHistory = (newHistory) => {
    if (typeof window === 'undefined') return;
    if (!window.__chat_history__) window.__chat_history__ = {};
    if (docId) window.__chat_history__[docId] = newHistory;
  };

  const handleSendMessage = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const userMessage = {
      id: Date.now() + Math.random(),
      sender: 'user',
      message: trimmed,
      timestamp: new Date().toLocaleTimeString(),
    };

    const afterUser = [...chatHistory, userMessage];
    setChatHistory(afterUser);
    persistHistory(afterUser);

    setInputValue('');
    setIsSending(true);

    try {
      const response = await axios.post(`${API_URL}${endpoint}`, {
        message: trimmed,
        sessionid: docId,
        module: modName,
      });

      const aiText = response?.data?.response ?? 'No response from server.';
      const aiMessage = {
        id: Date.now() + Math.random(),
        sender: 'ai',
        message: aiText,
        timestamp: new Date().toLocaleTimeString(),
      };

      const afterAI = [...afterUser, aiMessage];
      setChatHistory(afterAI);
      persistHistory(afterAI);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errMsg = {
        id: Date.now() + Math.random(),
        sender: 'ai',
        message: 'Error: failed to get response. Try again.',
        timestamp: new Date().toLocaleTimeString(),
      };
      const afterErr = [...afterUser, errMsg];
      setChatHistory(afterErr);
      persistHistory(afterErr);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isSending) handleSendMessage();
    }
  };

  return (
    <div style={{ fontFamily: 'var(--font-primary) !important' }} className="w-full md:w-[48%] h-[33em] bg-white bg-opacity-90 rounded-xl shadow-2xl p-6 flex flex-col transition-all duration-300 hover:shadow-xl font-sans relative z-0">
      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-8 sm:right-8 !bg-transparent p-2 z-20 text-gray-500 hover:text-black transition duration-200"
          title="Close Chatbot"
        >
          <X className="w-6 h-6" />
        </button>
      )}

      {/* Title */}
      <h2 className="text-2xl font-bold mb-1 text-gray-800 text-center flex items-center justify-center gap-2">
        <img className="w-[4vw] h-auto" src="/chatbot.png" alt="Chatbot" />
        Talk to our chatbot, Earth v1.0
      </h2>

      {/* Module | DocId line */}
      {docId && (
        <p className="text-sm text-gray-500 text-center mb-1 italic truncate">
          {modName ? `Module: ${modName}` : ''} {modName ? '|' : ''} {docId}
        </p>
      )}

      {/* Chat Area */}
      <div className="flex-1 border border-gray-300 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto custom-scrollbar flex flex-col">
        {chatHistory.length === 0 ? (
          <p className="text-sm text-gray-500 text-center mt-6">
            Start the conversation — ask anything!
          </p>
        ) : (
          chatHistory.map(msg => (
            <ChatMessage key={msg.id} sender={msg.sender} message={msg.message} timestamp={msg.timestamp} />
          ))
        )}
      </div>

      {/* Input */}
      <div className="flex items-center w-full max-w-3xl mx-auto px-2 sm:px-4 gap-x-2">
        <input
        style={{ fontFamily: 'var(--font-primary) !important' }}
          type="text"
          placeholder="Type your message here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 sm:py-3 text-sm sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-sans"
          disabled={isSending}
        />
        <button style={{ fontFamily: 'var(--font-primary) !important' }}
          onClick={handleSendMessage}
          disabled={isSending}
          className="!bg-[#003E3E] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-lg font-semibold hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
        >
          {isSending ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
