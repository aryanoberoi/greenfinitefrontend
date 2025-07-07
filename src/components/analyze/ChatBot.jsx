import React from 'react';

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
    // Determine if the sender is the user
    const isUser = sender === 'user';

    // Tailwind CSS classes for alignment based on sender
    const messageAlignment = isUser ? 'justify-end' : 'justify-start';

    // Tailwind CSS classes for background color and text color based on sender
    const messageBg = isUser ? 'bg-[#9e9a9a] text-gray-800' : 'bg-[#004b46] text-white';
    const timestampColor = isUser ? 'text-gray-600' : 'text-gray-300';

    // Custom border for 0.5px, if Tailwind's border-[0.5px] doesn't render consistently
    const borderClass = "border-[0.5px] border-[#828282]";

    // Return the JSX for a single chat message
    return (
        // Flex container to control the alignment of the message bubble
        <div className={`flex ${messageAlignment} mb-3`}>
            {/* Message bubble styling */}
            <div className={`max-w-[343px] w-full p-4 rounded-xl shadow-md ${messageBg} ${borderClass} flex flex-col justify-between`}
                 style={{ minHeight: isUser ? '121px' : '124px' }}>
                <p className="leading-relaxed">
                    {/* Display sender name with bold styling */}
                    <span className="font-bold">
                        {isUser ? 'You:' : 'AI:'}
                    </span>{' '}
                    {/* Display the message content */}
                    {message}
                </p>
                {/* Display the timestamp */}
                {timestamp && (
                    <p className={`text-xs mt-1 text-right ${timestampColor}`}>
                        {timestamp}
                    </p>
                )}
            </div>
        </div>
    );
};

/**
 * ChatUI Component
 * Renders the main chat interface with an input field and send button.
 * Displays a simulated chat history using the ChatMessage component.
 */
const App = () => {
    // Simulated chat history. In a real application, this would come from component state (e.g., useState).
    const chatHistory = [
        { id: 1, sender: 'ai', message: 'Absolutely! Please upload your PDF in the adjacent panel.', timestamp: '9:31 AM' },
        { id: 2, sender: 'user', message: "I'm particularly interested in extracting key financial figures.", timestamp: '9:32 AM' },
        { id: 3, sender: 'ai', message: 'Understood. Would you like a summary, or specific tables and figures?', timestamp: '9:33 AM' },
        { id: 4, sender: 'user', message: 'Just the key financial figures for now, please.', timestamp: '9:34 AM' },
        { id: 5, sender: 'ai', message: 'Processing... Please check the PDF Analyzer panel.', timestamp: '9:35 AM' },
    ];

    return (
        <div className="bg-[#f8f7f4] min-h-screen flex items-center justify-center p-4 font-mono">
            {/* Updated dimensions to match DocPreview */}
            <div className="w-full md:w-[48%] h-[33em] bg-white rounded-xl shadow-lg p-6 flex flex-col">
                {/* Chat Bot Title */}
                <h2 className="text-2xl font-bold mb-5 text-gray-800 text-center">Talk to our chatbot, Earth v1.0</h2>

                {/* Chat Messages Display Area */}
                <div className="flex-1 overflow-y-auto p-4 mb-4 custom-scrollbar rounded-lg border-[0.5px] border-[#828282]">
                    {/* Map through chatHistory array to render each message */}
                    {chatHistory.map((msg) => (
                        <ChatMessage key={msg.id} sender={msg.sender} message={msg.message} timestamp={msg.timestamp} />
                    ))}
                </div>

                {/* Message Input Area */}
                <div className="flex items-center max-w-[580px] w-full mx-auto mt-4">
                    <input
                        type="text"
                        placeholder="Form Input Label"
                        className="flex-1 h-8 border-[0.5px] border-[#828282] rounded-l-lg p-2 text-sm text-[#828282] placeholder-[#828282] focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default App;
