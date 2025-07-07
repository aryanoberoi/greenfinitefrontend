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
    // This will now log a number, e.g., 1, 2, or 3
    if (selectedModule) {
      console.log("Upload component received module:", selectedModule, typeof selectedModule);
    }
  }, [selectedModule]);

  const handleUpload = async () => {
    // --- FIX 1: Add robust validation before sending the request ---
    if (selectedFiles.length === 0) {
      alert("Please select a file to upload.");
      return;
    }
    // This check is now more reliable because we expect a number
    if (!selectedModule || typeof selectedModule !== 'number' || selectedModule <= 0) {
      alert("Please select a valid module before uploading.");
      return;
    }
  
    setIsUploading(true);
  console.log(selectedModule);
    try {
      const moduleMap = {
        "MODULE ONE": 1,
        "MODULE TWO": 2,
        "MODULE THREE": 3,
      };
      const formData = new FormData();
      formData.append("module", moduleMap[selectedModule]);
      selectedFiles.forEach(file => {
        formData.append("files", file);
      });
<<<<<<< HEAD

      // The selectedModule is already a number, so this is safe
      formData.append("module", selectedModule);
=======
>>>>>>> main
  
      const response = await axios.post(
        `http://localhost:8000/uploadpdf`,
        formData,
        {
          // --- FIX 2: REMOVE manual Content-Type header ---
          // Let the browser set it automatically with the correct boundary.
          // This is a common cause of 422 errors with FormData.
          responseType: 'blob',
        }
      );
      
      const contentDisposition = response.headers['content-disposition'];
      const fileNameMatch = contentDisposition?.match(/filename="?(.+)"?/);
      const fileName = fileNameMatch ? fileNameMatch[1] : 'processed.pdf';
  
      const fileBlob = new Blob([response.data], { type: 'application/pdf' });
      const fileUrl = URL.createObjectURL(fileBlob);
  
      navigate("/analyze", {
        state: {
          fileUrl,
          fileName,
          module: selectedModule,
        },
      });
  
    } catch (err) {
      console.error("Upload error:", err);
      // More descriptive error for the user
      if (err.response && err.response.status === 422) {
        alert("Upload failed: The data sent was invalid. Please ensure a file and module are correctly selected.");
      } else {
        alert("Upload failed. Please check the console for details.");
      }
    } finally {
      setIsUploading(false);
    }
  };
  
  // --- No changes needed below this line ---
  
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
      <p className="text-base text-gray-700 text-center leading-relaxed">
        {selectedModule ? `Selected Module ID: ${selectedModule}` : 'Select a module to begin.'}
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
