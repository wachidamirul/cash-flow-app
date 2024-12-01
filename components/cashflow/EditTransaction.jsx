"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, getUnixTime } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { formSchema } from "@/lib/schemas/formSchema";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { PencilLine } from "lucide-react";

const EditTransaction = ({ data, onEdit }) => {
	const { data: session } = useSession();
	const userData = session?.user;
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const formDefaultValues = {
		title: data.title,
		amount: data.amount,
		type: data.type,
		date: new Date(data.date * 1000)
	};

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: formDefaultValues
	});

	useEffect(() => {
		if (isOpen) {
			form.reset(formDefaultValues);
		}
	}, [isOpen, form, formDefaultValues]);

	const onSubmit = async values => {
		setIsSubmitting(true);
		try {
			const updatedValues = {
				...values,
				date: getUnixTime(values.date),
				userId: userData.id
			};

			const url = new URL(`/api/transactions`, window.location.origin);
			url.searchParams.append("id", data.id);
			url.searchParams.append("userId", userData.id);

			const response = await fetch(url, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(updatedValues)
			});

			if (response.ok) {
				await onEdit();
				toast.success("Success", { description: "Cash flow updated successfully" });
				form.reset(formDefaultValues);
				setIsOpen(false);
			} else {
				throw new Error("Failed to update cash flow");
			}
		} catch (error) {
			console.error("Failed to update cash flow:", error);
			toast.error("Error", { description: "Failed to update cash flow" });
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<PencilLine />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit Cash Flow</DialogTitle>
					<DialogDescription>Enter the details for your new cash flow here.</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder="Enter title" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Amount</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="Enter amount"
											{...field}
											onChange={e => field.onChange(parseFloat(e.target.value))}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Type</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select type" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="income">Income</SelectItem>
											<SelectItem value="expense">Expense</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Date</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button variant="outline" className="w-full pl-3 text-left font-normal hover:bg-transparent">
													{field.value && format(field.value, "dd MMM yyyy")}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={date => {
													if (!date) return;
													const currentDateTime = new Date();
													const updatedDate = new Date(
														date.getFullYear(),
														date.getMonth(),
														date.getDate(),
														currentDateTime.getHours(),
														currentDateTime.getMinutes(),
														currentDateTime.getSeconds()
													);
													field.onChange(updatedDate);
												}}
												disabled={date => date > new Date() || date < new Date("1900-01-01")}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type="submit" disabled={isSubmitting}>
								{isSubmitting ? "Submitting..." : "Submit"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default EditTransaction;
