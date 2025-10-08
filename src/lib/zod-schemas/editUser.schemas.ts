import z from "zod";

export const EditUserAccountFormSchema = z.object({
  email: z.email("enter valid email"),
  name: z.string("Enter user name here").min(3, "Enter valid name"),
  image: z.instanceof(File, { message: "Please select an image" }).optional(),
});

export type EditUserAccountFormType = z.infer<typeof EditUserAccountFormSchema>;

export const EditUserPasswordFormSchema = z
  .object({
    password: z.string().min(8, "Minimum 8 characters"),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type EditUserPasswordType = z.infer<typeof EditUserPasswordFormSchema>;
