import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

function CustomCursor() {
  const cursorRef = useRef(null);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if mobile (screen width < 768px)
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      document.body.classList.remove("hide-default-cursor");
      return;
    }
    document.body.classList.add("hide-default-cursor");
    return () => {
      document.body.classList.remove("hide-default-cursor");
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return; // Disable custom cursor on mobile

    const moveCursor = (e) => {
      const cursor = cursorRef.current;
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [isMobile]);

  if (isMobile) return null; // Don't render at all on mobile

  return (
    <>
      {/* Inject CSS to hide the default cursor */}
      <style>
        {`
          .hide-default-cursor {
            cursor: none !important;
          }
        `}
      </style>
      <img
        ref={cursorRef}
        src="/plant.png" // Replace with your sapling path
        alt="cursor"
        className={`fixed pointer-events-none z-[9999] transition-transform duration-300 ease-out 
          ${location.pathname === "/analyze" ? "w-15 h-15" : "w-10 h-10"}`}
        style={{
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}

export default CustomCursor;