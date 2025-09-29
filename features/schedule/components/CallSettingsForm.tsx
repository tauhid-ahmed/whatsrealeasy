"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import Selector from "@/components/Selector";
import { Slider } from "@/components/ui/slider";
import { useSchedule } from "@/features/schedule/context/ScheduleContext";

export default function ScheduleForm() {
  const { state, dispatch } = useSchedule();

  // Dispatch helpers
  const handleDurationChange = (val: number[]) => {
    dispatch({
      type: "SET_CALL_DURATION",
      payload: { type: "duration", value: val[0] },
    });
  };

  const handleGapChange = (val: number[]) => {
    dispatch({
      type: "SET_CALL_GAP",
      payload: { type: "duration", value: val[0] },
    });
  };

  const handleStartTimeChange = (time24: string) => {
    dispatch({
      type: "SET_CALL_START",
      payload: { type: "time", value: time24 },
    });
  };

  const handleEndTimeChange = (time24: string) => {
    dispatch({
      type: "SET_CALL_END",
      payload: { type: "time", value: time24 },
    });
  };

  return (
    <div className="flex flex-col gap-6 mt-6 text-white">
      {/* Start Time */}
      <div className="flex flex-col gap-2">
        <Label>Start Time:</Label>
        <CallTimePicker onChange={handleStartTimeChange} />
      </div>

      {/* End Time */}
      <div className="flex flex-col gap-2">
        <Label>End Time:</Label>
        <CallTimePicker onChange={handleEndTimeChange} />
      </div>

      {/* Call Duration */}
      <div className="flex flex-col gap-2">
        <Label>Call Duration (2.5m – 3m)</Label>
        <Slider
          min={150}
          max={180}
          step={5}
          value={[state.callDuration || 150]}
          onValueChange={handleDurationChange}
        />
        <span className="text-sm text-gray-400">
          {((state.callDuration || 150) / 60).toFixed(2)} min
        </span>
      </div>

      {/* Call Gap */}
      <div className="flex flex-col gap-2">
        <Label>Call Gap (5s – 15s)</Label>
        <Slider
          min={5}
          max={15}
          step={1}
          value={[state.callGap || 5]}
          onValueChange={handleGapChange}
        />
        <span className="text-sm text-gray-400">{state.callGap || 5} sec</span>
      </div>

      {/* Debug Info */}
      <div className="text-xs text-gray-500 mt-4">
        <p>Duration: {state.callDuration}s</p>
        <p>Gap: {state.callGap}s</p>
        <p>Start: {state.callStartTime}s</p>
        <p>End: {state.callEndTime}s</p>
        <p>Date: {state.callDate}s</p>
      </div>
    </div>
  );
}

// ---- Time Picker Component ----

const to24HourFormat = (hour: string, minute: string, ampm: string) => {
  let h = parseInt(hour, 10);
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${minute}`;
};

function CallTimePicker({ onChange }: { onChange?: (time24: string) => void }) {
  const [hour, setHour] = React.useState("12");
  const [minute, setMinute] = React.useState("00");
  const [ampm, setAmPm] = React.useState("AM");

  const handleHour = (val: string | ((prevState: string) => string)) => {
    const newHour = typeof val === "function" ? val(hour) : val;
    setHour(newHour);
    onChange?.(to24HourFormat(newHour, minute, ampm));
  };

  const handleMinute = (val: string | ((prevState: string) => string)) => {
    const newMinute = typeof val === "function" ? val(minute) : val;
    setMinute(newMinute);
    onChange?.(to24HourFormat(hour, newMinute, ampm));
  };

  const handleAmPm = (val: string | ((prevState: string) => string)) => {
    const newAmPm = typeof val === "function" ? val(ampm) : val;
    setAmPm(newAmPm);
    onChange?.(to24HourFormat(hour, minute, newAmPm));
  };

  return (
    <div className="flex items-center">
      <Selector
        className="flex-1"
        options={Array.from({ length: 12 }, (_, i) => String(i + 1))}
        value={hour}
        setValue={handleHour}
      />
      <span className="text-2xl mx-1">:</span>
      <Selector
        className="flex-1"
        options={Array.from({ length: 60 }, (_, i) =>
          String(i).padStart(2, "0")
        )}
        value={minute}
        setValue={handleMinute}
      />
      <Selector
        className="flex-1 ml-2"
        options={["AM", "PM"]}
        value={ampm}
        setValue={handleAmPm}
      />
    </div>
  );
}
