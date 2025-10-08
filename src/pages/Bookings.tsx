import BookingsTable from "@/components/features/bookings/BookingsTable";
import { DataTableSkeleton } from "@/components/my-ui/DataTableSkeleton";

import { getBookings } from "@/services/bookings.services";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import MyPagination from "@/components/my-ui/MyPagination";
import BookingsFilters from "@/components/features/bookings/BookingsFilters";
import BookingsSorter from "@/components/features/bookings/BookingsSorter";

function Booking() {
  const [searchParams, setSearchParams] = useSearchParams();

  //filtering
  const activeFilter = searchParams.get("status") || "all";

  const filter =
    !activeFilter || activeFilter === "all"
      ? null
      : { field: "status", value: activeFilter };

  function handleFilterChange(value: string) {
    handlePageChange(1);
    searchParams.set("status", value);
    setSearchParams(searchParams);
  }

  //sorting
  const activeSorting = searchParams.get("sortBy") || "";
  const [column, direction] = activeSorting.split("-");

  const sorter =
    !activeSorting || activeSorting === "" ? null : { column, direction };

  function handleSortingChange(value: string) {
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  }

  //pagination
  const page = searchParams.get("page") || 1;
  const limit = 10;

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryFn: () => getBookings({ page: Number(page), limit }, filter, sorter),
    queryKey: ["get-bookings", filter, sorter, page, limit],
  });

  function handlePageChange(page: number) {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-3xl text-zinc-800 tracking-tight dark:text-gray-100">
          Bookings
        </h1>
        <div className="flex gap-2">
          <BookingsFilters
            activeFilter={activeFilter}
            handleFilterChange={handleFilterChange}
          />
          <BookingsSorter
            activeSorting={activeSorting}
            handleSortingChange={handleSortingChange}
          />
        </div>
      </div>
      {isLoading && (
        <DataTableSkeleton rows={8} columns={5} showHeader={false} />
      )}
      {isError && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          {error?.message}
        </div>
      )}
      {isSuccess && (
        <>
          <BookingsTable bookings={data.data} />
          <MyPagination
            onPageChange={handlePageChange}
            pagination={data.pagination}
          />
        </>
      )}
    </>
  );
}

export default Booking;
