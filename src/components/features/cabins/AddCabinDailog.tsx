import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import AddCabinForm from "./AddCabinForm";
function AddCabinDialog() {
  const [show, setShow] = useState(false);

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 self-center hover:bg-indigo-500 cursor-pointer transform hover:scale-105 ">
          Add Cabin
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl overflow-y-auto max-h-[95vh] [scrollbar-width:none]">
        <DialogHeader>
          <DialogTitle className="text-center text-[1.7rem] font-bold text-zinc-800 dark:text-gray-100">
            New Cabin
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-600">
            Add a beautiful cabin to your collection
          </DialogDescription>
        </DialogHeader>
        {/* cabin form */}
        <AddCabinForm setShow={setShow} />
      </DialogContent>
    </Dialog>
  );
}
export default AddCabinDialog;
