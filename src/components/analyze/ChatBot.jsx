import React, { useState } from 'react';
import axios from 'axios';

/**
 * ChatMessage Component
 * Renders a single chat message, aligning it left or right based on the sender.
 *
 * @param {object} props - The component props.
 * @param {string} props.sender - The sender of the message ('user' or 'ai').
 * @param {string} props.message - The content of the message.
 * @param {string} props.timestamp - The timestamp of the message.
 */
const ChatMessage = ({ sender, message, timestamp }) => {
    const isUser = sender === 'user';
    const messageAlignment = isUser ? 'justify-end' : 'justify-start';
    const messageBg = isUser ? 'bg-[#7B7A81] text-white' : 'bg-[#003E3E] text-white';

    return (
        <div className={`flex ${messageAlignment} mb-3`}>
            <div className={`max-w-[70%] p-3 rounded-xl ${messageBg} shadow-md`}>
                <p className="leading-relaxed">
                    <span className="font-bold">
                        {isUser ? 'You:' : 'AI:'}
                    </span>{' '}
                    {message}
                </p>
                {timestamp && (
                    <p className="text-xs mt-1 text-right text-gray-300">
                        {timestamp}
                    </p>
                )}
            </div>
        </div>
    );
};

/**
 * ChatBot Component
 * Renders the main chat interface with an input field and send button.
 * Sends messages to the backend and displays responses.
 *
 * @param {object} props - The component props.
 * @param {string} props.sessionId - The session ID for the chat.
 */
const ChatBot = ({ sessionId }) => {
    const [chatHistory, setChatHistory] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const newMessage = {
            id: chatHistory.length + 1,
            sender: 'user',
            message: inputValue,
            timestamp: new Date().toLocaleTimeString(),
        };

        setChatHistory([...chatHistory, newMessage]);
        setInputValue('');

        try {
            const response = await axios.post('http://localhost:8000/chat', { message: inputValue, sessionid: sessionId });
            const aiMessage = {
                id: chatHistory.length + 2,
                sender: 'ai',
                message: response.data.response, // Adjusted to match the FastAPI response format
                timestamp: new Date().toLocaleTimeString(),
            };
            setChatHistory(prevHistory => [...prevHistory, aiMessage]);
        } catch (error) {
            console.error("Error fetching AI response:", error);
        }
    };

    return (
        <div className="w-full md:w-[48%] h-[33em] bg-white bg-opacity-90 rounded-xl shadow-2xl p-6 flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-[1.005] font-sans">
            <h2 className="text-2xl font-bold mb-5 text-gray-800 text-center" style={{fontFamily: 'var(--font-primary) !important'}}>Talk to our chatbot, Earth v1.0</h2>

            <div className="flex-1 border border-gray-300 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto custom-scrollbar flex flex-col" style={{fontFamily: 'var(--font-primary) !important'}}>
                {chatHistory.map((msg) => (
                    <ChatMessage key={msg.id} sender={msg.sender} message={msg.message} timestamp={msg.timestamp} />
                ))}
            </div>

            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Type your message here..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-l-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    style={{fontFamily: 'var(--font-primary) !important'}}
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-600 text-white px-6 py-3 rounded-r-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{fontFamily: 'var(--font-primary) !important'}}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBot;
