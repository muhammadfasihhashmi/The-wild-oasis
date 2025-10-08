import { deleteCabin } from "@/services/cabins.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function useCabinsDelete() {
  const queryClient = useQueryClient();
  const { mutate: deleteCabinApi } = useMutation({
    mutationKey: ["delete-cabin"],
    mutationFn: deleteCabin,
    onMutate: () => {
      toast.loading("Deleting cabin...", {
        id: "delete-cabin",
      });
    },
    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onSettled: () => {
      toast.dismiss("delete-cabin");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { deleteCabinApi };
}

export default useCabinsDelete;
