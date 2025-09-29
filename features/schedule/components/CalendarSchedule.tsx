"use client";

import { PopoverWrapper } from "@/components/Popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { LucideAlarmClock } from "lucide-react";
import { useState } from "react";
import CallSettingsForm from "./CallSettingsForm";

export default function CalendarSchedule() {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <PopoverWrapper
      trigger={
        <Button>
          <LucideAlarmClock /> Schedule
        </Button>
      }
      side="bottom"
      align="end"
      className="w-84"
    >
      <Calendar mode="single" selected={date} onSelect={setDate} />
      <CallSettingsForm />
    </PopoverWrapper>
  );
}
