import LoginForm from "@/components/forms/login-form";

export default function Page() {
	return (
		<main className="container mx-auto py-10">
			<h1 className="text-3xl font-bold mb-6">
				Login
			</h1>

			<LoginForm />
		</main>
	);
}