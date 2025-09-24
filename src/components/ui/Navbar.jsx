import React, { useState, useEffect } from 'react';
import {
  HomeIcon,
  InfoCircledIcon,
  EnvelopeClosedIcon,
  HamburgerMenuIcon,
  Cross1Icon
} from '@radix-ui/react-icons';

// ----------------------
// Mobile Menu Component
// ----------------------
const MobileMenuOverlay = ({ isOpen, onClose, activeTab, setActiveTab }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen) setTimeout(() => setIsVisible(true), 10); // trigger animation
    else setIsVisible(false);
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const tabs = ['home', 'about', 'contact'];
  const tabIcons = {
    home: HomeIcon,
    about: InfoCircledIcon,
    contact: EnvelopeClosedIcon
  };

  const handleLinkClick = (tab) => {
    setActiveTab(tab);
    onClose();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-1/2 bg-green-900 bg-opacity-90 backdrop-blur-md z-50 flex flex-col items-center justify-center px-6 py-8 transform transition-transform duration-500 ease-out
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white z-50"
        aria-label="Close menu"
      >
        <Cross1Icon className="w-8 h-8" />
      </button>

      {/* Mobile Links */}
      <nav className="flex flex-col space-y-6 text-center">
        {tabs.map((tab) => {
          const Icon = tabIcons[tab];
          const isActive = activeTab === tab;
          return (
            <a
              key={tab}
              href={`#${tab}`}
              onClick={() => handleLinkClick(tab)}
              className={`flex items-center justify-center gap-3 text-xl font-offwhite transition-colors duration-200
                ${isActive ? 'text-white' : 'text-gray-300 hover:text-green-400'}`}
            >
              {Icon && <Icon className="w-7 h-7" />}
              <span style={{ fontFamily: 'var(--font-primary)' }}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
};

// ----------------------
// Top Navigation Bar
// ----------------------
const TopNavigationBar = ({ toggleMenu, activeTab, setActiveTab }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const tabIcons = {
    home: HomeIcon,
    about: InfoCircledIcon,
    contact: EnvelopeClosedIcon
  };

  const getLinkClass = (tab) => {
    const base = 'relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#F8F7F2] after:transition-all after:duration-300 transform hover:scale-105 transition-transform duration-300 ease-in-out';
    return activeTab === tab
      ? `text-[#F8F7F2] ${base}`
      : `text-[#F8F7F2] hover:text-green-400 ${base}`;
  };

  return (
    <nav className={`fixed top-0 left-0 w-full h-[80px] py-8 px-6 sm:px-10 md:px-[104px] flex justify-between items-center bg-green-700 shadow-2xl z-50 transition-transform duration-300 ease-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      
      {/* Logo */}
      <div className="flex items-center space-x-4 md:space-x-0">
        <a href="/">
          <img src="/new_logo.jpg" alt="Greenfinite Logo" className="h-40 w-40" />
        </a>
        <a
          href="/"
          className="text-2xl sm:text-3xl font-bold font-mono text-[#F8F7F2] hover:text-green-400 transition-colors duration-1000 ml-0"
          style={{ fontFamily: 'var(--font-primary)' }}
        >
          Greenfinite
        </a>
      </div>

      {/* Hamburger (mobile only) */}
      <button
        onClick={toggleMenu}
        className="md:hidden !bg-transparent text-[#F8F7F2] p-2 focus:outline-none z-50"
        aria-label="Open menu"
      >
        <HamburgerMenuIcon className="w-8 h-8" />
      </button>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex items-center space-x-8">
        {['home', 'about', 'contact'].map((tab) => {
          const Icon = tabIcons[tab];
          return (
            <a
              key={tab}
              href={tab === 'home' ? '/' : `#${tab}`}
              onClick={() => setActiveTab(tab)}
              className={`focus:outline-none flex items-center group ${getLinkClass(tab)} `}
            >
              <span className="text-base sm:text-lg font-normal font-mono capitalize group-hover:text-green-400">{tab}</span>
              {Icon && (
                <Icon className="ml-2 transition-opacity duration-300 w-5 h-5 group-hover:text-green-400" />
              )}
            </a>
          );
        })}
      </div>
    </nav>
  );
};

// ----------------------
// Main App
// ----------------------
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="font-sans text-gray-900 min-h-[calc(100vh-89vh)]  relative overflow-x-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1542296332-2a4470b8f2d0?auto=format&fit=crop&q=80&w=1920&h=1080')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <TopNavigationBar
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <MobileMenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default App;
