import { Booking } from "@/types/booking.types";
import { formatBookingRange } from "@/utils/helpers";
import { MapPin, Check, X } from "lucide-react";

function BookingDetails({ booking }: { booking: Booking }) {
  const {
    id,
    created_at,
    status,
    numNights,
    startDate,
    endDate,
    numGuests,
    hasBreakfast,
    totalPrice,
    isPaid,
    extrasPrice,
  } = booking;

  const { name, regularPrice } = booking.cabins;

  const { countryFlag, email, nationalID, fullName } = booking.guests;

  const date = `${startDate}-${endDate}`;

  return (
    <div className="w-full bg-gray-50 dark:bg-zinc-900">
      <div className="mx-auto p-2">
        <div className="p-4">
          <div className="flex items-center gap-4 mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Booking #{id}
            </h1>
            <span className="bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
              {status.toUpperCase()}
            </span>
          </div>

          <div className="bg-indigo-600 dark:bg-indigo-700 text-white rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                <span className="text-lg font-semibold">
                  {numNights} nights in Cabin {name}
                </span>
              </div>
              <div className="text-right">
                <div className="font-medium">{formatBookingRange(date)}</div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-6 rounded-sm overflow-hidden">
                <img
                  src={countryFlag}
                  alt="flag"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {fullName} + {numGuests} guests
              </span>
              <span className="text-gray-500 dark:text-gray-400">•</span>
              <span className="text-gray-600 dark:text-gray-300">{email}</span>
              <span className="text-gray-500 dark:text-gray-400">•</span>
              <span className="text-gray-600 dark:text-gray-300">
                National ID {nationalID}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 ${
                  hasBreakfast
                    ? "bg-green-100 dark:bg-green-900"
                    : "bg-red-100 dark:bg-red-900"
                } rounded-full flex items-center justify-center`}
              >
                {hasBreakfast ? (
                  <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                ) : (
                  <X className="w-3 h-3 text-red-600 dark:text-red-400" />
                )}
              </div>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Breakfast included?
              </span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {hasBreakfast ? "Yes" : "No"}
              </span>
            </div>
          </div>

          <div
            className={`${
              isPaid
                ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
                : "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"
            } border rounded-lg p-6 mb-6`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 ${
                    isPaid
                      ? "bg-green-600 dark:bg-green-700"
                      : "bg-red-600 dark:bg-red-700"
                  } rounded-full flex items-center justify-center`}
                >
                  <span className="text-white font-bold text-sm">$</span>
                </div>
                <div>
                  <span
                    className={`font-semibold text-lg ${
                      isPaid
                        ? "text-green-800 dark:text-green-300"
                        : "text-red-800 dark:text-red-300"
                    }`}
                  >
                    Total price
                  </span>
                  <div
                    className={`${
                      isPaid
                        ? "text-green-700 dark:text-green-400"
                        : "text-red-700 dark:text-red-400"
                    }`}
                  >
                    <span className="font-bold text-xl">${totalPrice}</span>
                    <span className="text-sm ml-2">
                      (${regularPrice.toFixed(2)} cabin + $
                      {extrasPrice.toFixed(2)} breakfast)
                    </span>
                  </div>
                </div>
              </div>
              <span
                className={`${
                  isPaid
                    ? "bg-green-600 dark:bg-green-700"
                    : "bg-red-600 dark:bg-red-700"
                } text-white px-4 py-2 rounded-lg font-bold`}
              >
                {isPaid ? "PAID" : "NOT PAID"}
              </span>
            </div>
          </div>

          <div className="text-right text-gray-500 dark:text-gray-400 text-sm mb-6">
            Booked on {created_at.split("T")[0]} at{" "}
            {created_at.split("T")[1].split(".")[0]}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
