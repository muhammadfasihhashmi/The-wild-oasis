import { getStaysAfterDate } from "@/services/stats.services";
import { useQuery } from "@tanstack/react-query";

function useRecentStays(activeParam: number, queryDate: string) {
  const {
    data = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ["getStaysAfterDate", activeParam],
    queryFn: () => getStaysAfterDate(queryDate),
  });
  return { data, isLoading, isSuccess, isError, error };
}

export default useRecentStays;
