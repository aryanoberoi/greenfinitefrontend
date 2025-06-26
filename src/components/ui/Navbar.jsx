import React, { useState, useEffect, useRef } from 'react';
import { HomeIcon, GearIcon, InfoCircledIcon, EnvelopeClosedIcon, HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';

// MobileMenuOverlay Component
const MobileMenuOverlay = ({ isOpen, onClose, activeTab, setActiveTab }) => {
    // Prevent scrolling on the body when the menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = ''; // Clean up on unmount
        };
    }, [isOpen]);

    if (!isOpen) return null;

    // Helper function to get the Radix UI icon component for each tab
    const getTabIconComponent = (tabName) => {
        switch (tabName) {
            case 'home':
                return HomeIcon;
            case 'services':
                return GearIcon;
            case 'about':
                return InfoCircledIcon;
            case 'contact':
                return EnvelopeClosedIcon;
            default:
                return null;
        }
    };

    const handleLinkClick = (tabName) => {
        setActiveTab(tabName); // Update the active tab in the App component
        onClose(); // Close menu after clicking a link
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-filter backdrop-blur-lg z-40 flex flex-col items-center justify-center p-8">
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white text-3xl focus:outline-none z-50"
                aria-label="Close menu"
            >
                <Cross1Icon className="w-8 h-8" />
            </button>
            <nav className="flex flex-col space-y-8 text-center">
                {['home', 'services', 'about', 'contact'].map((tabName) => {
                    const IconComponent = getTabIconComponent(tabName);
                    // Determine link styling based on the activeTab prop
                    const linkClasses = `text-3xl font-light font-sans flex items-center justify-center space-x-4 transition-colors duration-200 ${activeTab === tabName ? 'text-white' : 'text-gray-300 hover:text-green-400' // Changed to green-400 for hover
                        }`;
                    return (
                        <a
                            key={tabName}
                            href={`#${tabName}`}
                            onClick={() => handleLinkClick(tabName)}
                            className={linkClasses}
                        >
                            {IconComponent && <IconComponent className="w-8 h-8" />}
                            <span>{tabName.charAt(0).toUpperCase() + tabName.slice(1)}</span>
                        </a>
                    );
                })}
            </nav>
        </div>
    );
};


