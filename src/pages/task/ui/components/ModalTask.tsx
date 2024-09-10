import type { ITask } from "@/src/entities/task";
import { createNewTask } from "@/src/features/task/create-task";
import { taskAdapter } from "@/src/features/task/list-task";
import { updateTaskDb } from "@/src/features/task/update-task";
import { useTaskStore } from "@/src/shared/api";
import React, { useState } from "react";
import { toast } from "sonner";

interface IProps {
	onCloseModal: () => void;
	taskToEdit?: ITask;
}

const ModalTask = ({ onCloseModal, taskToEdit }: IProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const { setNewTask, updateTask, tasks } = useTaskStore((state) => ({
		setNewTask: state.setNewTask,
		updateTask: state.updateTask,
		tasks: state.tasks,
	}));

	const taskLength = tasks.length;

	const onSubmit = async (formData: FormData) => {
		setIsLoading(true);
		try {
			let data: string;
			if (taskToEdit) {
				data = await updateTaskDb(formData, taskToEdit.id);
			} else {
				data = await createNewTask(formData, taskLength);
			}

			const formatData = taskAdapter(JSON.parse(data));
			if (taskToEdit) {
				updateTask(formatData);
				toast.success("Tarea actualizada 🥳");
			} else {
				setNewTask(formatData);
				toast.success("Tarea agregada 🥳");
			}
		} catch (error) {
			console.error("Error en la operación de tarea:", error);
			toast.error("Error al procesar la tarea");
		} finally {
			setIsLoading(false);
			onCloseModal();
		}
	};

	return (
		<div
			id="modal"
			className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur flex items-center justify-center"
		>
			<div className="bg-white rounded-lg shadow-lg p-6 md:w-3/12 mx-auto">
				<h2 className="text-xl font-semibold mb-4 text-center">
					{taskToEdit ? "Editar Tarea" : "Añadir Nueva Tarea"}
				</h2>
				<form className="space-y-4 text-start" action={onSubmit}>
					<div>
						<label className="block text-sm font-medium text-gray-700 ">
							Título
						</label>
						<input
							type="text"
							name="title"
							defaultValue={taskToEdit?.title || ""}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							placeholder="Título de la tarea"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 ">
							Horas de trabajo
						</label>
						<input
							type="number"
							name="time"
							defaultValue={taskToEdit?.time || ""}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							placeholder="Título de la tarea"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">
							Prioridad
						</label>
						<select
							name="priority"
							defaultValue={taskToEdit?.priority || "low"}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						>
							<option value="low">Baja</option>
							<option value="medium">Media</option>
							<option value="high">Alta</option>
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 ">
							Descripción
						</label>
						<textarea
							name="description"
							defaultValue={taskToEdit?.description || ""}
							rows={4}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							placeholder="Descripción de la tarea"
						/>
					</div>

					<div className="flex justify-center space-x-4">
						<button
							type="button"
							id="close-modal"
							className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
							onClick={onCloseModal}
						>
							Cancelar
						</button>
						<button
							type="submit"
							className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-blue-300"
							disabled={isLoading}
						>
							{isLoading ? "Cargando..." : "Guardar"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ModalTask;
