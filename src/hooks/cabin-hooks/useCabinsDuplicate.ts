import { duplicateCabin } from "@/services/cabins.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function useCabinsDuplicate() {
  const queryClient = useQueryClient();
  const { mutate: duplicateCabinApi } = useMutation({
    mutationKey: ["duplicate-cabin"],
    mutationFn: duplicateCabin,
    onMutate: () => {
      toast.loading("Duplicating cabin...", {
        id: "duplicate-cabin",
      });
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onSettled: () => {
      toast.dismiss("duplicate-cabin");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { duplicateCabinApi };
}

export default useCabinsDuplicate;
