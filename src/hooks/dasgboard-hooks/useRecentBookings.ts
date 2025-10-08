import { getBookingAfterDate } from "@/services/stats.services";
import { useQuery } from "@tanstack/react-query";

function useRecentBookings(activeParam: number, queryDate: string) {
  const {
    data = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ["getBookingsAfterDate", activeParam],
    queryFn: () => getBookingAfterDate(queryDate),
  });
  return { data, isLoading, isSuccess, isError, error };
}

export default useRecentBookings;
