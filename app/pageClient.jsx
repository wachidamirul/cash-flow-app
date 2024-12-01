"use client";

import { useState, useEffect } from "react";
import Balance from "@/components/Balance";
import { AddTransaction } from "@/components/cashflow/AddTransaction";
import { FlowTable } from "@/components/cashflow/FlowTable";
import Expenses from "@/components/Expenses";
import Income from "@/components/Income";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import { WelcomeBanner } from "@/components/WelcomeBanner";

const PageClient = () => {
	const { data: session } = useSession();
	const userData = session?.user;

	const [transactions, setTransactions] = useState([]);
	const [dataFetched, setDataFetched] = useState(false);

	const fetchTransactions = async () => {
		if (!userData?.id || dataFetched) return;

		try {
			const url = new URL(`/api/transactions`, window.location.origin);
			url.searchParams.append("userId", userData.id);
			const response = await fetch(url);

			if (!response.ok) {
				toast.error("Error", {
					description: "Failed to fetch transactions. Please try again."
				});
			}

			const result = await response.json();
			setTransactions(result.data || []);
			setDataFetched(true);
		} catch (error) {
			console.error("Error fetching transactions:", error);
			toast.error("Error", {
				description: "Failed to fetch transactions. Please try again."
			});
		}
	};

	const handleOnChange = async () => {
		try {
			setDataFetched(false);
			await fetchTransactions();
		} catch (error) {
			console.error("Error fetching transactions:", error);
			toast.error("Error", {
				description: "Failed to fetch transactions. Please try again."
			});
		}
	};

	useEffect(() => {
		if (session && !dataFetched) {
			fetchTransactions();
		}
	}, [session, dataFetched]);

	return (
		<div className="relative">
			<div className="container mx-auto">
				<div className="my-24 mx-8 space-y-12">
					<WelcomeBanner name={userData?.name} />
					<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
						<Balance data={transactions} />
						<Income data={transactions} />
						<Expenses data={transactions} />
					</div>
					<div className="space-y-6">
						<div className="flex items-center justify-end">
							<AddTransaction onAdd={handleOnChange} />
						</div>

						<Card>
							<CardContent className="pt-6">
								<FlowTable data={transactions} onRefresh={handleOnChange} />
							</CardContent>
						</Card>
					</div>
				</div>
			</div>

			<div className="fixed top-4 right-4">
				<Button onClick={() => signOut()} variant="destructive" size="icon" className="rounded-full">
					<LogOut />
				</Button>
			</div>
		</div>
	);
};

export default PageClient;
