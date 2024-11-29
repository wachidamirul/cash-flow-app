import * as z from "zod";

export const formSchema = z.object({
	title: z.string().min(1, "Title is required"),
	amount: z.number().min(0.01, "Amount must be greater than 0"),
	type: z.enum(["income", "expense"]),
	date: z.date({
		required_error: "Please select a date"
	})
});
