import React, { useState, useEffect } from 'react';

export default function NewsletterPopup() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showModalContent, setShowModalContent] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [email, setEmail] = useState('');

    // Show popup on mount
    useEffect(() => {
        setIsModalOpen(true);
    }, []);

    // Handle fade-in animation
    useEffect(() => {
        if (isModalOpen) {
            const timer = setTimeout(() => setShowModalContent(true), 50);
            return () => clearTimeout(timer);
        }
    }, [isModalOpen]);

    // ✅ Auto-close ONLY after user has submitted successfully
    useEffect(() => {
        if (isSubmitted) {
            const timer = setTimeout(() => {
                setShowModalContent(false);
                setTimeout(() => setIsModalOpen(false), 300);
            }, 1000); // close after 2s
            return () => clearTimeout(timer);
        }
    }, [isSubmitted]);

    const closeModal = () => {
        setShowModalContent(false);
        setTimeout(() => setIsModalOpen(false), 300);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const res = await fetch("http://localhost:5678/webhook/newsletter", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }), // ✅ Make sure it's inside an object
          });
      
          if (res.ok) {
            console.log("✅ Email sent successfully");
            setIsSubmitted(true);
          } else {
            console.error("❌ n8n Error:", await res.text());
          }
        } catch (err) {
          console.error("⚠️ Network Error:", err);
        }
      };
      
    if (!isModalOpen) return null;

    return (
        <div style={{ fontFamily: "var(--font-primary)" }} className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className={`bg-white  shadow-2xl overflow-hidden max-w-sm w-full md:max-w-md transform transition-all duration-300 ${showModalContent ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                    }`}
            >
                {/* Header */}
                <div className="bg-green-200 p-6  flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-black">Join Our Newsletter!</h2>
                    <button
                        onClick={closeModal}
                        className="text-gray-700 text-3xl hover:text-gray-900 transition-colors"
                    >
                        &times;
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    {!isSubmitted ? (
                        <>
                            <p className="text-gray-700 mb-6">
                                Stay up-to-date with our latest news and offers by subscribing to our newsletter.
                            </p>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-green-400"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-[20vh] mx-auto bg-green-700 text-gray-100 font-bold py-3 px-4 hover:bg-green-800 hover:scale-105 transition-all block"
                                >
                                    Subscribe
                                </button>

                            </form>
                        </>
                    ) : (
                        <div className="p-4 text-sm text-green-700 bg-green-100 rounded-lg">
                            <span className="font-medium">Success!</span> You have been subscribed.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}