import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloudUpload } from 'lucide-react'; // Importing a modern cloud upload icon from lucide-react

// Placeholder Dropdown Component (defined locally to resolve import error)
const Dropdown = ({ selectedType, setSelectedType }) => {
  const options = [
    { value: '', label: 'Select Document Type' },
    { value: 'pdf', label: 'PDF' },
    { value: 'docx', label: 'DOCX' },
    { value: 'txt', label: 'TXT' },
  ];

  return (
    <select
      className="block w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
      value={selectedType}
      onChange={(e) => setSelectedType(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

// Placeholder UploadButton Component (defined locally to resolve import error)
const UploadButton = ({ onFileSelect, onUpload, fileInputRef }) => {
  const handleButtonClick = () => {
    onUpload(); // Trigger the upload logic
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => onFileSelect(e.target.files[0])}
        className="hidden" // Hide the default file input
      />
      <button
        onClick={handleButtonClick}
        className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg text-xl font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Upload File
      </button>
    </>
  );
};


const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!selectedFile) {
      // Replaced alert with a custom message handling (e.g., a modal or toast)
      // For this example, we'll just log to console as alerts are not allowed.
      console.log("Please select a file to upload.");
      return;
    }

    const fileUrl = URL.createObjectURL(selectedFile);
    navigate('/analyze', {
      state: {
        fileUrl: URL.createObjectURL(selectedFile),
        fileName: selectedFile.name
      }
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  const getPlaceholderText = () => {
    switch (selectedType) {
      case 'pdf': return "PDF files are ideal for sharing professional-looking documents.";
      case 'docx': return "Upload DOCX files for editable documents.";
      case 'txt': return "TXT files are great for plain text.";
      default: return "Choose a file type above.";
    }
  };

  return (
    <div
      className={`w-[35em] h-[35em] flex flex-col justify-between items-center p-10 bg-white bg-opacity-80 rounded-xl shadow-2xl space-y-8
      border-4 transition-all duration-300 ease-in-out ${isDragOver ? 'border-blue-500 border-dashed' : 'border-transparent'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="space-y-6 w-full max-w-lg">
        <Dropdown selectedType={selectedType} setSelectedType={setSelectedType} />
      </div>

      <p className="text-base text-gray-700 text-center leading-relaxed max-w-lg">{getPlaceholderText()}</p>

      <div
        className="flex-1 flex flex-col justify-center items-center w-full max-w-lg p-8 text-center
        border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 text-gray-600 hover:border-blue-400 hover:text-blue-500 cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        {selectedFile ? (
          <p className="text-xl font-semibold text-green-700">File Ready: {selectedFile.name}</p>
        ) : (
          <>
            {/* Replaced old SVG with modern CloudUpload icon from lucide-react */}
            <CloudUpload className="w-14 h-14 mb-4 text-gray-500" />
            <p className="text-xl font-semibold mb-2">Drag & Drop Your File Here</p>
            <p className="text-sm">or click to browse</p>
          </>
        )}
      </div>

      <div className="w-full max-w-xs">
        <UploadButton onFileSelect={handleFileChange} onUpload={handleUpload} fileInputRef={fileInputRef} />
      </div>
    </div>
  );
};

export default Upload;
