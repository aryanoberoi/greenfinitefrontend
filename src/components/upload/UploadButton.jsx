import React from 'react';

const UploadButton = ({ onUpload, loading }) => {
  return (
    <button
      onClick={onUpload}
      className={`
        w-full max-w-xs text-center
        px-6 py-2
        !border !border-gray-300 !border-solid {/* Added !important to border and border-gray-300 */}
        !rounded-3xl
        font-mono !text-lg !font-medium {/* Added !important to text-lg and font-medium */}
        !text-[#083417]
        !bg-[#F8F7F2] hover:!bg-white active:!bg-[#D2DAB6]
        transition-all duration-150 ease-in-out
        ${loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
      `}
      style={{
        fontFamily: 'monospace', // if global inherits something else
      }}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-[#083417] border-t-transparent rounded-full animate-spin"></span>
          Uploading...
        </span>
      ) : (
        'Upload'
      )}
    </button>
  );
};

export default UploadButton;
