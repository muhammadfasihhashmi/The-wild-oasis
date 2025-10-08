import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortingCabinsProps {
  handleSortingChange: (value: string) => void;
  activeSorting: string;
}

function SortingCabins({
  activeSorting,
  handleSortingChange,
}: SortingCabinsProps) {
  return (
    <Select value={activeSorting} onValueChange={handleSortingChange}>
      <SelectTrigger className="w-[180px] shadow-sm focus:ring-2 focus:ring-indigo-600">
        <SelectValue placeholder="Sorting" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="name-asc">sort by name (A-Z)</SelectItem>
        <SelectItem value="name-desc">sort by name (Z-A)</SelectItem>
        <SelectItem value="regularPrice-asc">
          sort by price (low first)
        </SelectItem>
        <SelectItem value="regularPrice-desc">
          sort by price (high first)
        </SelectItem>
        <SelectItem value="maxCapacity-asc">
          sort by capacity (low first)
        </SelectItem>
        <SelectItem value="maxCapacity-desc">
          sort by capacity (high first)
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

export default SortingCabins;
