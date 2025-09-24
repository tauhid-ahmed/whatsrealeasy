import { getIcon, dashboardStats } from "@/data/analyticsData";
import AnalyticsChart from "@/features/analytics/Charts";
import { cn } from "@/lib/utils";
import DashboardTable from "./_table";

interface TableSearchParams {
  page?: number;
  limit?: number;
  sort?: string;
  query?: string;
  status?: string | string[];
  role?: string | string[];
  earning_range?: string;
  [key: string]: string | string[] | undefined | number;
}

interface TableProps {
  searchParams: Promise<TableSearchParams>;
}

export default async function AdminAnalyticsPage({ searchParams }: TableProps) {
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
              <div className="">
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
        <AnalyticsChart />
      </div>
      <div className="mt-14">
        <DashboardTable searchParams={searchParams} />
      </div>
    </>
  );
}
