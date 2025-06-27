import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import mammoth from 'mammoth';

const DocPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const file = location.state?.file;
  const fileName = location.state?.fileName;

  const [textContent, setTextContent] = useState('');
  const [docxContent, setDocxContent] = useState('');

  useEffect(() => {
    if (!file) return;

    const readFile = async () => {
      try {
        if (file.name.endsWith('.txt')) {
          const text = await file.text();
          setTextContent(text);
        } else if (file.name.endsWith('.docx')) {
          const arrayBuffer = await file.arrayBuffer();
          const result = await mammoth.convertToHtml({ arrayBuffer });
          setDocxContent(result.value);
        }
      } catch (error) {
        console.error('Error reading file:', error);
      }
    };

    readFile();
  }, [file]);

  if (!file) {
    return (
      <div className="text-center p-8 text-red-600 font-semibold border-2 border-grey-600 rounded-xl">
        No file provided. Please{' '}
        <button onClick={() => navigate('/')} className="underline text-blue-600">
          upload a file first
        </button>.
      </div>
    );
  }

  return (
    <div className="w-full md:w-[48%] h-[33em] bg-white bg-opacity-90 rounded-xl shadow-2xl p-6 flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-[1.005] font-sans overflow-hidden">
      <p className="text-sm text-gray-500 text-center mb-1 italic truncate">{fileName}</p>
      <h2 className="text-3xl font-extrabold mb-4 text-gray-800 text-center">Doc Preview</h2>

      <div className="flex-1 border border-gray-300 bg-white text-gray-800 rounded-lg p-4 overflow-auto text-sm">
        {fileName.endsWith('.txt') ? (
          <pre className="whitespace-pre-wrap text-gray-800">{textContent}</pre>
        ) : fileName.endsWith('.docx') ? (
          <div dangerouslySetInnerHTML={{ __html: docxContent }} />
        ) : (
          <iframe
            src={URL.createObjectURL(file)}
            width="100%"
            height="100%"
            title="PDF Preview"
            className="w-full h-full border-none rounded-lg"
            allow="fullscreen"
          />
        )}
      </div>
    </div>
  );
};

export default DocPreview;
