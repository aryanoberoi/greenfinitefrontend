import React from 'react';

const UploadButton = ({ onUpload }) => {
  return (
    <button
      onClick={onUpload}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition duration-200 shadow-md"
    >
      Upload
    </button>
  );
};

export default UploadButton;
