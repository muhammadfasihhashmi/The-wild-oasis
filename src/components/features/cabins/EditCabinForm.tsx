import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  editCabinFormSchema,
  EditCabinInputsType,
} from "@/lib/zod-schemas/cabin.schemas";
import { Cabin } from "@/types/cabin.types";
import { Loader2 } from "lucide-react";
import useCabinsEdit from "@/hooks/cabin-hooks/useCabinsEdit";

function EditCabinForm({
  setShow,
  existingCabin,
}: {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  existingCabin: Cabin;
}) {
  const { id, image, ...remains } = existingCabin;
  const form = useForm<EditCabinInputsType>({
    resolver: zodResolver(editCabinFormSchema),
    defaultValues: remains,
  });

  const { editCabinApi, isEditingCabin } = useCabinsEdit();

  function onSubmit(values: EditCabinInputsType) {
    editCabinApi(
      {
        cabinId: id,
        editedCabin: { ...values, imageUrl: image },
      },
      {
        onSuccess: () => {
          setShow(false);
        },
      }
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cabin name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter cabin name"
                  type="text"
                  {...field}
                  disabled={isEditingCabin}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxCapacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter cabin capacity"
                  type="number"
                  {...field}
                  disabled={isEditingCabin}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="regularPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter cabin price"
                  type="number"
                  {...field}
                  disabled={isEditingCabin}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter cabin discount"
                  type="number"
                  {...field}
                  disabled={isEditingCabin}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter cabin description"
                  type="text"
                  {...field}
                  disabled={isEditingCabin}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, ref } }) => (
            <FormItem>
              <FormLabel>image</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter cabin description"
                  className="cursor-pointer file:px-2
                     file:rounded-md file:border-0 file:text-s file:font-semibold file:text-indigo-600 hover:file:bg-indigo-100 hover:cursor-pointer"
                  type="file"
                  accept="image/*"
                  onChange={(e) => onChange(e.target.files?.[0])}
                  ref={ref}
                  disabled={isEditingCabin}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-3">
          <Button
            variant={"outline"}
            className=" cursor-pointer mt-5"
            type="button"
            onClick={() => setShow(false)}
            disabled={isEditingCabin}
          >
            Cancel
          </Button>
          <Button
            disabled={isEditingCabin}
            className="self-center bg-indigo-600 hover:bg-indigo-500 cursor-pointer mt-5"
            type="submit"
          >
            {isEditingCabin ? (
              <>
                Saving
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
              </>
            ) : (
              "Save edit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default EditCabinForm;
