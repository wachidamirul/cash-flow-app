"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import { PencilLine } from "lucide-react";

export const FlowTable = () => {
	const [entries, setEntries] = useState([]);
	const { data: session } = useSession();
	const userData = session?.user;

	const fetchEntries = async () => {
		if (!userData?.id) return;

		try {
			const url = new URL(`/api/transactions`, window.location.origin);
			url.searchParams.append("userId", userData.id);

			const response = await fetch(url);

			if (!response.ok) {
				throw new Error("Failed to fetch transactions");
			}

			const result = await response.json();
			setEntries(result.data || []);
		} catch (error) {
			console.error("Error fetching transactions:", error);
		}
	};

	useEffect(() => {
		if (session) {
			fetchEntries();
		}
	}, [session]);

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Date</TableHead>
					<TableHead>Title</TableHead>
					<TableHead>Type</TableHead>
					<TableHead className="text-right">Amount</TableHead>
					<TableHead className="text-right">Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{entries.length > 0 ? (
					entries.map(entry => (
						<TableRow key={entry.id}>
							<TableCell>{format(new Date(entry.date * 1000), "dd-MM-yyyy HH:mm")}</TableCell>
							<TableCell>{entry.title}</TableCell>
							<TableCell>{entry.type}</TableCell>
							<TableCell className={cn("text-right", entry.type === "income" ? "text-green-600" : "text-red-600")}>
								{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(entry.amount)}
							</TableCell>
							<TableCell className="flex justify-end gap-2">
								<Button variant="destructive" size="icon">
									<Trash />
								</Button>
								<Button variant="outline" size="icon">
									<PencilLine />
								</Button>
							</TableCell>
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell colSpan={4} className="text-center">
							Transactions not found
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};
