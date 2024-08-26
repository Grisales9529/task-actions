import { Form } from "./components/login";

export default function Home() {
	return (
		<div className="flex items-center justify-center min-h-screen flex-col bg-gray-100">
			<h1 className="my-3 text-3xl font-bold">Bienvenido a Task! 😁</h1>
			<Form />
		</div>
	);
}
