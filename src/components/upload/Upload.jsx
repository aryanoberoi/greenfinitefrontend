import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloudUpload, X } from 'lucide-react';
import UploadButton from './UploadButton';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const Upload = ({ selectedModule }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formDataInputs, setFormDataInputs] = useState({
    industry: '',
    electricity: '',
    fuelType: ''
  });

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedModule) {
      console.log("Upload component received module:", selectedModule);
    }
  }, [selectedModule]);

  // ✅ Updated handleUpload
  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    setIsUploading(true);

    try {
      const formData = new FormData();
      selectedFiles.forEach(file => {
        formData.append("files", file);
      });

      // ✅ Call new dummy route
      const missingResponse = await axios.post(
        `${API_URL}/get-missing-fields`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      const { missing_fields, session_id } = missingResponse.data;

      // ✅ Navigate with dummy JSON
      navigate("/analyze", {
        state: {
          missingFields: missing_fields,
          sessionId: session_id,
          module: selectedModule
        }
      });

    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e) => { e.preventDefault(); setIsDragOver(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragOver(false); };
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
    e.target.value = "";
  };
  const removeFile = (name) => setSelectedFiles(prev => prev.filter(f => f.name !== name));
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataInputs(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full md:w-[35em] h-auto md:h-[35em] flex flex-col justify-between items-center p-4 bg-white bg-opacity-80 rounded-xl shadow-2xl border-4 border-transparent space-y-3 overflow-hidden">

      <p className="text-sm text-gray-700 text-center leading-tight" style={{ fontFamily: 'var(--font-primary) !important' }}>
        {selectedModule ? `Selected Module: ${selectedModule}` : 'Select a module to begin.'}
      </p>

      <div className="flex flex-wrap gap-2 justify-start w-full max-w-lg max-h-[3em] overflow-y-auto">
        {selectedFiles.map((file, index) => (
          <div key={index} className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-[2px] rounded-full text-xs relative group">
            {file.name}
            <button onClick={() => removeFile(file.name)} className="ml-1 !bg-transparent text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <X size={12} />
            </button>
          </div>
        ))}
      </div>

      <div
        className={`
          flex flex-col justify-center items-center w-full max-w-lg text-center
          border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 text-gray-600
          hover:border-blue-400 hover:text-blue-500 cursor-pointer transition-all duration-300
          ${isDragOver ? 'border-blue-500' : ''}
          ${selectedFiles.length === 0 ? 'h-[25em] p-8' : 'h-auto p-4'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{ fontFamily: 'var(--font-primary) !important' }}
      >
        <CloudUpload className="w-10 h-10 mb-1 text-gray-500" />
        <p className="text-sm font-medium mb-1">Drag & Drop or Click to Add File</p>
        <p className="text-xs">One file at a time</p>
      </div>

      <input type="file" accept=".pdf,.docx,.txt" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

      {selectedFiles.length > 0 && (
        <div style={{ fontFamily: 'var(--font-primary) !important' }} className="w-full max-w-lg space-y-2 text-left text-gray-700 text-sm mt-1">
          <p className="font-semibold text-sm">Quick Questionnaire</p>

          <div className="flex flex-col gap-y-2">
            <label className="flex flex-col">
              <span className="mb-[2px] text-xs">1. What is your industry sector?</span>
              <input type="text" name="industry" value={formDataInputs.industry} onChange={handleInputChange} placeholder="e.g. Manufacturing, IT, Retail..." className="border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </label>

            <label className="flex flex-col">
              <span className="mb-[2px] text-xs">2. How much electricity do you consume monthly (in kWh)?</span>
              <input type="text" name="electricity" value={formDataInputs.electricity} onChange={handleInputChange} placeholder="e.g. 2000" className="border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </label>

            <label className="flex flex-col">
              <span className="mb-[2px] text-xs">3. What type of fuel do your vehicles use?</span>
              <input type="text" name="fuelType" value={formDataInputs.fuelType} onChange={handleInputChange} placeholder="e.g. Diesel, Petrol, Electric" className="border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </label>
          </div>
        </div>
      )}

      <div className="w-full max-w-xs">
        <UploadButton onUpload={handleUpload} loading={isUploading} />
      </div>
    </div>
  );
};

export default Upload;
