import React, { useState } from 'react';
import { Upload, X, File, Check } from 'lucide-react';

interface FileUploadProps {
  label: string;
  accept?: string;
  required?: boolean;
  onChange: (file: File | null) => void;
  error?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  accept = '',
  required = false,
  onChange,
  error,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    onChange(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files?.[0] || null;
    setFile(droppedFile);
    onChange(droppedFile);
  };

  const clearFile = () => {
    setFile(null);
    onChange(null);
  };

  return (
    <div className="mb-4">
      <label className="block mb-1 text-sm font-medium text-text-primary">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      
      <div
        className={`border-2 border-dashed rounded p-4 text-center ${
          isDragging ? 'border-primary bg-accent/30' : 'border-gray-300'
        } ${error ? 'border-error' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!file ? (
          <div className="py-4">
            <Upload className="mx-auto mb-2 text-gray-400" size={24} />
            <p className="text-sm text-text-secondary mb-2">
              Drag and drop a file here, or click to browse
            </p>
            <input
              type="file"
              accept={accept}
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-block px-4 py-2 text-sm bg-accent text-primary rounded cursor-pointer hover:bg-accent-dark"
            >
              Browse Files
            </label>
          </div>
        ) : (
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <File size={20} className="text-primary mr-2" />
              <div className="text-left">
                <p className="text-sm font-medium truncate max-w-xs">
                  {file.name}
                </p>
                <p className="text-xs text-text-secondary">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Check size={18} className="text-success mr-2" />
              <button
                type="button"
                onClick={clearFile}
                className="text-error hover:text-error-dark"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
      
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
};

export default FileUpload;