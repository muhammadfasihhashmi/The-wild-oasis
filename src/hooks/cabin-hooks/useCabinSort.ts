import { Cabin } from "@/types/cabin.types";
import { useSearchParams } from "react-router-dom";

function useCabinSort(filteredCabins: Cabin[]) {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeSorting = searchParams.get("sortBy") || "";

  let sortedCabins = filteredCabins;

  if (activeSorting) {
    const [field, direction] = activeSorting.split("-") as [
      keyof Cabin,
      string
    ];
    const modifier = direction === "asc" ? 1 : -1;
    sortedCabins = [...filteredCabins].sort((a, b) => {
      if (typeof a[field] === "string" && typeof b[field] === "string") {
        return a[field].localeCompare(b[field]) * modifier;
      }
      if (typeof a[field] === "number" && typeof b[field] === "number") {
        return ((a[field] - b[field]) as number) * modifier;
      }
      return 0;
    });
  }

  function handleSortingChange(value: string) {
    const newSearchParam = new URLSearchParams(searchParams);
    newSearchParam.set("sortBy", value);
    setSearchParams(newSearchParam);
  }

  return { activeSorting, handleSortingChange, sortedCabins };
}

export default useCabinSort;
