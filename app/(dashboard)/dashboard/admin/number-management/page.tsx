import FileUpload from "@/components/FileUpload";
import { LucideCloudUpload } from "lucide-react";

export default function NumberManagementPage() {
  return (
    <>
      <div className="bg-dark2 rounded-2xl p-6">
        <div className="flex gap-2 items-center border-b border-gray-700 mb-6 pb-6">
          <LucideCloudUpload size={32} />
          <div className="">
            <h2 className="text-sm">Upload Phone Numbers files</h2>
            <h3 className="text-xs">
              Select and upload the files of your choice
            </h3>
          </div>
        </div>
        <FileUpload />
      </div>
      <div className="bg-dark2 rounded-2xl p-6 mt-10">
        <div className="flex gap-2 items-center border-b border-gray-700 mb-6 pb-6">
          <LucideCloudUpload size={32} />
          <div className="">
            <h2 className="text-sm">AI Guide Document</h2>
            <h3 className="text-xs">
              Select and upload the files of your choice
            </h3>
          </div>
        </div>
        <FileUpload />
      </div>
    </>
  );
}
