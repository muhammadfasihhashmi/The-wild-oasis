import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Eye, Import, Trash2 } from "lucide-react";
import { Booking } from "@/types/booking.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking, editBookingStatus } from "@/services/bookings.services";
import { toast } from "sonner";
import BookingDetailsDialog from "./BookingDetailsDialog";
import { useNavigate } from "react-router-dom";

const bookingColumns = ["CABIN", "GUEST", "DATES", "STATUS", "AMOUNT", ""];

function BookingsTable({ bookings }: { bookings: Booking[] }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: deleteBookingApi } = useMutation({
    mutationKey: ["delete-booking"],
    mutationFn: deleteBooking,
    onMutate: () => {
      toast.loading("Deleting booking...", { id: "booking-del" });
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["get-bookings"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      toast.dismiss("booking-del");
    },
  });

  const { mutate: editBookingStatusApi } = useMutation({
    mutationKey: ["edit-bookingStatus"],
    mutationFn: editBookingStatus,
    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-bookings"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return (
    <div className="border-2 border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm ">
      <Table>
        <TableHeader className="border-b-2 border-b-zinc-200 dark:border-b-zinc-800 shadow-sm">
          <TableRow>
            {bookingColumns.map((clm, index) => (
              <TableHead
                key={index}
                className="text-start tex-sm font-semibold text-zinc-800 dark:text-gray-100"
              >
                {clm}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings?.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="text-zinc-700 font-semibold text-[1rem] pl-3 dark:text-gray-300 ">
                {booking.cabins.name}
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1 ">
                  <span className="text-zinc-700 font-semibold text-md dark:text-gray-300">
                    {booking.guests.fullName}
                  </span>
                  <span className="text-sm text-zinc-500 font-sans">
                    {booking.guests.email}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="text-md text-zinc-700 font-semibold dark:text-gray-300">{`${booking.numNights} night stay`}</span>
                  <span className="text-sm text-zinc-500 font-mono">
                    {`${booking.startDate.split("T")[0]} to ${
                      booking.endDate.split("T")[0]
                    }`}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span
                  className={`text-xs w-[100px] h-6 px-1 flex justify-center items-center rounded-full ${
                    booking.status === "confirmed" ||
                    booking.status === "checked-in"
                      ? "bg-blue-100 text-blue-700 font-semibold dark:bg-blue-300 dark:text-blue-900"
                      : booking.status === "checked-out"
                      ? "bg-green-100 text-green-700 font-semibold dark:bg-green-300 dark:text-green-800 "
                      : "bg-red-100 text-red-600 font-semibold dark:bg-red-300 dark:text-red-800"
                  }`}
                >
                  {booking.status.toUpperCase()}
                </span>
              </TableCell>
              <TableCell className="font-semibold text-zinc-700 dark:text-gray-300">{`$${booking.totalPrice.toFixed(
                2
              )}`}</TableCell>
              <TableCell className="text-end">
                <DropdownMenu>
                  <DropdownMenuTrigger className="tramsform hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer">
                    <EllipsisVertical className="h-5 text-zinc-500" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="flex flex-col gap-2 text-zinc-600">
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Eye />
                      <BookingDetailsDialog booking={booking} />
                    </DropdownMenuItem>

                    {booking.status === "checked-in" && (
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() =>
                          editBookingStatusApi({
                            id: booking.id,
                            status: booking.status,
                          })
                        }
                      >
                        <Import />
                        Check Out
                      </DropdownMenuItem>
                    )}

                    {booking.status === "unconfirmed" && (
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => navigate(`/checkin/${booking.id}`)}
                      >
                        <Import />
                        Check In
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => deleteBookingApi(booking.id)}
                    >
                      <Trash2 />
                      Delete booking
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default BookingsTable;
