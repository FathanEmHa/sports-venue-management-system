"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleApiFormError } from "@/lib/form-error-handler";

import { loginScheme, LoginInput } from "@/validators/public/auth.validator.ts";

export default function LoginForm() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<LoginInput>({
		resolver: zodResolver(loginScheme),
	});

	async function onSubmit(data: LoginInput) {
		const response = await fetch(
			"/api/auth/login",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		const result = await response.json();

		if (result.success) {
	        router.push("/dashboard"); // or show a success toast, etc.
	        return;
	    }

		handleApiFormError(result, setError);

		console.log(result);
	}

	return (
		<div className="max-w-md mx-auto mt-10">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-5"
			>

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
					Login
				</Button>
			</form>
		</div>
	);
}