import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sorters = [
  {
    label: "Sort by date (recent first)",
    value: "startDate-asc",
  },
  {
    label: "Sort by date (earlier first)",
    value: "startDate-desc",
  },
  {
    label: "Sort by amount (high first)",
    value: "totalPrice-desc",
  },
  {
    label: "Sort by amount (low first)",
    value: "totalPrice-asc",
  },
];

function BookingsSorter({
  activeSorting,
  handleSortingChange,
}: {
  activeSorting: string;
  handleSortingChange: (value: string) => void;
}) {
  return (
    <Select value={activeSorting} onValueChange={handleSortingChange}>
      <SelectTrigger className="w-50">
        <SelectValue placeholder="Select Sorting" />
      </SelectTrigger>
      <SelectContent>
        {sorters.map((sort, index) => (
          <SelectItem key={index} value={sort.value}>
            {sort.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default BookingsSorter;
