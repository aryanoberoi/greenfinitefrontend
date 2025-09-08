import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloudUpload, X } from 'lucide-react';
import UploadButton from './UploadButton';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const Upload = ({ selectedModule: incomingModule }) => {
  const selectedModule = incomingModule || "ESG Analyzer";
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formDataInputs, setFormDataInputs] = useState({});
  const [missingFields, setMissingFields] = useState([]);
  const [allResponses, setAllResponses] = useState([]);
  const [dummyValues, setDummyValues] = useState({});
  const [errors, setErrors] = useState({});

  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const fieldRefs = useRef({});

  useEffect(() => {
    if (selectedModule) {
      console.log("Upload component received module:", selectedModule);
    }
  }, [selectedModule]);

  // ---- Upload JSON to /uploadpdf ----
  const handleUpload = async () => {
    const newErrors = {};
    let hasError = false;
    let firstUnfilledKey = null;

    missingFields.forEach(field => {
      if (!formDataInputs[field.key] && !dummyValues[field.key]) {
        newErrors[field.key] = true;
        hasError = true;
        if (!firstUnfilledKey) firstUnfilledKey = field.key;
      }
    });

    if (hasError) {
      setErrors(newErrors);
      alert("⚠️ Please fill all the fields.");
      if (firstUnfilledKey && fieldRefs.current[firstUnfilledKey]) {
        fieldRefs.current[firstUnfilledKey].scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
        fieldRefs.current[firstUnfilledKey].focus();
      }
      return;
    }
    setErrors({});

    if (selectedFiles.length === 0) return;
    setIsUploading(true);

    try {
      const content = {};
      allResponses.forEach(response => {
        content[response.key] = response.response;
      });

      missingFields.forEach(field => {
        if (dummyValues[field.key]) {
          content[field.key] = "Assume industry average";
        } else if (formDataInputs[field.key]) {
          content[field.key] = formDataInputs[field.key];
        }
      });

      const timestamp = new Date().getTime();
      const filename = `documents_${timestamp}.json`;

      const moduleMap = {
        "ESG Analyzer": 1,
        "Carbon Estimator": 2,
        "Sustainability Report Generator": 3,
      };

      const response = await axios.post(
        `${API_URL}/uploadpdf`,
        {
          filename,
          content,
          module: moduleMap[selectedModule]
        },
        { headers: { 'Content-Type': 'application/json' }, responseType: 'blob' }
      );

      const docId = response.headers['x-doc-id'] || null;
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const fileUrl = URL.createObjectURL(pdfBlob);
      const sessionId = timestamp;

      navigate("/analyze", {
        state: {
          fileUrl,
          docId,
          filename: selectedFiles.map(f => f.name).join(', '),
          module: selectedModule,
          sessionId,
          allResponses: content
        }
      });

    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  // ---- Upload raw files to /get-missing-fields ----
  const uploadFilesForAnalysis = async (files) => {
    if (!files || files.length === 0 || !selectedModule) return;
    setIsUploading(true);

    try {
      const formData = new FormData();
      files.forEach(file => formData.append("files", file));

      const moduleMap = {
        "ESG Analyzer": 1,
        "Carbon Estimator": 2,
        "Sustainability Report Generator": 3,
      };
      formData.append("module", moduleMap[selectedModule]);

      const response = await axios.post(
        `${API_URL}/get-missing-fields`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      const { responses } = response.data;
      setAllResponses(responses);

      const missingFieldsData = responses.filter(item => {
        return item.response.includes("does not contain") ||
          item.response.includes("unable to") ||
          item.response.includes("not possible") ||
          item.response === "NA";
      });

      setMissingFields(missingFieldsData);

      const initialFormData = {};
      const initialDummyValues = {};
      missingFieldsData.forEach(field => {
        initialFormData[field.key] = '';
        initialDummyValues[field.key] = false;
      });

      setFormDataInputs(initialFormData);
      setDummyValues(initialDummyValues);

    } catch (err) {
      console.error("Analysis error:", err);
      alert("Error analyzing documents. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // ---- Drag & Drop Handlers ----
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
    const files = Array.from(e.dataTransfer.files);
    const newFiles = files.filter(f => !selectedFiles.find(sf => sf.name === f.name));

    if (newFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...newFiles]);
      uploadFilesForAnalysis(newFiles);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.filter(f => !selectedFiles.find(sf => sf.name === f.name));

    if (newFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...newFiles]);
      uploadFilesForAnalysis(newFiles);
    }
    e.target.value = "";
  };

  const removeFile = (name) => {
    setSelectedFiles(prev => prev.filter(f => f.name !== name));
    setMissingFields([]);
    setAllResponses([]);
    setFormDataInputs({});
    setDummyValues({});
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataInputs(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: false }));
  };

  const handleDummyValueChange = (e) => {
    const { name, checked } = e.target;
    setDummyValues(prev => ({ ...prev, [name]: checked }));
  
    if (checked) {
      setFormDataInputs(prev => ({ ...prev, [name]: "Assume industry average" }));
      setErrors(prev => ({ ...prev, [name]: false }));
  
      const fieldKeys = missingFields.map(f => f.key);
      const currentIndex = fieldKeys.indexOf(name);
      const nextKey = fieldKeys[currentIndex + 1];
      if (nextKey && fieldRefs.current[nextKey]) {
        fieldRefs.current[nextKey].scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
        fieldRefs.current[nextKey].focus();
      }
    } else {
      setFormDataInputs(prev => ({ ...prev, [name]: "" }));
    }
  };
  

  return (
    <div className="w-full md:w-[35em] h-auto md:h-[35em] flex flex-col justify-between items-center p-4 bg-white bg-opacity-80 rounded-xl  space-y-3 overflow-hidden border border-gray-200">

      <p className="text-sm text-gray-700 text-center leading-tight" style={{ sfontFamily: 'var(--font-primary) !important' }}>
        {selectedModule ? `Selected Module: ${selectedModule}` : 'Select a module to begin.'}
      </p>

      {/* ✅ Show Image if no file selected */}
      {selectedFiles.length === 0 && (
        <img 
          src="/img1.png"  // replace with your image path
          alt="Upload Placeholder"
          className="w-80 h-80 object-contain opacity-80"
        />
      )}

      <div className="flex flex-wrap gap-2 justify-start w-full max-w-lg max-h-[3em] overflow-y-auto">
        {selectedFiles.map((file, index) => (
          <div key={index} className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-[2px] rounded-full text-xs relative group">
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

      <div
        className={`flex flex-col justify-center items-center w-full max-w-lg p-4 text-center border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 text-gray-600 hover:border-blue-400 hover:text-blue-500 cursor-pointer transition-all duration-300 ${isDragOver ? 'border-blue-500' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{ fontFamily: 'var(--font-primary) !important' }}
      >
        <CloudUpload className="w-10 h-10 mb-1 text-gray-500" />
        <p className="text-sm font-medium mb-1">Drag & Drop or Click to Add Files</p>
      </div>

      <input
        type="file"
        accept=".pdf,.docx,.txt"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
      />

      {missingFields.length > 0 ? (
        <div style={{ fontFamily: 'var(--font-primary) !important' }} className="w-full max-w-lg space-y-2 text-left text-gray-700 text-sm mt-1 flex-1 overflow-hidden flex flex-col">
          <p className="font-semibold text-sm">Please provide the following missing information:</p>
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <div className="flex flex-col gap-y-2">
              {missingFields.map((field, index) => (
                <div key={field.key} className="flex flex-col mb-5 relative">
                  <label className="flex flex-col">
                    <span className="mb-[2px] text-xs">{index + 1}. {field.question}</span>
                    <input
                      ref={(el) => (fieldRefs.current[field.key] = el)}
                      type="text"
                      name={field.key}
                      value={formDataInputs[field.key] || ''}
                      onChange={handleInputChange}
                      placeholder={`Enter ${field.key.replace(/_/g, ' ')}...`}
                      className={`border rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 transition-all duration-300 ${errors[field.key] ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"}`}
                      disabled={dummyValues[field.key]}
                    />
                  </label>
                  <p className={`absolute left-0 -bottom-4 text-xs text-red-500 transform transition-all duration-300 ${errors[field.key] ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}>
                    Please fill this field
                  </p>
                  <label className="flex items-center mt-1 ml-1 text-xs text-gray-600">
                    <input
                      type="checkbox"
                      name={field.key}
                      checked={dummyValues[field.key] || false}
                      onChange={handleDummyValueChange}
                      className="mr-1 h-3 w-3"
                    />
                    Assume industry average
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : selectedFiles.length > 0 ? (
        <div className="w-full max-w-lg text-center text-gray-700">
          <p style={{ fontFamily: 'var(--font-primary) !important' }} className="text-sm">Analyzing documents...</p>
        </div>
      ) : null}

      <div className="w-full max-w-xs">
        <UploadButton
          onUpload={handleUpload}
          loading={isUploading}
          text={missingFields.length > 0 ? "Continue with Analysis" : "Process Documents"}
          disabled={missingFields.some(field => !formDataInputs[field.key] && !dummyValues[field.key])}
        />
      </div>
    </div>
  );
};

export default Upload;
