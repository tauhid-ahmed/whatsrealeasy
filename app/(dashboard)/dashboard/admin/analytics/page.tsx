import { getIcon, dashboardStats } from "@/data/analyticsData";
import AnalyticsChart from "@/features/analytics/Charts";
import { cn } from "@/lib/utils";

export default function AdminAnalyticsPage() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {dashboardStats.map((stat, idx) => {
          const IconComponent = getIcon(stat.icon);
          return (
            <div
              key={idx}
              className={cn(
                `px-8 py-8 flex items-center gap-2 rounded-lg ${stat.cardBg}`
              )}
            >
              <div
                className={cn(
                  `size-12 rounded-full ${stat.bgColor} flex items-center justify-center`
                )}
              >
                <IconComponent className="size-8 text-white" />
              </div>
              <div className="">
                <h3 className={cn(`text-2xl font-bold ${stat.color}`)}>
                  {stat.value}
                </h3>
                <p className={cn(`text-sm ${stat.color} opacity-70`)}>
                  {stat.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-14">
        <AnalyticsChart />
      </div>
    </>
  );
}
