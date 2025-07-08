import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloudUpload, X } from 'lucide-react';
import UploadButton from './UploadButton';
import axios from 'axios';

const Upload = ({ selectedModule }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedModule) {
      console.log("Upload component received module:", selectedModule);
    }
  }, [selectedModule]);

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
  
    setIsUploading(true);
  
    try {
      const formData = new FormData();
      selectedFiles.forEach(file => {
        formData.append("files", file);
      });

      const moduleMap = {
        "MODULE ONE": 1,
        "MODULE TWO": 2,
        "MODULE THREE": 3,
      };
      formData.append("module", moduleMap[selectedModule]);
  
      const response = await axios.post(
        `http://localhost:8000/uploadpdf`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob', // Expect PDF blob back
        }
      );
      
      // Extract filename from headers
      const contentDisposition = response.headers['content-disposition'];
      let filename = 'downloaded-file.pdf'; // Default filename
      
      if (contentDisposition) {
          const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
          if (filenameMatch && filenameMatch.length > 1) {
              filename = filenameMatch[1];
          }
      }
      
      const sessionId = filename.split('_')[1].split('.')[0];
      // Create a Blob URL for the PDF
      const fileBlob = new Blob([response.data], { type: 'application/pdf' });
      const fileUrl = URL.createObjectURL(fileBlob);
  
      // Navigate with blob URL
      navigate("/analyze", {
        state: {
          fileUrl,
          filename,
          module: selectedModule,
          sessionId: sessionId,
        },
      });
  
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed.");
    } finally {
      setIsUploading(false);
    }
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
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && !selectedFiles.find(f => f.name === droppedFile.name)) {
      setSelectedFiles(prev => [...prev, droppedFile]);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !selectedFiles.find(f => f.name === file.name)) {
      setSelectedFiles(prev => [...prev, file]);
    }
    e.target.value = ""; // reset for same file
  };

  const removeFile = (name) => {
    setSelectedFiles(prev => prev.filter(f => f.name !== name));
  };

  return (
    <div className="w-[35em] h-[35em] flex flex-col justify-between items-center p-6 bg-white bg-opacity-80 rounded-xl shadow-2xl border-4 border-transparent space-y-4 overflow-hidden">
      
      {/* Selected Module Info */}
      <p className="text-base text-gray-700 text-center leading-relaxed" style={{fontFamily: 'var(--font-primary) !important'}}>
        {selectedModule ? `Selected Module: ${selectedModule}` : 'Select a module to begin.'}
      </p>

      {/* Uploaded File Tags */}
      <div className="flex flex-wrap gap-2 justify-start w-full max-w-lg max-h-[3.5em] overflow-y-auto">
        {selectedFiles.map((file, index) => (
          <div
            key={index}
            className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-[2px] rounded-full text-xs relative group"
          >
            {file.name}
            <button
              onClick={() => removeFile(file.name)}
              className="ml-1 !bg-transparent text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              title="Remove"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>

      {/* Drag-and-Drop Box */}
      <div
        className={`flex-1 flex flex-col justify-center items-center w-full max-w-lg p-6 text-center
        border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 text-gray-600 hover:border-blue-400 hover:text-blue-500 cursor-pointer 
        transition-all duration-300 ${isDragOver ? 'border-blue-500' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{fontFamily: 'var(--font-primary) !important'}}
      >
        <CloudUpload className="w-12 h-12 mb-2 text-gray-500" />
        <p className="text-base font-semibold mb-1">Drag & Drop or Click to Add File</p>
        <p className="text-xs">You can upload one file at a time</p>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        accept=".pdf,.docx,.txt"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload Button */}
      <div className="w-full max-w-xs">
        <UploadButton onUpload={handleUpload} loading={isUploading} />
      </div>
    </div>
  );
};

export default Upload;
