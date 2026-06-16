"use client";

import api from "@/lib/axios";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleApiFormError } from "@/lib/form-error-handler";
import { venueType } from "@/api/venue-type.api";
import { venueTypeScheme, VenueTypeInput } from "@/validators/admin/venue-type.validator";

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
		try {

			const result =
				await venueType(data);

			reset();
		} catch (error) {
			if (
				axios.isAxiosError(
					error
				)
			) {
				handleApiFormError(
					error.response
						?.data,
					setError
				);
			}
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