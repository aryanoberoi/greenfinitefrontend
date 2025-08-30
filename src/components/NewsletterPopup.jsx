import React, { useState, useEffect } from "react";

export default function NewsletterPopup() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModalContent, setShowModalContent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => setShowModalContent(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setShowModalContent(false);
        setTimeout(() => setIsModalOpen(false), 300);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  const closeModal = () => {
    setShowModalContent(false);
    setTimeout(() => setIsModalOpen(false), 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      const res = await fetch(`${API_URL}/webhook/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) setIsSubmitted(false);
    } catch (err) {
      console.error(err);
      setIsSubmitted(false);
    }
  };

  if (!isModalOpen) return null;

  return (
    <div     style={{ fontFamily: "var(--font-primary)" }} className="fixed inset-0 flex items-center justify-center z-50 px-4">
      <div
        className={`bg-white shadow-2xl overflow-hidden w-full max-w-sm sm:max-w-md transform transition-all duration-300 ${
          showModalContent ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="bg-green-200 p-4 sm:p-6 flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-bold text-black">Join Our Newsletter!</h2>
          <button
            onClick={closeModal}
            className="text-gray-700 text-2xl sm:text-3xl hover:text-gray-900 transition-colors"
          >
            &times;
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {!isSubmitted ? (
            <>
              <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">
                Stay up-to-date with our latest news and offers by subscribing to our newsletter.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-gray-700 text-xs sm:text-sm font-semibold mb-1 sm:mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-400 text-sm sm:text-base"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto mx-auto bg-green-700 text-gray-100 font-bold py-2 sm:py-3 px-4 sm:px-6 hover:bg-green-900 hover:scale-105 transition-all block text-sm sm:text-base"
                >
                  Subscribe
                </button>
              </form>
            </>
          ) : (
            <div className="p-3 sm:p-4 text-sm sm:text-base text-green-700 bg-green-100 rounded-lg text-center">
              <span className="font-medium">Success!</span> You have been subscribed.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
