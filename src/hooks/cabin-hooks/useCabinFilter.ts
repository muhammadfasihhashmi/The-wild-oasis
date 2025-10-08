import { Cabin } from "@/types/cabin.types";
import { useSearchParams } from "react-router-dom";

function useCabinFilter(cabins: Cabin[]) {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeFilter = searchParams.get("discount") || "all";

  function setFilter(filter: string) {
    const newSearchParam = new URLSearchParams(searchParams);
    newSearchParam.set("discount", filter);
    setSearchParams(newSearchParam);
  }

  function filteringCabins() {
    if (activeFilter === "all") {
      return cabins;
    } else if (activeFilter === "no-discount") {
      return cabins.filter((cabin) => cabin.discount === 0);
    } else if (activeFilter === "with-discount") {
      return cabins.filter((cabin) => cabin.discount > 0);
    } else {
      return cabins;
    }
  }

  const filteredCabins = filteringCabins();

  return { setFilter, activeFilter, filteredCabins };
}

export default useCabinFilter;
