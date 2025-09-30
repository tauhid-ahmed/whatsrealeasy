import { getIcon, dashboardStats } from "@/data/analyticsData";
import { env } from "@/env";
import AnalyticsChart from "@/features/analytics/Charts";
import BookingTrendChart from "@/features/chart/components/CallChart";
import { getAccessToken } from "@/lib/getServerAuth";
import { safeAsync } from "@/lib/safeAsync";
import { cn } from "@/lib/utils";

// Main analytics data object
export interface AnalyticsData {
  analytics: {
    calls: {
      total: number;
      success: number;
      drop: number;
      waiting: number;
      successRate: number; // percentage
      callType: "incoming" | "outgoing"; // restrict to known values
    };
    appointments: {
      total: number;
      confirmed: number;
      upcoming: number;
      confirmationRate: number; // percentage
    };
    averageAppointmentTime: number; // in ms
  };
  monthlyTrends: MonthlyTrend[];
  chartConfig: {
    yAxis: {
      min: number;
      max: number;
      stepSize: number;
    };
  };
  filters: {
    timeRange: "all" | "day" | "week" | "month" | "year";
    callType: "incoming" | "outgoing";
  };
}

// Monthly trends (chart + services)
export interface MonthlyTrend {
  month:
    | "Jan"
    | "Feb"
    | "Mar"
    | "Apr"
    | "May"
    | "Jun"
    | "Jul"
    | "Aug"
    | "Sep"
    | "Oct"
    | "Nov"
    | "Dec";
  bookings: number;
  topServices: string[];
}

// Root API response - matches your actual API structure
export interface AnalyticsApiResponse {
  success: boolean;
  message: string;
  data: AnalyticsData;
}

// SafeAsync wrapper response
export interface SafeAsyncResponse {
  data: AnalyticsApiResponse | null;
  error: unknown | null;
}

export default async function AdminAnalyticsPage() {
  const token = await getAccessToken();
  const result = await safeAsync(async (): Promise<AnalyticsApiResponse> => {
    const response = await fetch(
      `${env.API_BASE_URL}/analytics?callType=incoming`,
      {
        headers: { Authorization: token || "" },
      }
    );
    if (!response.ok) return Promise.reject("Failed request");
    const data = await response.json();
    return data as AnalyticsApiResponse;
  });

  const data = (result.data?.success && result.data.data) as AnalyticsData;

  console.log(data.monthlyTrends);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardStats.map((stat, idx) => {
          const IconComponent = getIcon(stat.icon);
          return (
            <div
              key={idx}
              className={cn(
                `px-8 py-14 flex items-center gap-2 rounded-lg ${stat.cardBg}`
              )}
            >
              <div
                className={cn(
                  `size-16 rounded-full ${stat.iconBg} flex items-center justify-center`
                )}
              >
                <IconComponent className={cn("size-6", stat.iconColor)} />
              </div>
              <div>
                <h3 className={cn(`text-3xl font-bold ${stat.textColor1}`)}>
                  {stat.value}
                </h3>
                <p
                  className={cn(
                    `text-xl ${stat.textColor2} opacity-70 font-medium`
                  )}
                >
                  {stat.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-14">
        <BookingTrendChart data={data.monthlyTrends} />
      </div>
    </>
  );
}
