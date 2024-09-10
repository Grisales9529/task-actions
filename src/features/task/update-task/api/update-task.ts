"use server";
import { Task } from "@/src/entities/task";
import { connectToDatabase } from "@/src/shared/api";

export const updateTaskDb = async (formData: FormData, taskId: string) => {
	await connectToDatabase();
	console.log(formData);
	try {
		const updatedTask = await Task.findByIdAndUpdate(
			taskId,
			{
				title: formData.get("title"),
				description: formData.get("description"),
				priority: formData.get("priority"),
				time: formData.get("time"),
			},
			{ new: true },
		);

		if (!updatedTask) {
			throw new Error("Task not found");
		}

		console.log("Tarea actualizada:", updatedTask);
		return JSON.stringify(updatedTask);
	} catch (error) {
		console.error("Error updating task:", error);
		throw new Error("Failed to update task");
	}
};
