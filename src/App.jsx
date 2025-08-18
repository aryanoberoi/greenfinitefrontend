import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CustomCursor from './components/ui/Cursor';
import Analyze from './pages/Analyze';
import NewsletterPopup from './components/NewsletterPopup';
function App() {
  return (

    <div className="w-screen h-screen flex flex-col">
    {/* <CustomCursor /> */}

    {location.pathname === '/' && <NewsletterPopup />}

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyze" element={<Analyze />} />
        </Routes>
      </div>
      
    </div>
  )
}


export default App
