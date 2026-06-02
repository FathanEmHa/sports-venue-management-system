import { UseFormSetError } from "react-hook-form";

export function handleApiFormError<T>(
	result: any,
	setError: UseFormSetError<T>
) {
	if (result.errors) {
		Object.entries(result.errors).forEach(
			([field, messages]) => {
				setError(field as any, {
					type: "server",
					message: (messages as string[])[0],
				});
			}
		);
		return;
	}

	if (result.message) {
		setError("root" as any, {
			type: "server",
			message: result.message,
		});
	}
}