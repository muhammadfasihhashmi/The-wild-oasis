//custom hook for fetching settings

import { getSettings } from "@/services/settings.services";
import { useQuery } from "@tanstack/react-query";

function useSettings() {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["get-settings"],
    queryFn: getSettings,
  });
  return { data, isLoading, isError, isSuccess };
}

export default useSettings;
