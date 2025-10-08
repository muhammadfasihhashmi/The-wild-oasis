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
import useSettingsUpdate from "@/hooks/settings-hooks/useSettingsUpdate";
import {
  SettingFormSchemaType,
  settingsFormSchema,
} from "@/lib/zod-schemas/settings.scchemas";
import { Setting } from "@/types/setting.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

function SettingsForm({ defaultData }: { defaultData: Setting }) {
  const { updateSettingsApi, isPending } = useSettingsUpdate();

  const {
    breakfastPrice,
    maxBookingLength,
    maxGuestsPerBooking,
    minBookingLength,
  } = defaultData;

  const form = useForm<SettingFormSchemaType>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      breakfastPrice,
      maxBookingLength,
      maxGuestsPerBooking,
      minBookingLength,
    },
  });

  function onSubmit(data: SettingFormSchemaType) {
    updateSettingsApi(data);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col"
      >
        <FormField
          control={form.control}
          name="maxBookingLength"
          render={({ field }) => (
            <FormItem className="flex items-center gap-6">
              <FormLabel className="w-56 text-md text-zinc-800 dark:text-gray-300">
                Minimum nights/booking
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="max-w-lg border border-indigo-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="minBookingLength"
          render={({ field }) => (
            <FormItem className="flex items-center gap-6 text-zinc-800">
              <FormLabel className="w-56 text-md dark:text-gray-100">
                Maximum nights/booking
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="max-w-lg border border-indigo-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxGuestsPerBooking"
          render={({ field }) => (
            <FormItem className="flex items-center gap-6">
              <FormLabel className="w-56 text-md text-zinc-800 dark:text-gray-100">
                Maximum guests/booking
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="max-w-lg border border-indigo-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="breakfastPrice"
          render={({ field }) => (
            <FormItem className="flex items-center gap-6">
              <FormLabel className="w-56 text-md text-zinc-800 dark:text-gray-100">
                Breakfast price
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="max-w-lg border border-indigo-200"
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
            "update"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default SettingsForm;
