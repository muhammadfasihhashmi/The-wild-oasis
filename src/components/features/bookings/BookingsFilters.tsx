import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const filters = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Checked In",
    value: "checked-in",
  },
  {
    label: "Checked Out",
    value: "checked-out",
  },
  {
    label: "Unconfirmed",
    value: "unconfirmed",
  },
];

function BookingsFilters({
  activeFilter,
  handleFilterChange,
}: {
  activeFilter: string;
  handleFilterChange: (value: string) => void;
}) {
  return (
    <Tabs defaultValue={activeFilter}>
      <TabsList>
        {filters.map((filter) => (
          <TabsTrigger
            key={filter.value}
            value={filter.value}
            className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white cursor-pointer"
            onClick={() => handleFilterChange(filter.value)}
          >
            {filter.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

export default BookingsFilters;
