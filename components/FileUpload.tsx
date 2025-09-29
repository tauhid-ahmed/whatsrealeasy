"use client";

import axios, { AxiosRequestConfig } from "axios";
import {
  FileAudio,
  FileIcon,
  FileImage,
  FileText,
  FileVideo,
  LucideCloudUpload,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { ChangeEvent, DragEvent, useRef, useState } from "react";
import Button from "@/components/Button";
import { logError } from "@/lib/logger";

// ============================================================================
// Types
// ============================================================================

type FileWithProgress = {
  id: string;
  file: File;
  progress: number;
  uploaded: boolean;
  error?: string;
};

export type FileUploadProps = {
  accept?: string;
  maxFileSize?: number;
  maxFiles?: number;
  multiple?: boolean;
  onFilesChange: (files: File[]) => void;
  value?: File[];
  name?: string;
  className?: string;
  disabled?: boolean;
};

// ============================================================================
// FileUpload Component (UI Only)
// ============================================================================

export default function FileUpload({
  accept,
  maxFileSize = 10 * 1024 * 1024,
  maxFiles = 10,
  multiple = true,
  onFilesChange,
  value = [],
  name = "files",
  className = "",
  disabled = false,
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentFiles: FileWithProgress[] = value.map((file, idx) => ({
    id: `${file.name}-${idx}`,
    file,
    progress: 0,
    uploaded: false,
  }));

  const validateFile = (file: File): string | null => {
    if (maxFileSize && file.size > maxFileSize) {
      return `File exceeds ${formatFileSize(maxFileSize)}`;
    }
    if (accept) {
      const acceptedTypes = accept.split(",").map((t) => t.trim());
      const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
      const mimeType = file.type;
      const isValid = acceptedTypes.some(
        (type) =>
          type === mimeType ||
          type === fileExtension ||
          (type.endsWith("/*") && mimeType.startsWith(type.slice(0, -2)))
      );
      if (!isValid) return "File type not allowed";
    }
    return null;
  };

  const addFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList);
    const totalFiles = currentFiles.length + newFiles.length;

    if (totalFiles > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const validFiles = newFiles.filter((file) => {
      const error = validateFile(file);
      if (error) {
        alert(`${file.name}: ${error}`);
        return false;
      }
      return true;
    });

    onFilesChange([...value, ...validFiles]);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      addFiles(e.target.files);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  };

  const removeFile = (id: string) => {
    const updated = currentFiles.filter((f) => f.id !== id);
    onFilesChange(updated.map((f) => f.file));
  };

  const clearAll = () => {
    onFilesChange([]);
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver
            ? "border-primary-500 bg-primary-500/10"
            : "border-gray-600 hover:border-gray-500 bg-gray-800"
        } ${disabled ? "opacity-50 pointer-events-none" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <LucideCloudUpload
          className={`mx-auto mb-4 ${
            isDragOver ? "text-primary-500" : "text-gray-400"
          }`}
          size={48}
        />
        <div className="mb-4">
          <p className="text-lg font-medium mb-2">
            {isDragOver ? "Drop files here" : "Drag and drop files here"}
          </p>
          <p className="text-gray-400 text-sm">or</p>
        </div>
        <div className="flex gap-2 justify-center flex-wrap">
          <input
            ref={inputRef}
            type="file"
            name={name}
            onChange={handleFileSelect}
            multiple={multiple}
            accept={accept}
            disabled={disabled}
            className="hidden"
            id="file-upload-input"
          />
          <label htmlFor="file-upload-input">
            <Button
              type="button"
              onClick={() => inputRef.current?.click()}
              size="sm"
              disabled={disabled || currentFiles.length >= maxFiles}
            >
              <Plus size={18} />
              Select Files
            </Button>
          </label>
          {currentFiles.length > 0 && (
            <Button onClick={clearAll} disabled={disabled} size="sm">
              <Trash2 size={18} />
              Clear All
            </Button>
          )}
        </div>
      </div>

      {currentFiles.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold">Files ({currentFiles.length})</h3>
          <div className="space-y-2">
            {currentFiles.map((file) => (
              <FileItem
                key={file.id}
                file={file}
                onRemove={removeFile}
                disabled={disabled}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// File Item Component
// ============================================================================

function FileItem({
  file,
  onRemove,
  disabled,
}: {
  file: FileWithProgress;
  onRemove: (id: string) => void;
  disabled: boolean;
}) {
  const Icon = getFileIcon(file.file.type);

  return (
    <div className="space-y-2 rounded-md bg-gray-700 p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Icon size={40} className="text-primary-500 flex-shrink-0" />
          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-medium truncate">{file.file.name}</span>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>{formatFileSize(file.file.size)}</span>
              <span>•</span>
              <span className="truncate">
                {file.file.type || "Unknown type"}
              </span>
            </div>
          </div>
        </div>
        {!disabled && (
          <button
            onClick={() => onRemove(file.id)}
            className="p-1 hover:bg-gray-600 rounded"
            aria-label="Remove file"
          >
            <X size={16} className="text-white hover:text-rose-500" />
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Utilities
// ============================================================================

const getFileIcon = (mimeType: string) => {
  if (mimeType.startsWith("image/")) return FileImage;
  if (mimeType.startsWith("video/")) return FileVideo;
  if (mimeType.startsWith("audio/")) return FileAudio;
  if (mimeType === "application/pdf" || mimeType.includes("text"))
    return FileText;
  return FileIcon;
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / k ** i).toFixed(1))} ${sizes[i]}`;
};

// ============================================================================
// Hook for Form Submission with Progress
// ============================================================================

type UploadProgress = {
  loaded: number;
  total: number;
  percentage: number;
};

type UseFormUploadOptions = {
  url: string;
  headers?: Record<string, string>;
  onProgress?: (progress: UploadProgress) => void;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
};

export function useFormUpload({
  url,
  headers,
  onProgress,
  onSuccess,
  onError,
}: UseFormUploadOptions) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<UploadProgress>({
    loaded: 0,
    total: 0,
    percentage: 0,
  });

  const uploadForm = async (formData: Record<string, any>) => {
    setUploading(true);
    setProgress({ loaded: 0, total: 0, percentage: 0 });

    const data = new FormData();

    // Append all form data
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // Handle file arrays
        if (value.length > 0 && value[0] instanceof File) {
          value.forEach((file) => data.append(key, file));
        } else {
          // Handle regular arrays
          value.forEach((item) => data.append(key, String(item)));
        }
      } else if (value instanceof File) {
        data.append(key, value);
      } else if (value !== null && value !== undefined) {
        data.append(key, String(value));
      }
    });

    const config: AxiosRequestConfig = {
      headers: { ...headers },
      onUploadProgress: (progressEvent) => {
        const loaded = progressEvent.loaded || 0;
        const total = progressEvent.total || 1;
        const percentage = Math.round((loaded * 100) / total);
        const progressData = { loaded, total, percentage };
        setProgress(progressData);
        onProgress?.(progressData);
      },
    };

    try {
      const response = await axios.post(url, data, config);
      onSuccess?.(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      const err = error as Error;
      onError?.(err);
      logError(error);
      return { success: false, error: err.message };
    } finally {
      setUploading(false);
    }
  };

  return { uploadForm, uploading, progress };
}
