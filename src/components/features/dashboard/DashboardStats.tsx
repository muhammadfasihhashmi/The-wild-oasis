import {
  BriefcaseBusiness,
  CalendarRange,
  ChartColumnBig,
  DollarSign,
} from "lucide-react";
import SmallCard from "@/components/features/dashboard/SmallCard";
import { RecentBookings, RecentStays } from "@/types/dashboard.types";
import { Cabin } from "@/types/cabin.types";

type DashboardStatsProps = {
  recentBookings: RecentBookings[];
  recentStays: RecentStays[];
  cabins: Cabin[];
  daysCount: number;
};

function DashboardStats({
  recentBookings,
  recentStays,
  cabins,
  daysCount,
}: DashboardStatsProps) {
  // Bookings
  const numberOfBookings = recentBookings.length;

  // Sales
  const sales = recentBookings.reduce(
    (acc, booking) => acc + booking.totalPrice,
    0
  );

  // Checked in customers
  const confirmedStays = recentStays.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );
  const checkIns = confirmedStays.length;

  // Occupancy rate
  const numberOfNights = confirmedStays.reduce(
    (acc, stay) => acc + stay.numNights,
    0
  );
  const cabinCount = cabins.length;
  const occupancyRate =
    cabinCount > 0 ? (numberOfNights / (daysCount * cabinCount)) * 100 : 0;

  return (
    <>
      <SmallCard
        cardIcon={BriefcaseBusiness}
        circleColour="bg-blue-100"
        iconColour="text-blue-600"
        label="Bookings"
        value={`${numberOfBookings}`}
      />

      <SmallCard
        cardIcon={DollarSign}
        circleColour="bg-green-100"
        iconColour="text-green-600"
        label="Sales"
        value={`$${sales.toLocaleString()}`}
      />

      <SmallCard
        cardIcon={CalendarRange}
        circleColour="bg-purple-200"
        iconColour="text-purple-600"
        label="Check-ins"
        value={`${checkIns}`}
      />

      <SmallCard
        cardIcon={ChartColumnBig}
        circleColour="bg-orange-100"
        iconColour="text-orange-600"
        label="Occupancy Rate"
        value={`${Math.round(occupancyRate)}%`}
      />
    </>
  );
}

export default DashboardStats;
