import z from "zod";

//add cabin form schemas
export const addCabinFormSchema = z
  .object({
    name: z
      .string("Enter cabin name")
      .min(3, "Please enter a valid name")
      .max(50, "Name should not exceed 50 characters"),
    maxCapacity: z
      .transform(Number)
      .pipe(
        z
          .number("Enetr cabin capacity")
          .min(1, "Enter a valid capacity")
          .max(20, "Cannot host more than 20 guests")
      ),
    regularPrice: z
      .transform(Number)
      .pipe(
        z
          .number("Enter cabin price")
          .min(1, "Enter a cabin price")
          .max(10000, "Price is too high")
      ),
    discount: z
      .transform(Number)
      .pipe(
        z
          .number("Enter 0 if no discount")
          .min(0, "Discount cannot be negative")
          .max(10000, "Discount is too high")
      ),
    description: z
      .string("Missing description")
      .min(10, "Description must be at least 10 characters")
      .max(300, "Description is too long"),
    image: z.instanceof(File, { message: "Please select an image" }),
  })
  .refine((data) => data.discount < data.regularPrice, {
    message: "Discount must be less than regular price",
    path: ["discount"],
  });

export type AddCabinInputsType = z.infer<typeof addCabinFormSchema>;

//edit cabin form schema
export const editCabinFormSchema = z
  .object({
    name: z
      .string("Enter cabin name")
      .min(3, "Please enter a valid name")
      .max(50, "Name should not exceed 50 characters"),
    maxCapacity: z
      .transform(Number)
      .pipe(
        z
          .number("Enetr cabin capacity")
          .min(1, "Enter a valid capacity")
          .max(20, "Cannot host more than 20 guests")
      ),
    regularPrice: z
      .transform(Number)
      .pipe(
        z
          .number("Enter cabin price")
          .min(1, "Enter a cabin price")
          .max(10000, "Price is too high")
      ),
    discount: z
      .transform(Number)
      .pipe(
        z
          .number("Enter 0 if no discount")
          .min(0, "Discount cannot be negative")
          .max(10000, "Discount is too high")
      ),
    description: z
      .string("Missing description")
      .min(10, "Description must be at least 10 characters")
      .max(300, "Description is too long"),
    image: z.instanceof(File, { message: "Please select an image" }).optional(),
  })
  .refine((data) => data.discount < data.regularPrice, {
    message: "Discount must be less than regular price",
    path: ["discount"],
  });

export type EditCabinInputsType = z.infer<typeof editCabinFormSchema>;
