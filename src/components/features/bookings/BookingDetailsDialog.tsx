import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BookingDetails from "./BookingDetails";
import { Booking } from "@/types/booking.types";
function BookingDetailsDialog({ booking }: { booking: Booking }) {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">See all</DialogTrigger>
      <DialogContent className="!max-w-4xl w-full h-[70vh] p-0 dark:bg-zinc-900">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="h-full overflow-y-hidden">
          <BookingDetails booking={booking} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default BookingDetailsDialog;
