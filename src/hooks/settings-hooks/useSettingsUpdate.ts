//customh hook for udating the settings

import { updateSettings } from "@/services/settings.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function useSettingsUpdate() {
  const queryClient = useQueryClient();

  const { mutate: updateSettingsApi, isPending } = useMutation({
    mutationKey: ["update-settings"],
    mutationFn: updateSettings,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["get-settings"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateSettingsApi, isPending };
}

export default useSettingsUpdate;
