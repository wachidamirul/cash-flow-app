"use client";

import { useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const DeleteAlert = ({ id, onDelete }) => {
	const { data: session } = useSession();
	const userData = session?.user;

	const handleDelete = async idDelete => {
		try {
			const url = new URL(`/api/transactions`, window.location.origin);
			url.searchParams.append("userId", userData.id);
			url.searchParams.append("id", idDelete);
			const response = await fetch(url, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			});

			if (!response.ok) {
				throw new Error("Failed to delete transaction");
			}

			await onDelete();

			toast.success("Success", {
				description: "Transaction deleted successfully"
			});
		} catch (error) {
			console.log("Error deleting transaction:", error);
			toast.error("Error", {
				description: "Failed to delete transaction"
			});
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="destructive" size="icon">
					<Trash />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your transaction from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => handleDelete(id)}>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteAlert;
