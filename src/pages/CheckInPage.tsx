import Spinner from "@/components/my-ui/Spinner";
import {
  editBookingStatus,
  getBookingById,
} from "@/services/bookings.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Check, ArrowLeft, X } from "lucide-react";
import { formatBookingRange } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function CheckInPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["booking-by-id"],
    queryFn: () => getBookingById(Number(id)),
  });
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    if (data?.isPaid) {
      setPaid(true);
    }
  }, [data?.isPaid]);

  const { mutate: editBookingStatusApi, isPending } = useMutation({
    mutationKey: ["edit-bookingStatus"],
    mutationFn: editBookingStatus,
    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-bookings"] });
      navigate("/bookings");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center min-h-[400px]">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md">
          <p className="text-red-600 dark:text-red-400 font-semibold text-lg mb-2">
            Something went wrong
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {error.message}
          </p>
        </div>
      </div>
    );

  if (!isLoading && !isError && !data) {
    return (
      <div className="text-gray-500 text-center mt-6">
        No booking found for this ID.
      </div>
    );
  }

  if (isSuccess && data)
    return (
      <div className="flex flex-col gap-9">
        <Link
          to={"/bookings"}
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 cursor-pointer transition-colors"
        >
          <ArrowLeft size={16} />
          <span className="text-sm font-medium">Back</span>
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Check in booking #{data.id}
        </h1>

        <div className="rounded-xl shadow-lg overflow-hidden bg-white dark:bg-gray-800 w-full border border-gray-100 dark:border-gray-700">
          <div className="p-4 text-white bg-gradient-to-r from-indigo-600 to-indigo-500 dark:from-indigo-700 dark:to-indigo-600 flex justify-between text-sm sm:text-base">
            <span className="font-semibold">
              {data.numNights} nights in Cabin {data.cabins.name}
            </span>
            <span>
              {formatBookingRange(`${data.startDate}-${data.endDate}`)}
            </span>
          </div>

          <div className="p-6 space-y-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-6 rounded-sm overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700">
                <img
                  src={data.guests.countryFlag}
                  alt="flag"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {data.guests.fullName} + {data.numGuests} guests
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600 dark:text-gray-400">
                {data.guests.email}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600 dark:text-gray-400">
                National ID {data.guests.nationalID}
              </span>
            </div>

            <div
              className={`flex items-center gap-2 ${
                data.hasBreakfast
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {data.hasBreakfast ? <Check size={16} /> : <X size={16} />}
              <span>
                Breakfast included?{" "}
                <strong>{data.hasBreakfast ? "Yes" : "No"}</strong>
              </span>
            </div>

            <div
              className={`p-4 rounded-lg flex justify-between items-center border ${
                data.isPaid
                  ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800"
                  : "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800"
              }`}
            >
              <span className="font-semibold">
                Total price ${data.totalPrice.toLocaleString()} ($
                {data.cabins.regularPrice.toLocaleString()} cabin + $
                {data.extrasPrice.toLocaleString()} breakfast)
              </span>
              <span className="font-bold">
                {data.isPaid ? "PAID" : "NOT PAID"}
              </span>
            </div>

            <div className="text-start text-gray-500 dark:text-gray-400 text-sm mb-6">
              Booked on {data.created_at.split("T")[0]} at{" "}
              {data.created_at.split("T")[1].split(".")[0]}
            </div>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          <input
            type="checkbox"
            checked={paid}
            disabled={data.isPaid}
            onChange={(e) => setPaid(e.target.checked)}
            className="w-4 h-4 accent-indigo-600 cursor-pointer disabled:cursor-not-allowed"
          />
          <span className="text-gray-700 dark:text-gray-300">
            I confirm that <strong>{data.guests.fullName}</strong> has paid the
            total amount of <strong>${data.totalPrice.toLocaleString()}</strong>
          </span>
        </label>

        <div className="flex gap-3 w-[500px] self-end mt-2">
          <button
            disabled={!paid || isPending}
            onClick={() =>
              editBookingStatusApi({
                id: data.id,
                status: data.status,
              })
            }
            className="flex-1 bg-indigo-600 text-white py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              `Check in booking #${data.id}`
            )}
          </button>
          <Link
            to={"/bookings"}
            className="flex-1 py-3 rounded-lg border shadow-sm bg-white text-gray-800 border-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 text-center transition-colors"
          >
            Back
          </Link>
        </div>
      </div>
    );
}

export default CheckInPage;
