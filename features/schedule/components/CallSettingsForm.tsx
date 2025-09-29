"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import Selector from "@/components/Selector";
import { Slider } from "@/components/ui/slider";
import { useSchedule } from "@/features/schedule/context/ScheduleContext";

const MIN_CALL_DURATION = 2.5;
const MAX_CALL_DURATION = 10;
const MIN_CALL_GAP = 5;
const MAX_CALL_GAP = 60;

export default function ScheduleForm() {
  const { state, dispatch } = useSchedule();

  console.log(state);

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
        <CallTimePicker
          initialSeconds={state.callStartTime}
          onChange={handleStartTimeChange}
        />
      </div>

      {/* End Time */}
      <div className="flex flex-col gap-2">
        <Label>End Time:</Label>
        <CallTimePicker
          initialSeconds={state.callEndTime}
          onChange={handleEndTimeChange}
        />
      </div>

      {/* Call Duration */}
      <div className="flex flex-col gap-2">
        <Label>
          Call Duration ({MIN_CALL_DURATION}m – {MAX_CALL_DURATION}m)
        </Label>
        <Slider
          min={MIN_CALL_DURATION * 60}
          max={MAX_CALL_DURATION * 60}
          step={100}
          value={[state.callDuration]}
          onValueChange={handleDurationChange}
        />
        <span className="text-sm text-gray-400">
          {((state.callDuration || MIN_CALL_DURATION * 60) / 60).toFixed(0)} min
          – {(state.callDuration || MIN_CALL_DURATION * 60).toFixed(0)} sec
        </span>
      </div>

      {/* Call Gap */}
      <div className="flex flex-col gap-2">
        <Label>
          Call Gap ({MIN_CALL_GAP}s – {MAX_CALL_GAP}s)
        </Label>
        <Slider
          min={5}
          max={15}
          step={1}
          value={[state.callGap || 5]}
          onValueChange={handleGapChange}
        />
        <span className="text-sm text-gray-400">{state.callGap || 5} sec</span>
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

function CallTimePicker({
  onChange,
  initialSeconds, // 👈 pass unix seconds here
}: {
  onChange?: (time24: string) => void;
  initialSeconds?: number;
}) {
  // --- derive initial values ---
  const initialDate = initialSeconds
    ? new Date(initialSeconds * 1000)
    : new Date();

  let h = initialDate.getHours();
  const m = String(initialDate.getMinutes()).padStart(2, "0");
  const ampmInitial = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12; // convert to 12h format
  const hStr = String(h);

  // --- state ---
  const [hour, setHour] = React.useState(hStr);
  const [minute, setMinute] = React.useState(m);
  const [ampm, setAmPm] = React.useState(ampmInitial);

  React.useEffect(() => {
    // trigger onChange once on mount
    onChange?.(to24HourFormat(hStr, m, ampmInitial));
  }, []);

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
