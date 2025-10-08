import CabinsTable from "@/components/features/cabins/CabinsTable";
import AddCabinDialog from "@/components/features/cabins/AddCabinDailog";
import useCabins from "@/hooks/cabin-hooks/useCabins";
import FilterCabins from "@/components/features/cabins/FilterCabins";
import SortingCabins from "@/components/features/cabins/SortingCabins";
import useCabinFilter from "@/hooks/cabin-hooks/useCabinFilter";
import useCabinSort from "@/hooks/cabin-hooks/useCabinSort";
import { DataTableSkeleton } from "@/components/my-ui/DataTableSkeleton";

function Cabins() {
  const { cabins, error, isError, isLoading, isSuccess } = useCabins();

  const { activeFilter, filteredCabins, setFilter } = useCabinFilter(cabins);

  const { activeSorting, sortedCabins, handleSortingChange } =
    useCabinSort(filteredCabins);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-3xl text-zinc-800 tracking-tight dark:text-gray-100">
          All Cabins
        </h1>
        <div className="flex gap-3">
          <FilterCabins activeFilter={activeFilter} setFilter={setFilter} />
          <SortingCabins
            activeSorting={activeSorting}
            handleSortingChange={handleSortingChange}
          />
        </div>
      </div>
      {isLoading && (
        <DataTableSkeleton
          rows={8}
          columns={5}
          showHeader={false}
          showPagination={false}
        />
      )}
      {isError && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          {error?.message}
        </div>
      )}
      {isSuccess && sortedCabins && <CabinsTable cabins={sortedCabins} />}
      <AddCabinDialog />
    </>
  );
}

export default Cabins;
