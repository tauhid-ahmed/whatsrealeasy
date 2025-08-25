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
    id: 1,
    title: "Total Call",
    value: "220",
    icon: "phone",
    color: "blue",
    bgColor: "bg-blue-500",
    cardBg: "bg-gray-950",
  },
  {
    id: 2,
    title: "Total Success Call",
    value: "170",
    icon: "phoneCall",
    color: "green",
    bgColor: "bg-green-500",
    cardBg: "bg-gray-800",
  },
  {
    id: 3,
    title: "Booking Success Ratio",
    value: "80%",
    icon: "calendarCheck",
    color: "green",
    bgColor: "bg-green-500",
    cardBg: "bg-gray-700",
  },
  {
    id: 4,
    title: "Total Drop Call",
    value: "30",
    icon: "phoneOff",
    color: "red",
    bgColor: "bg-red-500",
    cardBg: "bg-gray-700",
  },
  {
    id: 5,
    title: "Total Waiting Call",
    value: "20",
    icon: "clock",
    color: "orange",
    bgColor: "bg-orange-500",
    cardBg: "bg-gray-800",
  },
  {
    id: 6,
    title: "Total Appointments",
    value: "220",
    icon: "calendar",
    color: "blue",
    bgColor: "bg-blue-500",
    cardBg: "bg-blue-600",
  },
  {
    id: 7,
    title: "Total Success Meeting",
    value: "160",
    icon: "calendarCheck",
    color: "green",
    bgColor: "bg-green-500",
    cardBg: "bg-gray-700",
  },
  {
    id: 8,
    title: "Upcoming Appointments",
    value: "60",
    icon: "calendarPlus",
    color: "teal",
    bgColor: "bg-teal-500",
    cardBg: "bg-teal-600",
  },
  {
    id: 9,
    title: "Avg Appointment Time",
    value: "03:00 - 05:00",
    icon: "clock",
    color: "gray",
    bgColor: "bg-gray-500",
    cardBg: "bg-gray-600",
  },
];

export const statsGrid = {
  topRow: [
    {
      title: "Total Call",
      value: "220",
      icon: "phone",
      iconColor: "text-white",
      iconBg: "bg-blue-500",
      cardBg: "bg-gray-950",
      textColor: "text-gray-800",
    },
    {
      title: "Total Success Call",
      value: "170",
      icon: "phoneCall",
      iconColor: "text-white",
      iconBg: "bg-green-500",
      cardBg: "bg-gray-800",
      textColor: "text-white",
    },
    {
      title: "Booking Success Ratio",
      value: "80%",
      icon: "calendarCheck",
      iconColor: "text-white",
      iconBg: "bg-green-500",
      cardBg: "bg-gray-700",
      textColor: "text-white",
    },
  ],
  middleRow: [
    {
      title: "Total Drop Call",
      value: "30",
      icon: "phoneOff",
      iconColor: "text-white",
      iconBg: "bg-red-500",
      cardBg: "bg-gray-700",
      textColor: "text-white",
    },
    {
      title: "Total Waiting Call",
      value: "20",
      icon: "clock",
      iconColor: "text-white",
      iconBg: "bg-orange-500",
      cardBg: "bg-gray-800",
      textColor: "text-white",
    },
    {
      title: "Total Appointments",
      value: "220",
      icon: "calendar",
      iconColor: "text-white",
      iconBg: "bg-blue-500",
      cardBg: "bg-blue-600",
      textColor: "text-white",
    },
  ],
  bottomRow: [
    {
      title: "Total Success Meeting",
      value: "160",
      icon: "calendarCheck",
      iconColor: "text-white",
      iconBg: "bg-green-500",
      cardBg: "bg-gray-700",
      textColor: "text-white",
    },
    {
      title: "Upcoming Appointments",
      value: "60",
      icon: "calendarPlus",
      iconColor: "text-white",
      iconBg: "bg-teal-500",
      cardBg: "bg-teal-600",
      textColor: "text-white",
    },
    {
      title: "Avg Appointment Time",
      value: "03:00 - 05:00",
      icon: "clock",
      iconColor: "text-white",
      iconBg: "bg-gray-500",
      cardBg: "bg-gray-600",
      textColor: "text-white",
    },
  ],
};

// Example usage in a component:
/*
import { dashboardStats, getIcon } from './dashboard-data';

function StatsCard({ stat }) {
  const IconComponent = getIcon(stat.icon);
  
  return (
    <div className={`p-4 rounded-lg ${stat.cardBg}`}>
      <div className={`w-10 h-10 rounded-full ${stat.bgColor} flex items-center justify-center mb-3`}>
        <IconComponent className="w-5 h-5 text-white" />
      </div>
      <h3 className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</h3>
      <p className={`text-sm ${stat.textColor} opacity-70`}>{stat.title}</p>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {dashboardStats.map((stat) => (
        <StatsCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}

// Alternative usage with direct mapping:
function StatsCardAlt({ stat }) {
  const IconComponent = iconMap[stat.icon];
  
  return (
    <div className={`p-4 rounded-lg ${stat.cardBg}`}>
      <IconComponent className="w-6 h-6" />
      <span>{stat.value}</span>
    </div>
  );
}
*/
