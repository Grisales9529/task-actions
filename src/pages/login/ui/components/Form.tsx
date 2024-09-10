"use client";
import { useRouter } from "next/navigation";
import React from "react";

export const Form = () => {
	const router = useRouter();

	const goTask = () => {
		router.push("/tasks");
	};
	return (
		<div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
			<h2 className="text-2xl font-bold text-center text-gray-800">
				Iniciar Sesión
			</h2>
			<form className="space-y-4">
				<div>
					<label className="block mb-2 text-sm font-medium text-gray-600">
						Correo Electrónico
					</label>
					<input
						type="email"
						className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
						placeholder="ejemplo@correo.com"
					/>
				</div>
				<div>
					<label className="block mb-2 text-sm font-medium text-gray-600">
						Contraseña
					</label>
					<input
						type="password"
						className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
						placeholder="********"
					/>
				</div>
				<button
					type="button"
					className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
					onClick={goTask}
				>
					Iniciar Sesión
				</button>
			</form>
			<p className="text-sm text-center text-gray-600">
				¿No tienes una cuenta?{" "}
				<a href="/tasks" className="text-blue-500 hover:underline">
					Regístrate
				</a>
			</p>
		</div>
	);
};
