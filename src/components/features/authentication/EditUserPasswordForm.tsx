import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { editUserPassword } from "@/services/auth.services";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  EditUserPasswordFormSchema,
  EditUserPasswordType,
} from "@/lib/zod-schemas/editUser.schemas";

function EditUserPasswordForm() {
  const form = useForm<EditUserPasswordType>({
    resolver: zodResolver(EditUserPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: editUserPasswordApi, isPending } = useMutation({
    mutationFn: editUserPassword,
    onSuccess: () => {
      toast.success("password updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(data: EditUserPasswordType) {
    editUserPasswordApi(data);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex items-center gap-6">
              <FormLabel className="w-56 text-md text-zinc-800 dark:text-gray-300">
                Password
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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="flex items-center gap-6">
              <FormLabel className="w-56 text-md text-zinc-800 dark:text-gray-300">
                Confirm password
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
            "Update password"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default EditUserPasswordForm;
