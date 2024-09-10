"use server";
import { Task } from "@/src/entities/task";
import { connectToDatabase } from "@/src/shared/api";

export const deleteTaskDbById = async (taskId: string) => {
	await connectToDatabase();
	try {
		const deletedTask = await Task.findByIdAndDelete(taskId);
		if (!deletedTask) {
			throw new Error("Task not found");
		}
		console.log("Task deleted:", deletedTask);
		return JSON.stringify(deletedTask);
	} catch (error) {
		console.error("Error deleting task:", error);
		throw new Error("Failed to delete task");
	}
};
