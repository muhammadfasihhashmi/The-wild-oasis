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
  addCabinFormSchema,
  AddCabinInputsType,
} from "@/lib/zod-schemas/cabin.schemas";
import { Loader2 } from "lucide-react";
import useCabinsCreate from "@/hooks/cabin-hooks/useCabinsCreate";

function AddCabinForm({
  setShow,
}: {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm<AddCabinInputsType>({
    resolver: zodResolver(addCabinFormSchema),
    defaultValues: {
      name: "",
      maxCapacity: 0,
      discount: 0,
      regularPrice: 0,
      description: "",
    },
  });

  const { addCabinApi, isAddingCabin } = useCabinsCreate();

  function onSubmit(values: AddCabinInputsType) {
    addCabinApi(values, {
      onSuccess: () => {
        form.reset();
        setShow(false);
      },
    });
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
                <Input placeholder="Enter cabin name" type="text" {...field} />
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
                  className="cursor-pointer file:px-2
                     file:rounded-md file:border-0 file:text-s file:font-semibold file:text-indigo-600 hover:file:bg-indigo-100 hover:cursor-pointer"
                  type="file"
                  accept="image/*"
                  onChange={(e) => onChange(e.target.files?.[0])}
                  ref={ref}
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
            onClick={() => {
              form.reset();
              setShow(false);
            }}
            disabled={isAddingCabin}
          >
            Cancel
          </Button>
          <Button
            disabled={isAddingCabin}
            className="self-center bg-indigo-600 hover:bg-indigo-500 cursor-pointer mt-5"
            type="submit"
          >
            {isAddingCabin ? (
              <>
                creating
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
              </>
            ) : (
              "Create cabin"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default AddCabinForm;
