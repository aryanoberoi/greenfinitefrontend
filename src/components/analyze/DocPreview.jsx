import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DocPreview = ({ fullWidth = false }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // incoming state from Upload.jsx: fileUrl (blob URL) and docId (UUID)
  const fileUrl = location.state?.fileUrl;
  const docId = location.state?.docId || null;
  const module = location.state?.module || '';

  useEffect(() => {
    // If we don't have the in-memory session (fileUrl or docId) redirect back
    if (!fileUrl || !docId) {
      navigate('/', { replace: true });
    }

    // cleanup: revoke blob URL when the component unmounts
    return () => {
      if (fileUrl) {
        try {
          URL.revokeObjectURL(fileUrl);
        } catch (e) {
          // ignore
        }
      }
    };
  }, [fileUrl, docId, navigate]);

  if (!fileUrl || !docId) return null;

  return (
    <div
      className={`${
        fullWidth ? 'w-full' : 'w-full md:w-[48%]'
      } h-[33em] bg-white bg-opacity-90 rounded-xl shadow-2xl p-6 flex flex-col transition-all duration-300 hover:shadow-xl  font-sans overflow-hidden`}
    >
      <p className="text-sm text-gray-500 text-center mb-1 italic truncate">
        {module ? `Module: ${module}` : ''} | {docId}
      </p>

      <h2 className="text-3xl font-extrabold mb-4 text-gray-800 text-center">Doc Preview</h2>

      <div className="flex-1 border border-gray-300 bg-white text-gray-800 rounded-lg p-4 overflow-auto text-sm">
        <iframe
          src={fileUrl}
          width="100%"
          height="100%"
          title={`PDF Preview ${docId}`}
          className="w-full h-full border-none rounded-lg"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default DocPreview;
