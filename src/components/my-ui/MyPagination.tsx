import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function MyPagination({
  onPageChange,
  pagination,
}: {
  onPageChange: (page: number) => void;
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    count: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    from: number;
    to: number;
  };
}) {
  return (
    <div
      className={`flex justify-between items-center ${
        pagination.count < 10 ? "hidden" : "block"
      }`}
    >
      <div>
        Showing <span className="font-bold">{pagination.from}</span> to{" "}
        <span className="font-bold">{pagination.to}</span> of{" "}
        <span className="font-bold">{pagination.count}</span> results.
      </div>
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  pagination.hasPreviousPage &&
                  onPageChange(pagination.page - 1)
                }
                className={`${
                  pagination.hasPreviousPage
                    ? ""
                    : "pointer-events-none opacity-50"
                } cursor-pointer`}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  pagination.hasNextPage && onPageChange(pagination.page + 1)
                }
                className={`${
                  pagination.hasNextPage ? "" : "pointer-events-none opacity-50"
                } cursor-pointer`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default MyPagination;
