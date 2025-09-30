"use client";

import { useEffect } from "react";
import { useSchedule } from "../context/ScheduleContext";
import axios from "axios";
import { toast } from "sonner";
import { env } from "@/env";

export default function callEndWatcher() {
  const { state } = useSchedule();

  useEffect(() => {
    if (!state.callEndTime || state.callEndTime <= 0) return;

    const interval = setInterval(() => {
      const nowInSeconds = Math.floor(Date.now() / 1000);

      // ✅ Trigger API when current time equals callEndTime
      if (nowInSeconds === state.callEndTime) {
        axios
          .post(
            `${env.NEXT_PUBLIC_API_BASE_URL_AI_OUTBOUND}/outbound/cancell-batch-call`
          )
          .then(() => {
            toast.success("All calls has been ended.");
          })
          .catch((err) => {
            console.error(err);
            toast.error("Failed to trigger API on call end.");
          });
      }
    }, 500); // check every 0.5 seconds for accuracy

    return () => clearInterval(interval); // cleanup
  }, [state.callEndTime]);

  return null;
}
