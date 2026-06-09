"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleApiFormError } from "@/lib/form-error-handler";

import { venueTypeScheme, VenueTypeInput } from "@/validators/public/venue-type-validator";

export default function VenueTypeForm() {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
		reset,
	} = useForm<VenueTypeInput>({
		resolver: zodResolver(venueTypeScheme),
	});

	async function onSubmit(
		data: VenueTypeInput
	) {
		const response = await fetch(
			"/api/venues/venue-types",
			{
				method: "POST",
				headers: {
					"Content-Type":
						"application/json",
				},
				body: JSON.stringify(data),
			}
		);

		const result =
			await response.json();

		handleApiFormError(result, setError);

		console.log(result);

		if (response.ok) {
			reset();
		}
	}

	return (
		<form
			onSubmit={handleSubmit(
				onSubmit
			)}
			className="space-y-4"
		>
			<div>
				<Label>
					Venue Type Name
				</Label>

				<Input
					placeholder="Futsal"
					{...register(
						"name"
					)}
				/>

				{errors.name && (
					<p className="text-sm text-red-500">
						{errors.name.message}
					</p>
				)}
			</div>

			<Button type="submit">
				Create
			</Button>

			{errors.root && (
				<p className="text-sm text-red-500">
					{errors.root.message}
				</p>
			)}
		</form>
	);
}