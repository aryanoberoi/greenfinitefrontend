import React from 'react';

const UploadButton = ({ onUpload, loading }) => {
  return (
    <div className="w-full flex justify-center items-center">
      <button
        onClick={onUpload}
        className={`
          flex items-center justify-center
          text-center
          !transition-all !duration-150 !ease-in-out
          !border !border-[#828282] !border-solid
          !rounded-none
          !text-[#083417]
          !bg-[#F8F7F2]
          !w-[115px] !h-[40px]
          hover:!bg-white
          active:!bg-[#003E3E]
          active:!text-[#F8F7F2]
          ${loading ? '!opacity-60 !cursor-not-allowed' : '!cursor-pointer'}
        `}
        style={{
          fontFamily: 'var(--font-primary) !important',
          fontWeight: '400 !important',
          fontStyle: 'normal !important',
          fontSize: '14px !important',
          lineHeight: '16px !important',
          letterSpacing: '0 !important',
          verticalAlign: 'middle !important',
          paddingTop: '12px !important',
          paddingBottom: '12px !important',
          paddingLeft: '23px !important',
          paddingRight: '23px !important',
          gap: '10px !important',
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
    </div>
  );
};

export default UploadButton;
