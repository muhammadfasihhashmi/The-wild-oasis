import { editBookingStatus } from "@/services/bookings.services";
import { TodayActivities } from "@/types/dashboard.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function TodayActivity({
  todayActivities,
}: {
  todayActivities: TodayActivities[];
}) {
  const queryClient = useQueryClient();
  const { mutate: editBookingStatusApi, isPending } = useMutation({
    mutationFn: editBookingStatus,
    onMutate: () => {
      toast.loading("Loading...", { id: "activity-loading" });
    },
    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-bookings"] });
      queryClient.invalidateQueries({ queryKey: ["today-activity"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      toast.dismiss("activity-loading");
    },
  });

  return (
    <div className="h-[100%] rounded-xl px-5 py-5 overflow-y-auto dark:bg-zinc-900">
      <h2 className="text-xl font-bold mb-5">Today</h2>
      {todayActivities.length > 0 ? (
        todayActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between px-3 py-2 text-sm border-b"
          >
            <div className="flex gap-3">
              <span
                className={`flex justify-center items-center py-1 text-xs font-semibold w-20 rounded-full ${
                  activity.status === "unconfirmed"
                    ? "text-green-700 bg-green-100 dark:bg-green-300 dark:text-green-900"
                    : activity.status === "checked-in"
                    ? "text-blue-700 bg-blue-100 dark:bg-blue-300 dark:text-blue-900"
                    : ""
                }`}
              >
                {activity.status === "unconfirmed" && "ARRIVING"}
                {activity.status === "checked-in" && "DEPARTING"}
              </span>

              <div className="flex items-center gap-2 flex-1 ml-4">
                <img
                  src={activity.guests?.countryFlag}
                  alt={`${activity.guests?.fullName || "Guest"}'s country flag`}
                  className="h-4 w-6 object-cover rounded-sm"
                />
                <span className="font-medium text-gray-800 dark:text-gray-100">
                  {activity.guests?.fullName || "Unknown Guest"}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-500 mr-4">
                {activity.numNights} nights
              </span>

              <button
                onClick={() =>
                  editBookingStatusApi({
                    id: activity.id,
                    status: activity.status,
                  })
                }
                disabled={isPending}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white text-xs font-semibold px-4 py-1.5 rounded-md min-w-[98px]"
              >
                {activity.status === "unconfirmed" ? "CHECK IN" : "CHECK OUT"}
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-xl font-semibold text-center mt-24 text-zinc-700">
          No activities today...
        </p>
      )}
    </div>
  );
}

export default TodayActivity;
