import z from "zod";

export const settingsFormSchema = z.object({
  maxBookingLength: z
    .transform(Number)
    .pipe(
      z
        .number()
        .min(1, "Minimum stay must be at least 1 night")
        .max(30, "Maximum stay is limited to 30 nights")
    )
    .optional(),
  minBookingLength: z
    .transform(Number)
    .pipe(z.number().min(1, "Minimum stay must be at least 1 night"))
    .optional(),
  maxGuestsPerBooking: z
    .transform(Number)
    .pipe(
      z
        .number()
        .min(1, "At least 1 guest must be allowed per booking")
        .max(30, "Maximum of 30 guests are allowed per booking")
    )
    .optional(),
  breakfastPrice: z
    .transform(Number)
    .pipe(z.number().min(1, "Breakfast price must be at least 1"))
    .optional(),
});

export type SettingFormSchemaType = z.infer<typeof settingsFormSchema>;
