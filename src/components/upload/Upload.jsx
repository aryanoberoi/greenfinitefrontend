import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloudUpload } from 'lucide-react';
import UploadButton from './UploadButton';
import api from '../../api/axios'; // ✅ axios instance

const Upload = ({ selectedModule }) => {
  const [selectedFile, setSelectedFile] = useState(null);
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
    if (!selectedFile) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await api.post('/upload-pdf/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { processed_file } = response.data;

      if (processed_file) {
        navigate("/analyze", {
          state: {
            fileUrl: `${api.defaults.baseURL}/processed_files/${processed_file}`,
            fileName: processed_file,
            module: selectedModule,
          },
        });
      }
    } catch (err) {
      console.error("Upload error:", err?.response?.data || err.message);
      alert("Upload failed. Please try again.");
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
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  return (
    <div
      className={`w-[35em] h-[35em] flex flex-col justify-between items-center p-10 bg-white bg-opacity-80 rounded-xl shadow-2xl space-y-8
      border-4 transition-all duration-300 ease-in-out ${isDragOver ? 'border-blue-500 border-dashed' : 'border-transparent'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p className="text-base text-gray-700 text-center leading-relaxed max-w-lg">
        {selectedModule ? `Selected Module: ${selectedModule}` : 'Select a module to begin.'}<br />
        Upload a file to get started. We support PDF, DOCX, and TXT formats.
      </p>

      <div
        className="flex-1 flex flex-col justify-center items-center w-full max-w-lg p-8 text-center
        border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 text-gray-600 hover:border-blue-400 hover:text-blue-500 cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        {selectedFile ? (
          <p className="text-xl font-semibold text-green-700">File Ready: {selectedFile.name}</p>
        ) : (
          <>
            <CloudUpload className="w-14 h-14 mb-4 text-gray-500" />
            <p className="text-xl font-semibold mb-2">Drag & Drop Your File Here</p>
            <p className="text-sm">or click to browse</p>
          </>
        )}
      </div>

      <input
        type="file"
        accept=".pdf,.docx,.txt"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="w-full max-w-xs">
        <UploadButton onUpload={handleUpload} loading={isUploading} />
      </div>
    </div>
  );
};

export default Upload;
