"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Area, AreaChart } from "recharts";
import { useState, useEffect } from "react";

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
    color: "hsl(var(--primary))",
  },
};

const Balance = (data) => {
  const [totalAmount, setTotalAmount] = useState(0);

  const setAmount = () => {
    const resData = data.data || [];
    const total = resData.reduce((acc, item) => {
      if (item.type === "income") {
        return acc + item.amount;
      }
      if (item.type === "expense") {
        return acc - item.amount;
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
        <CardDescription>Total Balance</CardDescription>
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

export default Balance;
