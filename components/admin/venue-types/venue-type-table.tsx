import { Button } from "@/components/ui/button";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { VenueType } from "@/types/venue-type";

type Props = {
	data: VenueType[];
};

export default function VenueTypeTable({
	data,
}: Props) {
	return (
		<div
			className="
				overflow-hidden
				rounded-xl
				border
				bg-card
			"
		>
			<div
				className="
					border-b
					p-4
				"
			>
				<h2
					className="
						text-lg
						font-semibold
					"
				>
					Venue Types
				</h2>

				<p
					className="
						text-sm
						text-muted-foreground
					"
				>
					List of available venue categories
				</p>
			</div>

			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>
								ID
							</TableHead>

							<TableHead>
								Name
							</TableHead>

							<TableHead className="text-right">
								Actions
							</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{data.length ===
						0 ? (
							<TableRow>
								<TableCell
									colSpan={
										3
									}
									className="
										text-center
										text-muted-foreground
										py-8
									"
								>
									No
									venue
									types
									found
								</TableCell>
							</TableRow>
						) : (
							data.map(
								(
									item
								) => (
									<TableRow
										key={
											item.id
										}
									>
										<TableCell>
											{
												item.id
											}
										</TableCell>

										<TableCell>
											{
												item.name
											}
										</TableCell>

										<TableCell className="text-right">
											<div className="flex justify-end gap-2">
												<Button
													size="sm"
													className="
														bg-brand
														text-brand-foreground
														hover:bg-brand/90
													"
												>
													Edit
												</Button>

												<Button
													size="sm"
													variant="destructive"
												>
													Delete
												</Button>
											</div>
										</TableCell>
									</TableRow>
								)
							)
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}