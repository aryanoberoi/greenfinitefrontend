import React, { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

const ChatMessage = ({ sender, message, timestamp }) => {
    const isUser = sender === 'user';
    const alignment = isUser ? 'justify-end' : 'justify-start';
    const bubbleStyle = isUser ? 'bg-[#7B7A81] text-white' : 'bg-[#003E3E] text-white';

    return (
        <div className={`flex ${alignment} mb-3`}>
            <div className={`max-w-[70%] p-3 rounded-xl ${bubbleStyle} shadow-md`}>
                <p className="leading-relaxed">
                    <span className="font-bold">{isUser ? 'You:' : 'AI:'}</span>{' '}
                    {message}
                </p>
                {timestamp && (
                    <p className="text-xs mt-1 text-right text-gray-300">{timestamp}</p>
                )}
            </div>
        </div>
    );
};

const ChatBot = ({ sessionId, onClose }) => {
    const [chatHistory, setChatHistory] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage = {
            id: chatHistory.length + 1,
            sender: 'user',
            message: inputValue,
            timestamp: new Date().toLocaleTimeString(),
        };

        setChatHistory([...chatHistory, userMessage]);
        setInputValue('');

        try {
            const response = await axios.post('http://localhost:8000/chat', {
                message: inputValue,
                sessionid: sessionId,
            });

            const aiMessage = {
                id: chatHistory.length + 2,
                sender: 'ai',
                message: response.data.response,
                timestamp: new Date().toLocaleTimeString(),
            };

            setChatHistory((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error('Error fetching AI response:', error);
        }
    };

    return (
        <div className="w-full md:w-[48%] h-[33em] bg-white bg-opacity-90 rounded-xl shadow-2xl p-6 flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-[1.005] font-sans relative z-0">

            {/* Close Button */}
            <button
    onClick={onClose}
    className="absolute top-3 right-3 sm:top-8 sm:right-8 !bg-transparent p-2 z-20 text-gray-500 hover:text-black transition duration-200"
    title="Close Chatbot"
>
    <X className="w-6 h-6" />
</button>





            {/* Title */}
            <h2 className="text-2xl font-bold mb-5 text-gray-800 text-center flex items-center justify-center gap-2" style={{ fontFamily: 'var(--font-primary)' }}>
                <img className="w-[4vw] h-auto" src="/chatbot.png" alt="Chatbot" />
                Talk to our chatbot, Earth v1.0
            </h2>

            {/* Chat Area */}
            <div
                className="flex-1 border border-gray-300 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto custom-scrollbar flex flex-col"
                style={{ fontFamily: 'var(--font-primary) !important' }}
            >
                {chatHistory.map((msg) => (
                    <ChatMessage
                        key={msg.id}
                        sender={msg.sender}
                        message={msg.message}
                        timestamp={msg.timestamp}
                    />
                ))}
            </div>

            {/* Input */}
            <div className="flex items-center w-full max-w-3xl mx-auto px-2 sm:px-4 gap-x-2">
                <input
                    type="text"
                    placeholder="Type your message here..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 sm:py-3 text-sm sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-sans"
                    style={{ fontFamily: 'var(--font-primary)' }}
                />
                <button
                    onClick={handleSendMessage}
                    className="!bg-[#003E3E] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-lg font-semibold hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                    style={{ fontFamily: 'var(--font-primary)' }}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBot;
