"use client";

import { cn } from "@/lib/utils";
import {
  Phone,
  PhoneCall,
  Calendar,
  CalendarCheck,
  PhoneOff,
  Clock,
  CalendarPlus,
} from "lucide-react";

export const iconMap = {
  phone: Phone,
  phoneCall: PhoneCall,
  calendar: Calendar,
  calendarCheck: CalendarCheck,
  phoneOff: PhoneOff,
  clock: Clock,
  calendarPlus: CalendarPlus,
  "phone-call": PhoneCall,
  "calendar-check": CalendarCheck,
  "phone-off": PhoneOff,
  "calendar-plus": CalendarPlus,
} as const;

type IconMapKey = keyof typeof iconMap;
export const getIcon = (iconName: string) =>
  iconMap[iconName as IconMapKey] || Phone;

// Types for server response
type ServerResponse = {
  calls: {
    total: number;
    success: number;
    drop: number;
    waiting: number;
    successRate: number;
    callType: string;
  };
  appointments: {
    total: number;
    confirmed: number;
    upcoming: number;
    confirmationRate: number;
  };
  averageAppointmentTime: number;
};

interface StatsProps {
  data: ServerResponse;
}

export default function Stats({ data }: StatsProps) {
  const dashboardStats = [
    {
      title: "Total Call",
      value: String(data.calls.total),
      icon: "phone",
      iconColor: "text-[#8BD6FF]",
      iconBg: "bg-[#427DC9]",
      cardBg: "bg-white",
      textColor1: "text-black/75",
      textColor2: "text-black/75",
    },
    {
      title: "Total Success Call",
      value: String(data.calls.success),
      icon: "phoneCall",
      iconColor: "text-[#89FF8E]",
      iconBg: "bg-[#34A853]",
      cardBg: "bg-[#303030]",
      textColor1: "text-white",
      textColor2: "text-white/80",
    },
    {
      title: "Booking Success Ratio",
      value: `${data.calls.successRate}%`,
      icon: "calendarCheck",
      iconColor: "text-[#56FF6F]",
      iconBg: "bg-[#34A853]",
      cardBg: "bg-[#696D67]",
      textColor1: "text-white",
      textColor2: "text-white/80",
    },
    {
      title: "Total Drop Call",
      value: String(data.calls.drop),
      icon: "phoneOff",
      iconColor: "text-white",
      iconBg: "bg-[#EE403766]",
      cardBg: "bg-[#536377]",
      textColor1: "text-white/90",
      textColor2: "text-white/80",
    },
    {
      title: "Total Waiting Call",
      value: String(data.calls.waiting),
      icon: "clock",
      iconColor: "text-[#F39C12]",
      iconBg: "bg-[#F39C124D]",
      cardBg: "bg-[#72685C]",
      textColor1: "text-white",
      textColor2: "text-white/70",
    },
    {
      title: "Total Appointments",
      value: String(data.appointments.total),
      icon: "calendar",
      iconColor: "text-[#C8E0FF]",
      iconBg: "bg-[#82B8FF4D]",
      cardBg: "bg-[#397C8B]",
      textColor1: "text-white/90",
      textColor2: "text-white/70",
    },
    {
      title: "Total Success Meeting",
      value: String(data.appointments.confirmed),
      icon: "calendarCheck",
      iconColor: "text-[#56FF6F]",
      iconBg: "bg-[#34A853]",
      cardBg: "bg-[#696D67]",
      textColor1: "text-white/90",
      textColor2: "text-white/70",
    },
    {
      title: "Upcoming Appointments",
      value: String(data.appointments.upcoming),
      icon: "calendarPlus",
      iconColor: "text-[#2B9E93]",
      iconBg: "bg-[#083F394D]",
      cardBg: "bg-[#3C716C]",
      textColor1: "text-white",
      textColor2: "text-white/70",
    },
    {
      title: "Avg Appointment Time",
      value: data.averageAppointmentTime
        ? `${data.averageAppointmentTime} min`
        : "N/A",
      icon: "clock",
      iconColor: "text-[#1C1B1F]",
      iconBg: "bg-[#4E7B84]",
      cardBg: "bg-[#8DB0B7]",
      textColor1: "text-white/90",
      textColor2: "text-white/70",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dashboardStats.map((stat, idx) => {
        const IconComponent = getIcon(stat.icon);
        return (
          <div
            key={idx}
            className={cn(
              `flex flex-col sm:flex-row items-center sm:items-start gap-4
     rounded-lg ${stat.cardBg} 
     px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-14`
            )}
          >
            {/* Icon */}
            <div
              className={cn(
                `size-12 sm:size-14 lg:size-16 shrink-0 rounded-full 
       ${stat.iconBg} flex items-center justify-center`
              )}
            >
              <IconComponent
                className={cn("size-6 sm:size-7 lg:size-8", stat.iconColor)}
              />
            </div>

            {/* Content */}
            <div className="text-center sm:text-left">
              <h3
                className={cn(
                  `text-xl sm:text-2xl lg:text-3xl font-bold ${stat.textColor1}`
                )}
              >
                {stat.value}
              </h3>
              <p
                className={cn(
                  `text-sm sm:text-base lg:text-xl ${stat.textColor2} opacity-70 font-medium`
                )}
              >
                {stat.title}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