// TopNavigationBar Component - Styled with a modern glassmorphism aesthetic and custom spacing
const TopNavigationBar = ({ toggleMenu, activeTab, setActiveTab }) => { // Receive activeTab and setActiveTab
    // Function to handle tab clicks and set the active tab
    const handleTabClick = (tabName) => {
        setActiveTab(tabName); // Update the active tab in the App component
    };

    // Helper function to determine link styling based on active state and add hover transform
    const getLinkClass = (tabName) => {
        // Updated hover effect for a more ethereal, futuristic feel (scale and color change)
        const baseClasses = 'relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-green-300 after:transition-all after:duration-300 ' + // Changed to green-300 for underline
            'transform hover:scale-105 transition-transform duration-300 ease-in-out';

        if (activeTab === tabName) {
            return `text-white ${baseClasses}`;
        } else {
            return `text-white hover:text-green-400 ${baseClasses}`; // Changed hover color to green-400
        }
    };

    // Helper function to get the Radix UI icon component for each tab
    const getTabIconComponent = (tabName) => {
        switch (tabName) {
            case 'home':
                return HomeIcon;
            case 'services':
                return GearIcon;
            case 'about':
                return InfoCircledIcon;
            case 'contact':
                return EnvelopeClosedIcon;
            default:
                return null;
        }
    };

    return (
        <nav
            className="fixed top-6 inset-x-4 md:inset-x-8 lg:inset-x-16 xl:inset-x-24 /* Updated responsive horizontal spacing */
                            py-3 px-4 sm:px-8 lg:px-10 /* Internal padding for content */
                            flex justify-between items-center /* Distribute items */
                            bg-black bg-opacity-30 backdrop-filter backdrop-blur-3xl /* Enhanced glassmorphism */
                            border-b border-t border-l border-r rounded-3xl border-gray-500 border-opacity-50 shadow-2xl z-50 /* Grey glowing border & stronger shadow */
                            transition-transform duration-300 ease-out"
        >
            {/* Greenfinite Company Name (Logo area) - Updated for professional, futuristic look */}
            <div className="flex items-center">
                <a
                    href="/"
                    // Applied hover and transition classes directly to the anchor tag for precise control
                    // Increased duration to duration-1000 for easier visibility of the transition during debugging
                    className="flex items-center text-2xl sm:text-3xl font-bold font-mono tracking-normal text-white drop-shadow-md hover:text-green-400 transition-colors duration-1000 ease-in-out"
                >
                    Greenfinite
                </a>
                {/* AI Mode Indicator removed */}
            </div>

            {/* Hamburger Menu Icon (visible on small screens, hidden on md and up) */}
            <button
                onClick={toggleMenu}
                className="md:hidden text-white focus:outline-none p-2"
                aria-label="Open menu"
                tabIndex="0" // Make it focusable
                role="button" // Indicate it's an interactive element
            >
                <HamburgerMenuIcon className="w-8 h-8" />
            </button>

            {/* Navigation Links (hidden on small screens, visible on md and up) */}
            <div className="hidden md:flex items-center space-x-6 sm:space-x-8 lg:space-x-8"> {/* Responsive spacing between links */}
                {/* Home Link */}
                <a
                    href="/"
                    onClick={() => handleTabClick('home')}
                    className={`focus:outline-none flex items-center group ${getLinkClass('home')}`}
                >
                    <span className="text-base sm:text-lg font-normal font-mono">Home</span>
                    {React.createElement(getTabIconComponent('home'), {
                        className: "ml-2 transition-opacity duration-300 w-5 h-5 group-hover:text-green-400" // Icons are always visible, changed to green-400
                    })}
                </a>

                {/* About Link */}
                <a
                    href="#about"
                    onClick={() => handleTabClick('about')}
                    className={`focus:outline-none flex items-center group ${getLinkClass('about')}`}
                >
                    <span className="text-base sm:text-lg font-normal font-mono">About</span>
                    {React.createElement(getTabIconComponent('about'), {
                        className: "ml-2 transition-opacity duration-300 w-5 h-5 group-hover:text-green-400" // Changed to green-400
                    })}
                </a>

                {/* Services Link */}
                <a
                    href="#services"
                    onClick={() => handleTabClick('services')}
                    className={`focus:outline-none flex items-center group ${getLinkClass('services')}`}
                >
                    <span className="text-base sm:text-lg font-normal font-mono">Services</span>
                    {React.createElement(getTabIconComponent('services'), {
                        className: "ml-2 transition-opacity duration-300 w-5 h-5 group-hover:text-green-400" // Changed to green-400
                    })}
                </a>

                {/* Contact Link */}
                <a
                    href="#contact"
                    onClick={() => handleTabClick('contact')}
                    className={`focus:outline-none flex items-center group ${getLinkClass('contact')}`}
                >
                    <span className="text-base sm:text-lg font-normal font-mono">Contact</span>
                    {React.createElement(getTabIconComponent('contact'), {
                        className: "ml-2 transition-opacity duration-300 w-5 h-5 group-hover:text-green-400" // Changed to green-400
                    })}
                </a>
            </div>
        </nav>
    );
};

// Main App component
const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('home'); // Active tab state lifted to App

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Ensure menu closes on resize if screen becomes desktop size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) { // Tailwind's 'md' breakpoint
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="font-sans text-gray-900 min-h-screen relative overflow-hidden"
            style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1542296332-2a4470b8f2d0?auto=format&fit=crop&q=80&w=1920&h=1080&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                minHeight: '15vh'
            }}>

            {/* Pass activeTab and setActiveTab to TopNavigationBar */}
            <TopNavigationBar toggleMenu={toggleMenu} activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Mobile Menu Overlay */}
            <MobileMenuOverlay
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                activeTab={activeTab} // Pass activeTab to overlay
                setActiveTab={setActiveTab} // Pass setActiveTab to overlay
            />

            {/* Main Content Area - Adjust pt to accommodate fixed top navbar height and its top spacing */}
            <div className="flex-grow flex items-center justify-center pt-[calc(2em+4rem)]
                                md:pt-[calc(2em+4rem)] /* Desktop padding */
                                sm:pt-[calc(1em+4rem)] /* Smaller padding for medium screens */
                                pt-[calc(0.5em+4rem)] /* Default smallest padding for extra small screens */
                                ">
                {/* Content can be added here later */}
            </div>
        </div>
    );
};

export default App;
