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
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editUser, getUser } from "@/services/auth.services";
import { toast } from "sonner";
import {
  EditUserAccountFormSchema,
  EditUserAccountFormType,
} from "@/lib/zod-schemas/editUser.schemas";

function EditUserAccountForm() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const queryClient = useQueryClient();
  const { mutate: editUserApi, isPending } = useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Updated successfully");
      form.reset();
      form.resetField("image");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<EditUserAccountFormType>({
    resolver: zodResolver(EditUserAccountFormSchema),
    defaultValues: {
      name: user?.user_metadata?.name,
      email: user?.email,
    },
  });

  function onSubmit(data: EditUserAccountFormType) {
    editUserApi(data);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex items-center gap-6">
              <FormLabel className="w-56 text-md text-zinc-800 dark:text-gray-300">
                Email address
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="max-w-lg border border-indigo-200 bg-blue-200 font-semibold "
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex items-center gap-6 text-zinc-800">
              <FormLabel className="w-56 text-md dark:text-gray-300">
                Full name{" "}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="max-w-lg border border-indigo-200"
                  disabled={isPending}
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
            <FormItem className="flex items-center gap-6">
              <FormLabel className="w-56 text-md text-zinc-800 dark:text-gray-300">
                Avatar image
              </FormLabel>
              <FormControl>
                <Input
                  className="max-w-lg border border-indigo-200"
                  type="file"
                  accept="image/*"
                  onChange={(e) => onChange(e.target.files?.[0])}
                  ref={ref}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size={"lg"}
          className="bg-indigo-600 hover:bg-indigo-500 cursor-pointer self-center md:self-end mt-3 md:mr-12 transform hover:scale-105"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <span>updating</span>
              <Loader2 className="animate-spin" />
            </>
          ) : (
            "Update account"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default EditUserAccountForm;
