"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { processChartData } from "@/lib/chartUtils";
import { useMemo } from "react";
import { Area, AreaChart } from "recharts";

const chartConfig = {
	income: {
		label: "Income",
		color: "hsl(var(--chart-2))"
	}
};

const Income = ({ data }) => {
	const totalAmount = useMemo(() => {
		return data.reduce((acc, curr) => {
			if (curr.type === "income") {
				return acc + curr.amount;
			}
			return acc;
		}, 0);
	}, [data]);

	const chartData = useMemo(() => processChartData(data, "income"), [data]);

	return (
		<Card className="w-full max-h-fit overflow-hidden">
			<CardHeader className="pb-2">
				<CardDescription>Total Income</CardDescription>
				<CardTitle>
					{new Intl.NumberFormat("id-ID", {
						style: "currency",
						currency: "IDR"
					}).format(totalAmount)}
				</CardTitle>
			</CardHeader>
			<CardContent className="px-0 pb-0">
				<ChartContainer config={chartConfig} className="w-full h-20">
					<AreaChart
						accessibilityLayer
						data={chartData}
						margin={{
							top: 5,
							left: 0,
							right: 0
						}}>
						<ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
						<Area
							dataKey="income"
							type="natural"
							fill="var(--color-income)"
							fillOpacity={0.4}
							stroke="var(--color-income)"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default Income;
