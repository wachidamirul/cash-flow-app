"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { processChartData } from "@/lib/chartUtils";
import { useState, useEffect } from "react";
import { Area, AreaChart } from "recharts";

const chartConfig = {
	expense: {
		label: "Expense",
		color: "hsl(var(--chart-1))"
	}
};

const Expenses = data => {
	const resData = data.data || [];
	const [totalAmount, setTotalAmount] = useState(0);
	const [chartData, setChartData] = useState([]);

	const setAmount = data => {
		const total = data.reduce((acc, curr) => {
			if (curr.type === "expense") {
				return acc + curr.amount;
			}
			return acc;
		}, 0);
		setTotalAmount(total);
	};

	useEffect(() => {
		setAmount(resData);
		const processedData = processChartData(resData, "expense");
		setChartData(processedData);
	}, [resData]);

	return (
		<Card className="w-full max-h-fit overflow-hidden">
			<CardHeader className="pb-2">
				<CardDescription>Total Expenses</CardDescription>
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
							dataKey="expense"
							type="natural"
							fill="var(--color-expense)"
							fillOpacity={0.4}
							stroke="var(--color-expense)"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default Expenses;
