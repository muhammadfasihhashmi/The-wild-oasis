import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  signupFormSchema,
  SignupFormType,
} from "@/lib/zod-schemas/signup.schemas";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/services/auth.services";
import { toast } from "sonner";

function UserSignupForm() {
  const form = useForm<SignupFormType>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: userSignupApi, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      console.log(data);
      toast.success("User created successfully!");
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(data: SignupFormType) {
    const { email, password, name } = data;
    userSignupApi({ name, email, password });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex items-center gap-6">
              <FormLabel className="w-56 text-md text-zinc-800 dark:text-gray-300">
                Full name
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
          name="email"
          render={({ field }) => (
            <FormItem className="flex items-center gap-6 text-zinc-800">
              <FormLabel className="w-56 text-md dark:text-gray-300">
                Email address{" "}
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
                  type="password"
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
                  type="password"
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
              <span>creating</span>
              <Loader2 className="animate-spin" />
            </>
          ) : (
            "create new user"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default UserSignupForm;
