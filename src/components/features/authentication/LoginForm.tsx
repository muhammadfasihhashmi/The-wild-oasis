import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  LogicInputType,
  loginFormSchema,
} from "@/lib/zod-schemas/login.schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userLogin } from "@/services/auth.services";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { toast } from "sonner";

export function LoginForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const form = useForm<LogicInputType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: userLoginApi, isPending: islogining } = useMutation({
    mutationFn: userLogin,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      navigate("/");
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(values: LogicInputType) {
    userLoginApi(values);
  }

  return (
    <Card className="w-md">
      <CardContent>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <img
              src="/img/logo-light.png"
              alt="logo"
              height="150px"
              width="150px"
            />
            <h1 className="text-2xl font-bold">Login to your account</h1>
          </div>
          <div className="grid gap-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 flex flex-col"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="admin@gmail.com"
                          {...field}
                          type="email"
                          disabled={islogining}
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
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={islogining}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="cursor-pointer bg-indigo-600 hover:bg-indigo-800"
                  type="submit"
                >
                  {islogining ? <Loader className="animate-spin" /> : "Login"}
                </Button>
              </form>
            </Form>
          </div>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <p className="underline underline-offset-4 inline">Sign up</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
