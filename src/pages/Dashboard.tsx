import DashboardStats from "@/components/features/dashboard/DashboardStats";
import TodayActivity from "@/components/features/dashboard/TodayActivity";
import Spinner from "@/components/my-ui/Spinner";
import useCabins from "@/hooks/cabin-hooks/useCabins";
import useRecentBookings from "@/hooks/dasgboard-hooks/useRecentBookings";
import useRecentStays from "@/hooks/dasgboard-hooks/useRecentStays";
import useTodayActivities from "@/hooks/dasgboard-hooks/useTodayActivities";
import { subDays } from "date-fns";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import { DurationChart } from "@/components/features/dashboard/DurationChart";
import { SalesChart } from "@/components/features/dashboard/SalesChart";

const filters = [
  { label: "Last 7 days", value: "7" },
  { label: "Last 30 days", value: "30" },
  { label: "Last 90 days", value: "90" },
];

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeParam = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;
  const queryDate = subDays(new Date(), activeParam).toISOString();

  const {
    data: recentBookings,
    isLoading: isLoadingRecentBookings,
    isSuccess: isRecentBookingsSuccess,
    isError: isRecentBookingsError,
    error: recentBookingsError,
  } = useRecentBookings(activeParam, queryDate);

  const {
    data: recentStays,
    isLoading: isLoadingRecentStays,
    isSuccess: isRecentStaysSuccess,
    isError: isRecentStaysError,
    error: recentStaysError,
  } = useRecentStays(activeParam, queryDate);

  const {
    cabins,
    isLoading: isLoadingCabins,
    isSuccess: isCabinsSuccess,
    isError: isCabinsError,
    error: cabinsError,
  } = useCabins();

  const {
    data: todayActivities,
    isLoading: isLoadingTodayActivities,
    isSuccess: isTodayActivitiesSuccess,
    isError: isTodayActivitiesError,
    error: todayActivitiesError,
  } = useTodayActivities();

  const isLoading =
    isLoadingCabins ||
    isLoadingRecentBookings ||
    isLoadingRecentStays ||
    isLoadingTodayActivities;

  const hasError =
    isRecentBookingsError ||
    isRecentStaysError ||
    isCabinsError ||
    isTodayActivitiesError;

  const isAllDataLoaded =
    isRecentBookingsSuccess &&
    isRecentStaysSuccess &&
    isCabinsSuccess &&
    isTodayActivitiesSuccess;

  const errorMessage =
    recentBookingsError?.message ||
    recentStaysError?.message ||
    cabinsError?.message ||
    todayActivitiesError?.message ||
    "An error occurred while loading dashboard data";

  function handleFilterChange(value: string) {
    searchParams.set("last", value);
    setSearchParams(searchParams);
  }

  return (
    <>
      <div className="flex justify-between ">
        <h1 className="font-bold text-3xl text-zinc-800 tracking-tight mb-6 dark:text-gray-100 ">
          Dashboard
        </h1>
        <div>
          <Tabs defaultValue={String(activeParam)}>
            <TabsList>
              {filters.map((filter) => (
                <TabsTrigger
                  value={filter.value}
                  key={filter.value}
                  className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white cursor-pointer"
                  onClick={() => handleFilterChange(filter.value)}
                >
                  {filter.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
      {isLoading && <Spinner />}
      {hasError && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
          <p className="font-semibold">Error loading dashboard data</p>
          <p className="text-sm mt-1">{errorMessage}</p>
        </div>
      )}
      {isAllDataLoaded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
          <DashboardStats
            recentBookings={recentBookings}
            recentStays={recentStays}
            cabins={cabins}
            daysCount={activeParam}
          />
          <div className="min-h-[330px] shadow-lg rounded-md col-span-1 md:col-span-2 ">
            <TodayActivity todayActivities={todayActivities} />
          </div>
          <div className="min-h-[330px] shadow-lg rounded-md col-span-1 md:col-span-2">
            <DurationChart recentStays={recentStays} />
          </div>
          <div className="shadow-lg rounded-md col-span-1 md:col-span-2 lg:col-span-4">
            <SalesChart
              numOfDays={activeParam}
              recentBookings={recentBookings}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
