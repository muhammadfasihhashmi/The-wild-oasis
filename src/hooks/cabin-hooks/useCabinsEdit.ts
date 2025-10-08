import { editCabin } from "@/services/cabins.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function useCabinsEdit() {
  const queryClient = useQueryClient();
  const { mutate: editCabinApi, isPending: isEditingCabin } = useMutation({
    mutationKey: ["edit-cabin"],
    mutationFn: editCabin,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { editCabinApi, isEditingCabin };
}

export default useCabinsEdit;
