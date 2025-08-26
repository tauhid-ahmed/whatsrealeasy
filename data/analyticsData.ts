import {
  Phone,
  PhoneCall,
  Calendar,
  CalendarCheck,
  PhoneOff,
  Clock,
  CalendarPlus,
} from "lucide-react";

// Icon mapping object
export const iconMap = {
  phone: Phone,
  phoneCall: PhoneCall,
  calendar: Calendar,
  calendarCheck: CalendarCheck,
  phoneOff: PhoneOff,
  clock: Clock,
  calendarPlus: CalendarPlus,
  // Alternative naming conventions
  "phone-call": PhoneCall,
  "calendar-check": CalendarCheck,
  "phone-off": PhoneOff,
  "calendar-plus": CalendarPlus,
} as const;

type IconMapKey = keyof typeof iconMap;

export const getIcon = (iconName: string) => {
  return iconMap[iconName as IconMapKey] || Phone;
};

export const dashboardStats = [
  {
    title: "Total Call",
    value: "220",
    icon: "phone",
    iconColor: "text-[#8BD6FF]",
    iconBg: "bg-[#427DC9]",
    cardBg: "bg-white",
    textColor1: "text-black/75",
    textColor2: "text-black/75",
  },
  {
    title: "Total Success Call",
    value: "170",
    icon: "phoneCall",
    iconColor: "text-[#89FF8E]",
    iconBg: "bg-[#34A853]",
    cardBg: "bg-[#303030]",
    textColo1: "text-white",
    textColor2: "text-white/80",
  },
  {
    title: "Booking Success Ratio",
    value: "80%",
    icon: "calendarCheck",
    iconColor: "text-[#56FF6F]",
    iconBg: "bg-[#34A853]",
    cardBg: "bg-[#696D67]",
    textColor1: "text-white",
    textColor2: "text-white/80",
  },
  {
    title: "Total Drop Call",
    value: "30",
    icon: "phoneOff",
    iconColor: "text-white",
    iconBg: "bg-[#EE403766]",
    cardBg: "bg-[#536377]",
    textColor1: "text-white/90",
    textColor2: "text-white/80",
  },
  {
    title: "Total Waiting Call",
    value: "20",
    icon: "clock",
    iconColor: "text-[#F39C12]",
    iconBg: "bg-[#F39C124D]",
    cardBg: "bg-[#72685C]",
    textColor1: "text-white",
    textColor2: "text-white/70",
  },
  {
    title: "Total Appointments",
    value: "220",
    icon: "calendar",
    iconColor: "text-[#C8E0FF]",
    iconBg: "bg-[#82B8FF4D]",
    cardBg: "bg-[#397C8B]",
    textColor1: "text-white/90",
    textColor2: "text-white/70",
  },
  {
    title: "Total Success Meeting",
    value: "160",
    icon: "calendarCheck",
    iconColor: "text-[#56FF6F]",
    iconBg: "bg-[#34A853]",
    cardBg: "bg-[#696D67]",
    textColor1: "text-white/90",
    textColor2: "text-white/70",
  },
  {
    title: "Upcoming Appointments",
    value: "60",
    icon: "calendarPlus",
    iconColor: "text-[#2B9E93]",
    iconBg: "bg-[#083F394D]",
    cardBg: "bg-[#3C716C]",
    textColor1: "text-white",
    textColor2: "text-white/70",
  },
  {
    title: "Avg Appointment Time",
    value: "03:00 - 05:00",
    icon: "clock",
    iconColor: "text-[#1C1B1F]",
    iconBg: "bg-[#4E7B84]",
    cardBg: "bg-[#8DB0B7]",
    textColor1: "text-white/90",
    textColor2: "text-white/70",
  },
];
