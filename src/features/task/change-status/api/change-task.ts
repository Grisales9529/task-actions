"use server";
import { Task } from "@/src/entities/task";
import { connectToDatabase } from "@/src/shared/api";

export const updateTaskStatusDb = async (
	taskId: string,
	status: string,
	index: number,
) => {
	await connectToDatabase();
	try {
		const updatedTask = await Task.findByIdAndUpdate(
			taskId,
			{ status, index },
			{ new: true },
		).exec();

		if (!updatedTask) {
			throw new Error("Task not found");
		}

		return JSON.stringify(updatedTask);
	} catch (error) {
		console.error("Error updating task status:", error);
		throw new Error("Failed to update task status");
	}
};
