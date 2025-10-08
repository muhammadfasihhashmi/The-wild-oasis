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
import { Copy, EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { Cabin } from "@/types/cabin.types";
import EditCabinDialog from "./EditCabinDialog";
import useCabinsDelete from "@/hooks/cabin-hooks/useCabinsDelete";
import useCabinsDuplicate from "@/hooks/cabin-hooks/useCabinsDuplicate";

const cabinsColumn = ["CABIN", "CAPACITY", "PRICE", "DISCOUNT", ""];

function CabinsTable({ cabins }: { cabins: Cabin[] }) {
  const { deleteCabinApi } = useCabinsDelete();
  const { duplicateCabinApi } = useCabinsDuplicate();

  return (
    <div className="border-2 border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm ">
      <Table>
        <TableHeader className="border-b-2 border-b-zinc-200 dark:border-b-zinc-800 shadow-sm">
          <TableRow>
            {cabinsColumn.map((column, index) => (
              <TableHead
                key={index}
                className="text-center font-semibold text-zinc-700 dark:text-gray-100"
              >
                {column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {cabins.map((cabin) => (
            <TableRow key={cabin.id}>
              <TableCell className="flex items-center  gap-5">
                <div className="h-24 w-32 rounded-md border overflow-hidden flex items-center justify-center">
                  {
                    <img
                      src={cabin.image}
                      className="h-full w-full object-cover"
                    />
                  }
                </div>
                <span className=" text-zinc-700 font-semibold dark:text-gray-300">
                  {cabin.name}
                </span>
              </TableCell>
              <TableCell className=" text-center text-zinc-700 font-semibold dark:text-gray-300">
                <span>Fits up to {cabin.maxCapacity} guests</span>
              </TableCell>
              <TableCell className="text-center font-bold text-zinc-700 dark:text-gray-300">
                ${cabin.regularPrice}
              </TableCell>
              <TableCell className=" text-center font-bold text-green-700">
                {cabin.discount ? `$${cabin.discount}` : "—"}
              </TableCell>
              <TableCell className="text-end w-36">
                <DropdownMenu>
                  <DropdownMenuTrigger className="tramsform hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer">
                    <EllipsisVertical className="h-5 text-zinc-500" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="flex flex-col gap-2 text-zinc-600">
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => duplicateCabinApi(cabin)}
                    >
                      <Copy />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <Pencil />
                      <EditCabinDialog existingCabin={cabin} />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => deleteCabinApi(cabin.id)}
                    >
                      <Trash2 />
                      Delete
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

export default CabinsTable;
