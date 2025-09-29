"use client";

import { useState, FormEvent } from "react";
import FileUpload, { useFormUpload } from "@/components/FileUpload";

export default function MyForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "documents",
    files: [] as File[],
  });

  const { uploadForm, uploading, progress } = useFormUpload({
    url: "https://httpbin.org/post",
    headers: { Authorization: "Bearer token" },
    onProgress: (progress) => {
      console.log(`Uploading: ${progress.percentage}%`);
    },
    onSuccess: (data) => {
      console.log("Success!", data);
      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "documents",
        files: [],
      });
    },
    onError: (error) => {
      alert(`Upload failed: ${error.message}`);
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await uploadForm(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>

      <div>
        <label>Category</label>
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        >
          <option value="documents">Documents</option>
          <option value="images">Images</option>
          <option value="videos">Videos</option>
        </select>
      </div>

      <FileUpload
        value={formData.files}
        onFilesChange={(files) => setFormData({ ...formData, files })}
        accept="image/*,video/*"
        maxFileSize={10 * 1024 * 1024} // 10MB
        maxFiles={5}
        disabled={uploading}
      />

      {uploading && (
        <div className="space-y-2">
          <div className="text-sm">Uploading: {progress.percentage}%</div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>
      )}

      <button type="submit" disabled={uploading || formData.files.length === 0}>
        {uploading ? "Uploading..." : "Submit"}
      </button>
    </form>
  );
}
