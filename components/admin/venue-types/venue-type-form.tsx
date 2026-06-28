"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleApiFormError } from "@/lib/form-error-handler";
import { createVenueType } from "@/api/venue-type.api";
import {
	venueTypeScheme,
	VenueTypeInput,
} from "@/validators/admin/venue-type.validator";

export default function VenueTypeForm() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<VenueTypeInput>({
		resolver: zodResolver(venueTypeScheme),
	});

	async function onSubmit(data: VenueTypeInput) {
		try {
			await createVenueType(data);

			reset();
			router.refresh();
		} catch (error) {
			if (axios.isAxiosError(error)) {
				handleApiFormError(error.response?.data, setError);
			}
		}
	}

	return (
		<div
			className="
				rounded-xl
				border
				bg-card
				p-6
			"
		>
			<h2
				className="
					mb-4
					text-lg
					font-semibold
					text-foreground
				"
			>
				Create Venue Type
			</h2>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-4"
			>
				<div>
					<Label className="text-foreground">
						Venue Type Name
					</Label>

					<Input
						placeholder="e.g. Futsal, Basketball"
						className="mt-1"
						{...register("name")}
					/>

					{errors.name && (
						<p className="mt-1 text-sm text-destructive">
							{errors.name.message}
						</p>
					)}
				</div>

				<Button
					type="submit"
					disabled={isSubmitting}
					className="
						bg-brand
						text-brand-foreground
						hover:bg-brand/90
					"
				>
					{isSubmitting ? "Creating..." : "Create"}
				</Button>

				{errors.root && (
					<p className="text-sm text-destructive">
						{errors.root.message}
					</p>
				)}
			</form>
		</div>
	);
}