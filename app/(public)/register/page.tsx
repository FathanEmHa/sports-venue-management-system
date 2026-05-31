import RegisterForm from "@/components/forms/register-form";

export default function Page() {
	return (
		<main className="container mx-auto py-10">
			<h1 className="text-3xl font-bold mb-6">
				Register
			</h1>

			<RegisterForm />
		</main>
	);
}