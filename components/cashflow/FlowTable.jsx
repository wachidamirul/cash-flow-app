"use client";

import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import DeleteAlert from "./DeleteAlert";
import EditTransaction from "./EditTransaction";

export const FlowTable = ({ data, onRefresh }) => {
	return (
		<Table>
			<TableHeader className="border-b bg-primary/10">
				<TableRow>
					<TableHead className="font-bold">Date</TableHead>
					<TableHead className="font-bold">Title</TableHead>
					<TableHead className="font-bold">Type</TableHead>
					<TableHead className="font-bold text-right">Amount</TableHead>
					<TableHead className="font-bold text-right">Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.length > 0 ? (
					data.map(entry => (
						<TableRow key={entry.id}>
							<TableCell>{format(new Date(entry.date * 1000), "dd MMM yyyy, HH:mm")}</TableCell>
							<TableCell>{entry.title}</TableCell>
							<TableCell>{entry.type}</TableCell>
							<TableCell className={cn("text-right", entry.type === "income" ? "text-green-600" : "text-red-600")}>
								{new Intl.NumberFormat("id-ID", {
									style: "currency",
									currency: "IDR"
								}).format(entry.amount)}
							</TableCell>
							<TableCell className="flex justify-end gap-2">
								<DeleteAlert data={entry} onDelete={onRefresh} />
								<EditTransaction data={entry} onEdit={onRefresh} />
							</TableCell>
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell colSpan={5} className="text-center">
							Transactions not found
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};
