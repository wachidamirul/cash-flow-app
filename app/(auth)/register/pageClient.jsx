"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/lib/schemas/auth";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

const RegisterPageClient = () => {
	const { push } = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: ""
		}
	});

	const onSubmit = async values => {
		setLoading(true);

		const res = await fetch("/api/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(values)
		});

		if (res.status === 200) {
			await signIn("credentials", {
				redirect: false,
				email: values.email,
				password: values.password
			});
			setLoading(false);
			toast.success("Register Success");
			push("/");
		} else {
			toast.error("Register Failed");
			setLoading(false);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full Name</FormLabel>
							<FormControl>
								<Input placeholder="Enter your full name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="Enter your email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<div className="relative">
									<Input type={showPassword ? "text" : "password"} placeholder="Create a password" {...field} />
									<Button
										type="button"
										variant="ghost"
										size="sm"
										className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
										onClick={() => setShowPassword(!showPassword)}>
										{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
									</Button>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full" disabled={isLoading}>
					{isLoading ? <LoaderCircle className="animate-spin" /> : "Create account"}
				</Button>
			</form>
		</Form>
	);
};

export default RegisterPageClient;
