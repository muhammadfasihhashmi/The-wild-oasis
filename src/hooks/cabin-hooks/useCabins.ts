import { getCabins } from "@/services/cabins.services";
import { useQuery } from "@tanstack/react-query";

function useCabins() {
  const {
    data: cabins = [],
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { cabins, isError, isLoading, error, isSuccess };
}

export default useCabins;
