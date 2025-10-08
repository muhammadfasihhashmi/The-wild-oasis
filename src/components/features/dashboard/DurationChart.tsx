"use client";

import { Cell, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { RecentStays } from "@/types/dashboard.types";

interface DurationData {
  duration: string;
  value: number;
  fill: string;
}

const startData: DurationData[] = [
  { duration: "1 night", value: 0, fill: "var(--chart-1)" },
  { duration: "2 nights", value: 0, fill: "var(--chart-2)" },
  { duration: "3 nights", value: 0, fill: "var(--chart-3)" },
  { duration: "4-5 nights", value: 0, fill: "var(--chart-4)" },
  { duration: "6-7 nights", value: 0, fill: "var(--chart-5)" },
];

const chartConfig = {
  "1 night": {
    label: "1 night",
  },
  "2 nights": {
    label: "2 nights",
    color: "var(--chart-1)",
  },
  "3 nights": {
    label: "3 nights",
    color: "var(--chart-2)",
  },
  "4-5 nights": {
    label: "4-5 nights",
    color: "var(--chart-3)",
  },
  "6-7 nights": {
    label: "6-7 nights",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export function DurationChart({ recentStays }: { recentStays: RecentStays[] }) {
  const confirmedStays = recentStays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );
  function incArrayValue(arr: DurationData[], field: string): DurationData[] {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  function prepareData(startData: DurationData[], stays: RecentStays[]) {
    const data = stays
      .reduce<DurationData[]>((arr, cur) => {
        const num = cur.numNights;
        if (num === 1) return incArrayValue(arr, "1 night");
        if (num === 2) return incArrayValue(arr, "2 nights");
        if (num === 3) return incArrayValue(arr, "3 nights");
        if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
        if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
        return arr;
      }, startData)
      .filter((obj) => obj.value > 0);

    return data;
  }
  const data = prepareData(startData, confirmedStays);

  return (
    <div className="h-[100%] rounded-xl px-5 py-5 dark:bg-zinc-900">
      <h2 className="text-xl font-bold">Stay duration summary</h2>
      <div>
        <ChartContainer config={chartConfig} className="mx-auto max-h-[275px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie data={data} dataKey="value" nameKey="duration">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend
              content={<ChartLegendContent />}
              className="flex-col items-start"
              layout="vertical"
              verticalAlign="middle"
              align="right"
            />
          </PieChart>
        </ChartContainer>
      </div>
    </div>
  );
}
