import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/jetbrains-mono'; // Import JetBrains Mono

// ✅ Set CSS variables from Vite env
document.documentElement.style.setProperty(
  '--font-primary',
  import.meta.env.VITE_FONT_PRIMARY || "'JetBrains Mono', monospace"
);

document.documentElement.style.setProperty(
  '--font-secondary',
  import.meta.env.VITE_FONT_SECONDARY || "'Georgia', serif"
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
