import Button from "@/components/Button";
import FileUpload from "@/components/FileUpload";
import { Input } from "@/components/ui/input";
import Calendar from "@/features/schedule/components/CalendarSchedule";
import { LucideCloudUpload } from "lucide-react";

export default function NumberManagementPage() {
  return (
    <>
      <div className="bg-dark2 rounded-2xl p-6">
        <div className="flex items-center justify-between gap-4  border-b border-gray-700 mb-6 pb-6">
          <div className="flex gap-2 items-center">
            <LucideCloudUpload size={32} />
            <div className="">
              <h2 className="text-sm">Upload Phone Numbers files</h2>
              <h3 className="text-xs">
                Select and upload the files of your choice
              </h3>
            </div>
          </div>
          <Calendar />
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
      <div className="bg-dark2 rounded-2xl p-6 mt-10">
        <div className="w-fit mx-auto">
          <span className="text-lg mb-2">Write a single number</span>
          <Input className="w-72" placeholder="(270) 555-0117" />
          <Button className="mt-4 w-full" size="sm">
            Call Now
          </Button>
        </div>
      </div>
    </>
  );
}
