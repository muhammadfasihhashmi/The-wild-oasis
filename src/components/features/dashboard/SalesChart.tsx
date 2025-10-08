"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { RecentBookings } from "@/types/dashboard.types";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

export const description = "An area chart with axes";

const chartConfig = {
  totalSales: {
    label: "Total sales",
    color: "var(--chart-1)",
  },
  extraSales: {
    label: "Extra sales",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function SalesChart({
  numOfDays,
  recentBookings,
}: {
  numOfDays: number;
  recentBookings: RecentBookings[];
}) {
  const dates = eachDayOfInterval({
    start: subDays(new Date(), numOfDays - 1),
    end: new Date(),
  });

  const data = dates.map((date) => ({
    label: format(date, "MMM dd"),
    totalSales: recentBookings
      .filter((booking) => isSameDay(date, booking.created_at))
      .reduce((acc, cur) => acc + cur.totalPrice, 0),
    extraSales: recentBookings
      .filter((booking) => isSameDay(date, booking.created_at))
      .reduce((acc, cur) => acc + cur.extrasPrice, 0),
  }));

  return (
    <Card className="border-none dark:bg-zinc-900">
      <CardHeader>
        <CardTitle className="text-2xl">Sales Overview</CardTitle>
        <CardDescription>
          Showing sales for the last {numOfDays} days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                left: -20,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `$${value}`} // <-- show price
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area
                dataKey="totalSales"
                type="natural"
                fill={chartConfig.totalSales.color}
                fillOpacity={0.4}
                stroke={chartConfig.totalSales.color}
                stackId="a"
              />
              <Area
                dataKey="extraSales"
                type="natural"
                fill={chartConfig.extraSales.color}
                fillOpacity={0.4}
                stroke={chartConfig.extraSales.color}
                stackId="a"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
