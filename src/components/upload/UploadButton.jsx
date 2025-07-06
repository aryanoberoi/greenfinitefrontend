import React from 'react';

const UploadButton = ({ onUpload, loading }) => {
  return (
    <div className="w-full flex justify-center items-center">
      <button
        onClick={onUpload}
        className={`
          flex items-center justify-center
          text-center
          overflow-hidden whitespace-nowrap
          !transition-all !duration-200 !ease-in-out
          !border !border-[#828282] !border-solid
          !rounded-none
          ${loading ? '!w-[160px]' : '!w-[115px]'}
          !h-[40px]
          !text-[14px] !leading-[16px] !font-normal
          ${loading 
            ? '!bg-[#003E3E] !text-[#F8F7F2]' 
            : '!bg-[#F8F7F2] !text-[#083417] hover:!bg-white active:!bg-[#003E3E] active:!text-[#F8F7F2]'
          }
          ${loading ? '!cursor-not-allowed' : '!cursor-pointer'}
        `}
        style={{
          fontFamily: 'var(--font-primary) !important',
          fontWeight: '400 !important',
          fontStyle: 'normal !important',
          letterSpacing: '0 !important',
          verticalAlign: 'middle !important',
          paddingTop: '12px !important',
          paddingBottom: '12px !important',
          paddingLeft: '23px !important',
          paddingRight: '23px !important',
          gap: '10px !important',
        }}
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-[#F8F7F2] border-t-transparent rounded-full animate-spin"></span>
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
