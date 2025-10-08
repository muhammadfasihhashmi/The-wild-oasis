import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FilterCabinsProps {
  setFilter: (filter: string) => void;
  activeFilter: string;
}

const filters = [
  { label: "All", value: "all" },
  { label: "No discount", value: "no-discount" },
  { label: "With discount", value: "with-discount" },
];

function FilterCabins({ setFilter, activeFilter }: FilterCabinsProps) {
  return (
    <Tabs value={activeFilter} onValueChange={setFilter}>
      <TabsList>
        {filters.map((filter) => (
          <TabsTrigger
            key={filter.value}
            value={filter.value}
            className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white cursor-pointer"
          >
            {filter.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

export default FilterCabins;
