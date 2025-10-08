import { addCabin } from "@/services/cabins.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function useCabinsCreate() {
  const queryClient = useQueryClient();
  const { mutate: addCabinApi, isPending: isAddingCabin } = useMutation({
    mutationKey: ["add-cabin"],
    mutationFn: addCabin,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { addCabinApi, isAddingCabin };
}

export default useCabinsCreate;
