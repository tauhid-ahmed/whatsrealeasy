"use client";

import axios from "axios";
import {
  FileAudio,
  FileIcon,
  FileImage,
  FileText,
  FileVideo,
  LucideCloudUpload,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { ChangeEvent, DragEvent, useRef, useState } from "react";
import Button from "./Button";

type FileWithProgress = {
  id: string;
  file: File;
  progress: number;
  uploaded: boolean;
};

export default function FileUpload() {
  const [files, setFiles] = useState<FileWithProgress[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Calculate overall progress
  // const overallProgress =
  //   files.length > 0
  //     ? files.reduce((acc, file) => acc + file.progress, 0) / files.length
  //     : 0;

  function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) {
      return;
    }

    const newFiles = Array.from(e.target.files).map((file) => ({
      file,
      progress: 0,
      uploaded: false,
      id: file.name,
    }));

    setFiles([...files, ...newFiles]);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function handleFileDrop(fileList: FileList) {
    const newFiles = Array.from(fileList).map((file) => ({
      file,
      progress: 0,
      uploaded: false,
      id: file.name,
    }));

    setFiles([...files, ...newFiles]);
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileDrop(droppedFiles);
    }
  }

  async function handleUpload() {
    if (files.length === 0 || uploading) {
      return;
    }

    setUploading(true);

    const uploadPromises = files.map(async (fileWithProgress) => {
      const formData = new FormData();
      formData.append("file", fileWithProgress.file);

      try {
        await axios.post("https://httpbin.org/post", formData, {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setFiles((prevFiles) =>
              prevFiles.map((file) =>
                file.id === fileWithProgress.id ? { ...file, progress } : file
              )
            );
          },
        });

        setFiles((prevFiles) =>
          prevFiles.map((file) =>
            file.id === fileWithProgress.id ? { ...file, uploaded: true } : file
          )
        );
      } catch (error) {
        console.error(error);
      }
    });

    await Promise.all(uploadPromises);

    setUploading(false);
  }

  function removeFile(id: string) {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  }

  function handleClear() {
    setFiles([]);
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`bg-dark2 border-2 border-dashed border-gray-700 rounded-lg p-8 text-center transition-colors ${
          isDragOver
            ? "border-primary-500 bg-primary-500/10"
            : "border-grayscale-600 hover:border-grayscale-500"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <LucideCloudUpload
          className={`mx-auto mb-4 ${
            isDragOver ? "text-primary-500" : "text-grayscale-400"
          }`}
          size={48}
        />
        <div className="mb-4">
          <p className="text-lg font-medium mb-2">
            {isDragOver ? "Drop files here" : "Drag and drop files here"}
          </p>
          <p className="text-grayscale-400 text-sm">or</p>
        </div>
        <div className="flex gap-2 justify-center">
          <FileInput
            inputRef={inputRef}
            disabled={uploading}
            onFileSelect={handleFileSelect}
          />
          <ActionButtons
            disabled={files.length === 0 || uploading}
            onUpload={handleUpload}
            onClear={handleClear}
          />
        </div>
      </div>

      <FileList files={files} onRemove={removeFile} uploading={uploading} />
    </div>
  );
}

type FileInputProps = {
  inputRef: React.RefObject<HTMLInputElement | null>;
  disabled: boolean;
  onFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
};

function FileInput({ inputRef, disabled, onFileSelect }: FileInputProps) {
  return (
    <>
      <input
        type="file"
        ref={inputRef}
        onChange={onFileSelect}
        multiple
        className="hidden"
        id="file-upload"
        disabled={disabled}
      />
      <label htmlFor="file-upload">
        <Button type="button" onClick={() => inputRef.current?.click()}>
          <Plus size={18} />
          Select Files
        </Button>
      </label>
    </>
  );
}

type ActionButtonsProps = {
  disabled: boolean;
  onUpload: () => void;
  onClear: () => void;
};

function ActionButtons({ onUpload, onClear, disabled }: ActionButtonsProps) {
  return (
    <>
      <Button
        onClick={onUpload}
        disabled={disabled}
        className="flex items-center gap-2"
      >
        <Upload size={18} />
        Upload
      </Button>
      <Button
        onClick={onClear}
        className="flex items-center gap-2"
        disabled={disabled}
      >
        <Trash2 size={18} />
        Clear All
      </Button>
    </>
  );
}

type FileListProps = {
  files: FileWithProgress[];
  onRemove: (id: string) => void;
  uploading: boolean;
};

function FileList({ files, onRemove, uploading }: FileListProps) {
  if (files.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Files:</h3>
      <div className="space-y-2">
        {files.map((file) => (
          <FileItem
            key={file.id}
            file={file}
            onRemove={onRemove}
            uploading={uploading}
          />
        ))}
      </div>
    </div>
  );
}

type FileItemProps = {
  file: FileWithProgress;
  onRemove: (id: string) => void;
  uploading: boolean;
};

function FileItem({ file, onRemove, uploading }: FileItemProps) {
  const Icon = getFileIcon(file.file.type);

  return (
    <div className="space-y-2 rounded-md bg-grayscale-700 p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Icon size={40} className="text-primary-500" />
          <div className="flex flex-col">
            <span className="font-medium">{file.file.name}</span>
            <div className="flex items-center gap-2 text-xs text-grayscale-400">
              <span>{formatFileSize(file.file.size)}</span>
              <span>•</span>
              <span>{file.file.type || "Unknown type"}</span>
            </div>
          </div>
        </div>
        {!uploading && (
          <button
            onClick={() => onRemove(file.id)}
            className="bg-none p-0 cursor-pointer"
          >
            <X size={16} className="text-white hover:text-rose-500" />
          </button>
        )}
      </div>
      <div className="text-right text-xs">
        {file.uploaded ? "Completed" : `${Math.round(file.progress)}%`}
      </div>
      <ProgressBar progress={file.progress} />
    </div>
  );
}

type ProgressBarProps = {
  progress: number;
};

function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-600">
      <div
        className="h-full bg-blue-500 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

const getFileIcon = (mimeType: string) => {
  if (mimeType.startsWith("image/")) return FileImage;
  if (mimeType.startsWith("video/")) return FileVideo;
  if (mimeType.startsWith("audio/")) return FileAudio;
  if (mimeType === "application/pdf") return FileText;
  return FileIcon;
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};
