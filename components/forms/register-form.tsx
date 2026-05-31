"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { registerScheme, RegisterInput } from "@/validators/public/auth.validator.ts";

export default function RegisterForm() {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<RegisterInput>({
		resolver: zodResolver(registerScheme),
	});

	async function onSubmit(data: RegisterInput) {
		const response = await fetch(
			"/api/auth/register",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);

		const result = await response.json();

		if (!response.ok) {
		    if (result.errors) {
		        // ValidationError — set ke masing-masing field
		        Object.entries(result.errors).forEach(([field, messages]) => {
		            setError(field as keyof RegisterInput, {
		                type: "server",
		                message: (messages as string[])[0],
		            });
		        });
		    } else if (result.error) {
		        // ConflictError / error umum — set ke root form, bukan field spesifik
		        setError("root", {
		            type: "server",
		            message: result.error,
		        });
		    }
		    return;
		}

		console.log(result);
	}

	return (
		<div className="max-w-md mx-auto mt-10">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-5"
			>
				{/* NAME */}
				<div className="space-y-2">
					<Label>Name</Label>

					<Input
						placeholder="John Doe"
						{...register("name")}
					/>

					{errors.name && (
						<p className="text-sm text-red-500">
							{errors.name.message}
						</p>
					)}
				</div>

				{/* EMAIL */}
				<div className="space-y-2">
					<Label>Email</Label>

					<Input
						type="email"
						placeholder="john@mail.com"
						{...register("email")}
					/>

					{errors.email && (
						<p className="text-sm text-red-500">
							{errors.email.message}
						</p>
					)}
				</div>

				{/* PASSWORD */}
				<div className="space-y-2">
					<Label>Password</Label>

					<Input
						type="password"
						placeholder="******"
						{...register("password")}
					/>

					{errors.password && (
						<p className="text-sm text-red-500">
							{errors.password.message}
						</p>
					)}

				</div>

				{errors.root && (
				    <p className="text-sm text-red-500 text-center">
				        {errors.root.message}
				    </p>
				)}

				<Button
					type="submit"
					className="w-full"
				>
					Register
				</Button>
			</form>
		</div>
	);
}