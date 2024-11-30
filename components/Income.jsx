"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { useState, useEffect } from "react";
import { Area, AreaChart } from "recharts";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 73 },
  { month: "March", desktop: 186 },
  { month: "April", desktop: 214 },
  { month: "May", desktop: 309 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-2))",
  },
};

const Income = (data) => {
  const [totalAmount, setTotalAmount] = useState(0);

  const setAmount = () => {
    const resData = data.data || [];
    const total = resData.reduce((acc, curr) => {
      if (curr.type === "income") {
        return acc + curr.amount;
      }
      return acc;
    }, 0);
    setTotalAmount(total);
  };

  useEffect(() => {
    setAmount();
  }, [data]);

  return (
    <Card className="w-full max-h-fit overflow-hidden">
      <CardHeader className="pb-2">
        <CardDescription>Total Income</CardDescription>
        <CardTitle>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(totalAmount)}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <ChartContainer config={chartConfig} className="w-full h-20">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 0,
            }}
          >
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default Income;
