"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type Time = {
  hour: string;
  minute: string;
  meridiem: "AM" | "PM";
};

type DurationGap = {
  min: string;
  sec: string;
};

export default function ScheduleForm({
  onSubmit,
}: {
  onSubmit: (
    startTime: Time,
    endTime: Time,
    duration: DurationGap,
    gap: DurationGap
  ) => void;
}) {
  const [startTime, setStartTime] = React.useState<Time>({
    hour: "09",
    minute: "00",
    meridiem: "AM",
  });
  const [endTime, setEndTime] = React.useState<Time>({
    hour: "10",
    minute: "00",
    meridiem: "AM",
  });
  const [duration, setDuration] = React.useState<DurationGap>({
    min: "0",
    sec: "30",
  });
  const [gap, setGap] = React.useState<DurationGap>({ min: "0", sec: "10" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(startTime, endTime, duration, gap);
  }

  function TimeInput({
    label,
    value,
    setValue,
  }: {
    label: string;
    value: Time;
    setValue: React.Dispatch<React.SetStateAction<Time>>;
  }) {
    return (
      <div>
        <Label className="mb-2 block">{label}</Label>
        <div className="flex gap-2">
          <Input
            type="number"
            min={1}
            max={12}
            value={value.hour}
            onChange={(e) =>
              setValue((t) => ({ ...t, hour: e.target.value.padStart(2, "0") }))
            }
            className="w-16 text-center"
          />
          <span className="flex items-center">:</span>
          <Input
            type="number"
            min={0}
            max={59}
            value={value.minute}
            onChange={(e) =>
              setValue((t) => ({
                ...t,
                minute: e.target.value.padStart(2, "0"),
              }))
            }
            className="w-16 text-center"
          />
          <Select
            value={value.meridiem}
            onValueChange={(val: "AM" | "PM") =>
              setValue((t) => ({ ...t, meridiem: val }))
            }
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AM">AM</SelectItem>
              <SelectItem value="PM">PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }

  function DurationGapInput({
    label,
    value,
    setValue,
  }: {
    label: string;
    value: DurationGap;
    setValue: React.Dispatch<React.SetStateAction<DurationGap>>;
  }) {
    return (
      <div>
        <Label className="mb-2 block">{label}</Label>
        <div className="flex gap-2">
          <Input
            type="number"
            min={0}
            value={value.min}
            onChange={(e) => setValue((t) => ({ ...t, min: e.target.value }))}
            placeholder="min"
            className="w-20 text-center"
          />
          <span className="flex items-center">:</span>
          <Input
            type="number"
            min={0}
            max={59}
            value={value.sec}
            onChange={(e) => setValue((t) => ({ ...t, sec: e.target.value }))}
            placeholder="sec"
            className="w-20 text-center"
          />
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 p-6 bg-dark2 text-white rounded-2xl shadow-md max-w-md mx-auto"
    >
      <TimeInput label="Start Time" value={startTime} setValue={setStartTime} />
      <TimeInput label="End Time" value={endTime} setValue={setEndTime} />
      <DurationGapInput
        label="Call Duration"
        value={duration}
        setValue={setDuration}
      />
      <DurationGapInput label="Call Gap" value={gap} setValue={setGap} />
      <Button type="submit" className="w-full mt-2">
        Save Schedule
      </Button>
    </form>
  );
}
