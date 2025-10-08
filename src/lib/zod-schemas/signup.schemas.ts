import z from "zod";

export const signupFormSchema = z
  .object({
    name: z.string("Enter user name here").min(3, "Enter valid name"),
    email: z.email("enter valid email"),
    password: z.string().min(8, "Minimum 8 characters"),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignupFormType = z.infer<typeof signupFormSchema>;
