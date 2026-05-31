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
		formState: { errors },
	} = useForm<RegisterInput>({
		resolver: zodResolver(registerScheme),
	});

	function onSubmit(data: RegisterInput) {
		console.log(data);
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