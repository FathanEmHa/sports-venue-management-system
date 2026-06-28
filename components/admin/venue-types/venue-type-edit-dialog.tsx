"use client";

import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleApiFormError } from "@/lib/form-error-handler";
import { updateVenueType } from "@/api/venue-type.api";
import {
	venueTypeScheme,
	VenueTypeInput,
} from "@/validators/admin/venue-type.validator";
import { VenueType } from "@/types/venue-type";

type Props = {
	venueType: VenueType | null;
	open: boolean;
	onClose: () => void;
};

export default function VenueTypeEditDialog({
	venueType,
	open,
	onClose,
}: Props) {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<VenueTypeInput>({
		resolver: zodResolver(venueTypeScheme),
	});

	// Pre-populate form when the selected venue type changes
	useEffect(() => {
		if (venueType) {
			reset({ name: venueType.name });
		}
	}, [venueType, reset]);

	async function onSubmit(data: VenueTypeInput) {
		if (!venueType) return;

		try {
			await updateVenueType(venueType.id, data);

			router.refresh();
			onClose();
		} catch (error) {
			if (axios.isAxiosError(error)) {
				handleApiFormError(error.response?.data, setError);
			}
		}
	}

	function handleOpenChange(isOpen: boolean) {
		if (!isOpen) onClose();
	}

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContent className="bg-card">
				<DialogHeader>
					<DialogTitle className="text-foreground">
						Edit Venue Type
					</DialogTitle>
				</DialogHeader>

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

					<div className="flex justify-end gap-2">
						<Button
							type="button"
							variant="outline"
							onClick={onClose}
						>
							Cancel
						</Button>

						<Button
							type="submit"
							disabled={isSubmitting}
							className="
								bg-brand
								text-brand-foreground
								hover:bg-brand/90
							"
						>
							{isSubmitting ? "Saving..." : "Save Changes"}
						</Button>
					</div>

					{errors.root && (
						<p className="text-sm text-destructive">
							{errors.root.message}
						</p>
					)}
				</form>
			</DialogContent>
		</Dialog>
	);
}
