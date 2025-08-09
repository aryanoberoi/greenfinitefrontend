import React, { useState } from 'react';
import { Rocket, Check } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleButtonClick = (e) => {
    e.preventDefault();
    setEmailError('');
    setPhoneError('');

    let valid = true;
    if (!email) {
      setEmailError('Email is required');
      valid = false;
    }
    if (!phone) {
      setPhoneError('Phone number is required');
      valid = false;
    }

    if (!valid) return;

    setIsSubmitted(true);
    setTimeout(() => {
      console.log('Form submission simulated. Values:', { email, phone });
      setEmail('');
      setPhone('');
      setIsSubmitted(false);
    }, 1500);
  };

  const isFormValid = email && phone;

  return (
    <footer id='contact' className="font-inter bg-offwhite text-amber-800 py-1 px-4 sm:px-6 lg:px-8 flex flex-col justify-center min-h-[1px]" style={{fontFamily: 'var(--font-primary) !important'}}>
      <div className="max-w-7xl mx-auto w-full overflow-hidden">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3 pb-4 border-b border-t border-gray-300">
          {/* Logo Column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex flex-col items-center md:items-start mb-2">
              <div className="aspect-[16/9]">
                {/* Replaced logo.png with a placeholder image for demonstration */}
                <img
                  src="/logo.png"
                  alt="greenfinite Logo"
                  className="w-24 h-24 md:w-48 md:h-48 lg:w-80 lg:h-45 rounded-md hidden md:block mt-14"
                  // Fallback for image loading errors
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/320x180/F5F5DC/8B4513?text=Logo+Error"; }}
                />
              </div>
            </div>
          </div>

          {/* Connect Form */}
          <div className="flex flex-col md:items-end pt-8">
            <div className="w-full max-w-sm mx-auto md:ml-auto md:mr-0 pl-0">
              <h3 className="text-amber-900 text-lg font-semibold mb-4 text-left">Connect with Us</h3>
              {/* Added hover:bg-white to the form */}
              <form className="flex flex-col space-y-3 w-full p-5 rounded-lg shadow-lg items-start bg-gray-50 border border-gray-300 hover:bg-white transition-colors duration-300">
                <input
                  type="email"
                  placeholder="Enter your email *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // Added hover:bg-white to the input
                  className={`p-2 rounded-md bg-gray-100 text-amber-800 text-sm border ${emailError ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-amber-600 transition-colors duration-200 w-full hover:bg-white`}
                />
                {emailError && <p className="text-red-600 text-xs -mt-2">{emailError}</p>}

                <input
                  type="tel"
                  placeholder="Enter your phone number *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  // Added hover:bg-white to the input
                  className={`p-2 rounded-md bg-gray-100 text-amber-800 text-sm border ${phoneError ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-amber-600 transition-colors duration-200 w-full hover:bg-white`}
                />
                {phoneError && <p className="text-red-600 text-xs -mt-2">{phoneError}</p>}

                <button
                  type="button"
                  onClick={handleButtonClick}
                  disabled={!isFormValid || isSubmitted}
                  className={`
                    relative inline-flex h-12 w-full items-center justify-start border-2 border-amber-800 px-4 transition-all duration-500 rounded-md overflow-hidden
                    ${isSubmitted ? 'bg-amber-800' : 'bg-gray-200'}
                    ${!isFormValid || isSubmitted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}
                  `}
                >
                  <span
                    className={`absolute top-1/2 -translate-y-1/2 p-2 transition-all duration-500 rounded-md ${isSubmitted ? 'left-[calc(100%-2.5rem)] bg-white text-amber-800' : 'left-2 bg-amber-800 text-white'}`}
                  >
                    {isSubmitted ? <Check size={20} /> : <Rocket size={20} />}
                  </span>

                  <span
                    // Changed text color to white for the "Submit" text
                    className={`absolute left-1/2 -translate-x-1/2 font-semibold transition-all duration-500 ease-in-out text-white ${isSubmitted ? 'opacity-0 translate-x-12' : 'opacity-100'}`}
                  >
                    Submit
                  </span>

                  <span
                    className={`absolute left-1/2 -translate-x-1/2 font-semibold transition-all duration-500 ease-in-out text-white ${isSubmitted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
                  >
                    Done!
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm mt-4">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 mb-2 md:mb-0 text-amber-700" >
            {/* Added hover:text-white to the links */}
            <a href="/legal/privacy.html" className="transform scale-100 hover:scale-90 transition duration-300 hover:text-white" style={{color:"brown"}}>Privacy Policy</a>
            <a href="/legal/terms.html" className="transform scale-100 hover:scale-90 transition duration-300 hover:text-white" style={{color:"brown"}}>Terms & Conditions</a>
            <a href="/legal/refund.html" className="transform scale-100 hover:scale-90 transition duration-300 hover:text-white" style={{color:"brown"}}>Refund Policy</a>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-brown-600 text-sm text-center mt-6">
          &copy; 2025 Greenfinite. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
