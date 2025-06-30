import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DocPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const fileUrl = location.state?.fileUrl;
  const fileName = location.state?.fileName;
  const module = location.state?.module;

  if (!fileUrl) {
    return (
      <div className="text-center p-8 text-red-600 font-semibold border-2 border-grey-600 rounded-xl">
        No file URL provided. Please{' '}
        <button onClick={() => navigate('/')} className="underline text-blue-600">
          upload a file first
        </button>.
      </div>
    );
  }

  return (
    <div className="w-full md:w-[48%] h-[33em] bg-white bg-opacity-90 rounded-xl shadow-2xl p-6 flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-[1.005] font-sans overflow-hidden">
      <p className="text-sm text-gray-500 text-center mb-1 italic truncate">
        {module ? `Module: ${module}` : ''} | {fileName}
      </p>
      <h2 className="text-3xl font-extrabold mb-4 text-gray-800 text-center">Doc Preview</h2>

      <div className="flex-1 border border-gray-300 bg-white text-gray-800 rounded-lg p-4 overflow-auto text-sm">
        <iframe
          src={fileUrl}
          width="100%"
          height="100%"
          title="PDF Preview"
          className="w-full h-full border-none rounded-lg"
          allow="fullscreen"
        />
      </div>
    </div>
  );
};

export default DocPreview;
