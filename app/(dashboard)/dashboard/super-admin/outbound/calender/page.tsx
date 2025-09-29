/* eslint-disable @typescript-eslint/no-explicit-any */
// import { env } from "@/env";

// export default function AdminCalendarPage() {
//   return (
//     <div className="flex justify-center items-center p-6 bg-white">
//       <iframe
//         src={`https://calendar.google.com/calendar/embed?src=${env.NEXT_PUBLIC_OUTBOUND_EMAIL}`}
//         style={{
//           border: "0",
//           backgroundColor: "transparent",
//         }}
//         width="100%"
//         height="100%"
//         className="h-[calc(100vh-155px)] bg-dark3"
//       ></iframe>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { env } from "@/env";

export default function AdminCalendarPage() {
  const [response, setResponse] = useState<any>(null);

  const handleClick = async () => {
    try {
      const res = await fetch("/api/auth/initiate");
      const data = await res.json();

      console.log("Response from /api/auth/initiate:", data);
      if (data.url) {
        // ✅ Directly redirect user to Google
        window.location.href = data.url;
      } else {
        alert("No Google URL found");
      }
    } catch (error) {
      console.error("Error calling initiate:", error);
    } finally {
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-6 bg-white gap-4 w-full">
      {/* ✅ Button to initiate auth */}
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Authenticate with Google
      </button>

      {/* ✅ Display API response for debugging */}
      {response && (
        <pre className="p-4 bg-gray-100 text-sm rounded-lg w-full overflow-auto">
          {JSON.stringify(response, null, 2)}
        </pre>
      )}

      {/* ✅ Google Calendar iframe */}
      <iframe
        src={`https://calendar.google.com/calendar/embed?src=${env.NEXT_PUBLIC_OUTBOUND_EMAIL}`}
        style={{
          border: "0",
          backgroundColor: "transparent",
        }}
        width="100%"
        height="100%"
        className="h-[calc(100vh-155px)] bg-dark3"
      ></iframe>
    </div>
  );
}
