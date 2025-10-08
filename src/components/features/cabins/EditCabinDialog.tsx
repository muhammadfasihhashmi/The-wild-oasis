import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import EditCabinForm from "./EditCabinForm";
import { Cabin } from "@/types/cabin.types";

function EditCabinDialog({ existingCabin }: { existingCabin: Cabin }) {
  const [show, setShow] = useState(false);

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogTrigger className="cursor-pointer">Edit</DialogTrigger>
      <DialogContent className="rounded-2xl overflow-y-auto max-h-[95vh] [scrollbar-width:none]">
        <DialogHeader>
          <DialogTitle className="text-center text-[1.7rem] font-bold text-zinc-800">
            New Cabin
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-600">
            Add a beautiful cabin to your collection
          </DialogDescription>
        </DialogHeader>
        {/* cabin form */}
        <EditCabinForm setShow={setShow} existingCabin={existingCabin} />
      </DialogContent>
    </Dialog>
  );
}
export default EditCabinDialog;
