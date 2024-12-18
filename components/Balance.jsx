"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart } from "recharts";
import { useMemo } from "react";
import { processChartData } from "@/lib/chartUtils";

const chartConfig = {
	balance: {
		label: "Balance",
		color: "hsl(var(--primary))"
	}
};

const Balance = ({ data }) => {
	const totalAmount = useMemo(() => {
		return data.reduce((acc, item) => {
			if (item.type === "income") {
				return acc + item.amount;
			}
			if (item.type === "expense") {
				return acc - item.amount;
			}
			return acc;
		}, 0);
	}, [data]);

	const chartData = useMemo(() => processChartData(data, "balance"), [data]);

	return (
		<Card className="w-full max-h-fit overflow-hidden">
			<CardHeader className="pb-2">
				<CardDescription>Total Balance</CardDescription>
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
							top: 10,
							left: 0,
							right: 0
						}}>
						<ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
						<Area
							dataKey="balance"
							type="natural"
							fill="var(--color-balance)"
							fillOpacity={0.4}
							stroke="var(--color-balance)"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default Balance;
