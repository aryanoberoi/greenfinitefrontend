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
  const [formDataInputs, setFormDataInputs] = useState({});
  const [missingFields, setMissingFields] = useState([]);
  const [allResponses, setAllResponses] = useState([]);
  const [dummyValues, setDummyValues] = useState({});

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
      // Create a complete content object with all responses
      const content = {};

      // Add all the responses from the API
      allResponses.forEach(response => {
        content[response.key] = response.response;
      });

      // Override with user-provided answers for the missing fields
      if (missingFields.length > 0) {
        missingFields.forEach(field => {
          if (dummyValues[field.key]) {
            content[field.key] = "This will be filled by dummy value";
          } else if (formDataInputs[field.key]) {
            content[field.key] = formDataInputs[field.key];
          }
        });
      }

      // Generate a filename using the original file's name
      const originalFileName = selectedFiles[0].name;
      const fileNameWithoutExt = originalFileName.split('.')[0];
      const timestamp = new Date().getTime();
      const filename = `${fileNameWithoutExt}_${timestamp}.json`;

      const moduleMap = {
        "ESG Analyzer": 1,
        "Carbon Estimator": 2,
        "Sustainability Report Generator": 3,
      };

      // Create the JSON payload
      const jsonPayload = {
        filename: filename,
        content: content,
        module: moduleMap[selectedModule]  // <-- key must be "module" and value an integer
      };

      // Send JSON to the endpoint
      const response = await axios.post(
        `${API_URL}/uploadpdf`,
        jsonPayload,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      // Navigate to the analyze page with the session info
      const sessionId = timestamp; // Use the timestamp as session ID

      navigate("/analyze", {
        state: {
          filename: filename,
          module: selectedModule,
          sessionId: sessionId,
          allResponses: content
        },
      });

    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const uploadFileToBacked = async (file) => {
    if (!file || !selectedModule) return;
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("files", file);

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

      // Store all responses
      setAllResponses(responses);

      // Filter for questions with missing information
      const missingFieldsData = responses.filter(item => {
        return item.response.includes("does not contain") ||
          item.response.includes("unable to") ||
          item.response.includes("not possible") ||
          item.response === "NA";
      });

      setMissingFields(missingFieldsData);

      // Initialize form data inputs for missing fields
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
      alert("Error analyzing document. Please try again.");
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
      uploadFileToBacked(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !selectedFiles.find(f => f.name === file.name)) {
      setSelectedFiles(prev => [...prev, file]);
      uploadFileToBacked(file);
    }
    e.target.value = "";
  };

  const removeFile = (name) => {
    setSelectedFiles(prev => prev.filter(f => f.name !== name));
    // Clear all data when removing a file
    setMissingFields([]);
    setAllResponses([]);
    setFormDataInputs({});
    setDummyValues({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleDummyValueChange = (e) => {
    const { name, checked } = e.target;
    setDummyValues(prev => ({ ...prev, [name]: checked }));

    // If checkbox is checked, disable the input and set a placeholder value
    if (checked) {
      setFormDataInputs(prev => ({
        ...prev,
        [name]: "This will be filled by dummy value"
      }));
    } else {
      setFormDataInputs(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  return (
    <div className="w-full md:w-[35em] h-auto md:h-[35em] flex flex-col justify-between items-center p-4 bg-white bg-opacity-80 rounded-xl  border-4 border-transparent space-y-3 overflow-hidden">

      {/* Selected Module Info */}
      <p className="text-sm text-gray-700 text-center leading-tight" style={{ fontFamily: 'var(--font-primary) !important' }}>
        {selectedModule ? `Selected Module: ${selectedModule}` : 'Select a module to begin.'}
      </p>

      {/* Uploaded File Tags */}
      <div className="flex flex-wrap gap-2 justify-start w-full max-w-lg max-h-[3em] overflow-y-auto">
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
        className={`flex flex-col justify-center items-center w-full max-w-lg p-4 text-center
        border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 text-gray-600 hover:border-blue-400 hover:text-blue-500 cursor-pointer 
        transition-all duration-300 ${isDragOver ? 'border-blue-500' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{ fontFamily: 'var(--font-primary) !important' }}
      >
        <CloudUpload className="w-10 h-10 mb-1 text-gray-500" />
        <p className="text-sm font-medium mb-1">Drag & Drop or Click to Add File</p>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        accept=".pdf,.docx,.txt"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
      />

      {/* Display Dynamic Missing Fields with Scroll */}
      {missingFields.length > 0 ? (
        <div
          style={{ fontFamily: 'var(--font-primary) !important' }}
          className="w-full max-w-lg space-y-2 text-left text-gray-700 text-sm mt-1 flex-1 overflow-hidden flex flex-col"
        >
          <p className="font-semibold text-sm">Please provide the following missing information:</p>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <div className="flex flex-col gap-y-2">
              {missingFields.map((field, index) => (
                <div key={field.key} className="flex flex-col mb-3">
                  <label className="flex flex-col">
                    <span className="mb-[2px] text-xs">{index + 1}. {field.question}</span>
                    <input
                      type="text"
                      name={field.key}
                      value={formDataInputs[field.key] || ''}
                      onChange={handleInputChange}
                      placeholder={`Enter ${field.key.replace(/_/g, ' ')}...`}
                      className="border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
                      disabled={dummyValues[field.key]}
                    />
                  </label>
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
          <p
            style={{ fontFamily: 'var(--font-primary) !important' }}
            className="text-sm">Analyzing document...
          </p>
        </div>
      ) : null}

      {/* Upload Button */}
      <div className="w-full max-w-xs">
        <UploadButton
          onUpload={handleUpload}
          loading={isUploading}
          text={missingFields.length > 0 ? "Continue with Analysis" : "Process Document"}
        />
      </div>
    </div>
  );
};

export default Upload;