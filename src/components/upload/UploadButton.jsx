import React from 'react';

const UploadButton = ({ onUpload, loading }) => {
  return (
    <button
      onClick={onUpload}
      disabled={loading}
      className={`w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition duration-200 shadow-md ${
        loading ? 'opacity-70 cursor-not-allowed' : ''
      }`}
    >
      {loading ? (
        <>
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Uploading...
        </>
      ) : (
        'Upload'
      )}
    </button>
  );
};

export default UploadButton;
