import { isFuture, isPast, isToday } from "date-fns";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { guests } from "./data-guests";
import { Button } from "@/components/ui/button";
import { subtractDates } from "@/utils/helpers";
import { cabins } from "./data-cabins";
import { bookings } from "./data-bookings";
import { Database, Upload, RefreshCw, AlertCircle } from "lucide-react";

async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) console.log(error.message);
}

async function createBookings() {
  const { data: guestsIds, error: guestError } = await supabase
    .from("guests")
    .select("id")
    .order("id");

  if (guestError) {
    console.error(guestError);
    return;
  }

  const allGuestIds = guestsIds.map((guest) => guest.id);

  const { data: cabinsIds, error: cabinError } = await supabase
    .from("cabins")
    .select("id")
    .order("id");

  if (cabinError) {
    console.error(cabinError);
    return;
  }

  const allCabinIds = cabinsIds.map((cabin) => cabin.id);

  const finalBookings = bookings
    .map((booking) => {
      const cabin = cabins.at(booking.cabinId - 1);
      if (!cabin) return;

      const numNights = subtractDates(booking.endDate, booking.startDate);
      const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
      const extrasPrice = booking.hasBreakfast
        ? numNights * 15 * booking.numGuests
        : 0;
      const totalPrice = cabinPrice + extrasPrice;

      let status;
      if (
        isPast(new Date(booking.endDate)) &&
        !isToday(new Date(booking.endDate))
      )
        status = "checked-out";
      if (
        isFuture(new Date(booking.startDate)) ||
        isToday(new Date(booking.startDate))
      )
        status = "unconfirmed";
      if (
        (isFuture(new Date(booking.endDate)) ||
          isToday(new Date(booking.endDate))) &&
        isPast(new Date(booking.startDate)) &&
        !isToday(new Date(booking.startDate))
      )
        status = "checked-in";

      return {
        ...booking,
        numNights,
        cabinPrice,
        extrasPrice,
        totalPrice,
        guestId: allGuestIds.at(booking.guestId - 1) || 1,
        cabinId: allCabinIds.at(booking.cabinId - 1) || 1,
        status: status || "unconfirmed",
      };
    })
    .filter((b): b is NonNullable<typeof b> => b !== undefined);

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.log(error.message);
}

export function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();
    await createGuests();
    await createCabins();
    await createBookings();
    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <div className="mx-auto mt-auto w-[1000px] transition-colors duration-300">
      <div className="relative overflow-hidden">
        {/* background glow orbs */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-20 blur-3xl -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-200 dark:bg-purple-900 rounded-full opacity-20 blur-3xl translate-y-20 -translate-x-20"></div>

        <div className="relative px-6 py-8">
          {/* heading */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
              Development Tools
            </h3>
          </div>

          {/* content blocks */}
          <div className="space-y-6">
            {/* INIT DB */}
            <div className="p-5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg border border-indigo-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-md">
                  <Database className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                    Initialize Database
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Upload all sample data including guests, cabins, and
                    bookings.
                  </p>
                  <Button
                    onClick={uploadAll}
                    disabled={isLoading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload All Sample Data
                      </>
                    )}
                  </Button>

                  <div className="flex items-center gap-2 mt-3 text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-3 py-2 rounded-md border border-amber-200 dark:border-amber-800">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Run this only once during initial setup</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
                    Note: Cabin images need to be uploaded manually
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-indigo-100 dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 text-gray-500 dark:text-gray-400 font-medium">
                  OR
                </span>
              </div>
            </div>

            {/* REFRESH BOOKINGS */}
            <div className="p-5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg border border-purple-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-md">
                  <RefreshCw className="w-5 h-5 text-purple-600 dark:text-purple-300" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                    Refresh Bookings
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Update bookings with current dates for daily development.
                  </p>
                  <Button
                    onClick={uploadBookings}
                    disabled={isLoading}
                    variant="outline"
                    className="w-full border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/40 transition-all duration-200"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Upload Current Bookings
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Safe to run daily during development
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
