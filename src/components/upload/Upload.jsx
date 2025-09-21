import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloudUpload, X, Lock } from 'lucide-react';
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
        "ESG Policy Maker": 3,
      };

      
      if (selectedModule === "ESG Policy Maker") {
        content["company_name"] = formDataInputs.company_name || "Unknown Company";
        content["generated_date"] = new Date().toISOString().split("T")[0];
      }
      
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
        "ESG Policy Maker": 3,
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
    } else {
      setFormDataInputs(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleMarkAllChange = (e) => {
    const { checked } = e.target;
    const newDummyValues = {};
    const newFormDataInputs = {};

    missingFields.forEach(field => {
      newDummyValues[field.key] = checked;
      newFormDataInputs[field.key] = checked ? (selectedModule === "ESG Policy Maker" ? "We comply" : "Assume industry average") : "";
    });

    setDummyValues(newDummyValues);
    setFormDataInputs(newFormDataInputs);
  };

  return (
    <div className="w-full md:w-[35em] h-auto md:h-[35em] flex flex-col justify-between items-center p-4 bg-white bg-opacity-80 rounded-xl  space-y-3 overflow-hidden border border-gray-200">

      <p className="text-sm text-gray-700 text-center leading-tight" style={{ sfontFamily: 'var(--font-primary) !important' }}>
        {selectedModule ? `Selected Module: ${selectedModule}` : 'Select a module to begin.'}
      </p>

      {/* ✅ Steps Section */}
      {selectedFiles.length === 0 && (
        <div className="w-full max-w-lg bg-white rounded-lg p-4 shadow-sm mb-4">
          <p className="text-center text-gray-800 font-semibold mb-2">
            Upload Your Documents to Get Instant Insights
          </p>
          <p className="text-center text-gray-500 text-sm mb-4">
            Our AI analyzes your files securely and generates a tailored report in minutes.
          </p>

          <div className="flex items-center justify-between relative">
            {/* Line connectors */}
            <div className="absolute top-4 left-1/6 w-1/3 h-[2px] bg-gray-300"></div>
            <div className="absolute top-4 left-1/2 w-1/3 h-[2px] bg-gray-300"></div>

            {/* Step 1 */}
            <div className="flex flex-col items-center w-1/3 z-10">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-bold">
                1
              </div>
              <p className="mt-2 font-medium text-sm">Upload Documents</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center w-1/3 z-10">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-bold">
                2
              </div>
              <p className="mt-2 font-medium text-sm">AI Analysis</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center w-1/3 z-10">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-bold">
                3
              </div>
              <p className="mt-2 font-medium text-sm">Download Report</p>
            </div>
          </div>
        </div>
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

      {selectedFiles.length === 0 && (
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
      )}

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
          {/* ✅ Company Name always on top (for ESG Policy Maker) */}
          {selectedModule === "ESG Policy Maker" && (
            <div className="flex flex-col mb-4">
              <label className="text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                name="company_name"
                value={formDataInputs.company_name || ""}
                onChange={handleInputChange}
                placeholder="Enter company name..."
                className={`w-full border rounded px-2 py-1 text-sm mt-1 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.company_name
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-400"
                }`}
              />
              {errors.company_name && (
                <p className="text-xs text-red-500 mt-1">Please fill this field</p>
              )}
            </div>
          )}

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              onChange={handleMarkAllChange}
              className="mr-2 h-4 w-4"
            />
            <span className="text-sm">
              {selectedModule === "ESG Policy Maker" ? "Mark all unfilled fields as We comply" : "Mark all unfilled fields as Assume industry average"}
            </span>
          </div>

          <p className="font-semibold text-sm">Please provide the following missing information:</p>
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <div className="flex flex-col gap-y-2">
              {missingFields.map((field, index) => (
                <div key={field.key} className="flex flex-col mb-5 relative">
                  <label className="flex flex-col">
                    <span className="mb-[2px] text-xs">
                      {index + 1}. {selectedModule === "ESG Policy Maker" ? field.sentence : field.question}
                    </span>
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
                    {selectedModule === "ESG Policy Maker" ? (
                      <label className="flex items-center mt-1 ml-1 text-xs text-gray-600">
                        <input
                          type="checkbox"
                          name={field.key}
                          checked={dummyValues[field.key] || false}
                          onChange={(e) => {
                            handleDummyValueChange(e);
                            if (e.target.checked) {
                              setFormDataInputs(prev => ({ ...prev, [field.key]: "We comply" }));
                            } else {
                              setFormDataInputs(prev => ({ ...prev, [field.key]: "" }));
                            }
                          }}
                          className="mr-1 h-3 w-3"
                        />
                        We comply
                      </label>
                    ) : (
                      <div className="flex items-center mt-1 ml-1 text-xs text-gray-600 cursor-pointer" onClick={() => handleDummyValueChange({ target: { name: field.key, checked: !dummyValues[field.key] } })}>
                        <input
                          type="checkbox"
                          name={field.key}
                          checked={dummyValues[field.key] || false}
                          onChange={handleDummyValueChange}
                          className="mr-1 h-3 w-3"
                        />
                        Assume industry average
                      </div>
                    )}
                  </label>
                  <p className={`absolute left-0 -bottom-4 text-xs text-red-500 transform transition-all duration-300 ${errors[field.key] ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}>
                    Please fill this field
                  </p>
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
      <div className="flex items-center justify-center text-gray-600 text-sm mt-3">
        <Lock className="w-4 h-4 mr-2 text-gray-500" />
        <span>Your data is GDPR-compliant and securely processed</span>
      </div>
    </div>
  );
};

export default Upload;
