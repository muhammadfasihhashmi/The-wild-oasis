import { getStaysTodayActivity } from "@/services/stats.services";
import { useQuery } from "@tanstack/react-query";

function useTodayActivities() {
  const {
    data = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity,
  });
  return { data, isLoading, isSuccess, isError, error };
}

export default useTodayActivities;
