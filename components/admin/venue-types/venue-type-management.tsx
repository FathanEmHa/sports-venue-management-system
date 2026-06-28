"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import VenueTypeForm from "./venue-type-form";
import VenueTypeTable from "./venue-type-table";
import VenueTypeEditDialog from "./venue-type-edit-dialog";
import { deleteVenueType } from "@/api/venue-type.api";
import { VenueType } from "@/types/venue-type";

type Props = {
	data: VenueType[];
};

export default function VenueTypeManagement({ data }: Props) {
	const router = useRouter();

	const [editTarget, setEditTarget] = useState<VenueType | null>(null);
	const [isEditOpen, setIsEditOpen] = useState(false);

	function handleEdit(item: VenueType) {
		setEditTarget(item);
		setIsEditOpen(true);
	}

	function handleEditClose() {
		setIsEditOpen(false);
		setEditTarget(null);
	}

	async function handleDelete(id: number) {
		const confirmed = window.confirm(
			"Are you sure you want to delete this venue type?"
		);

		if (!confirmed) return;

		try {
			await deleteVenueType(id);

			router.refresh();
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const message =
					error.response?.data?.message ?? "Failed to delete venue type";
				alert(message);
			}
		}
	}

	return (
		<div className="space-y-6">
			<VenueTypeForm />

			<VenueTypeTable
				data={data}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>

			<VenueTypeEditDialog
				venueType={editTarget}
				open={isEditOpen}
				onClose={handleEditClose}
			/>
		</div>
	);
}