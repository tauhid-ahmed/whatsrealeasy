"use client";

import { useState, FormEvent } from "react";
import FileUpload, { useFormUpload } from "@/components/FileUpload";

export default function MyForm() {
  return (
    <FileUpload
      uploadUrl="http://httpbin.org/post"
      onUploadSuccess={(data) => console.log("Uploaded!", data)}
    />
  );
}
