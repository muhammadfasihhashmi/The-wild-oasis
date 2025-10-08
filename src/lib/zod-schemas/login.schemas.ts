import z from "zod";

export const loginFormSchema = z.object({
  email: z.email("Enter Valid email"),
  password: z.string().min(8, "Minimum 8 characters").max(100),
});

export type LogicInputType = z.infer<typeof loginFormSchema>;
