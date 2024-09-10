"use server";
import { Task } from "@/src/entities/task";
import { connectToDatabase } from "@/src/shared/api";

export const createNewTask = async (formData: FormData, length: number) => {
	await connectToDatabase();
	try {
		const taskToAdd = new Task({
			title: formData.get("title"),
			description: formData.get("description"),
			priority: formData.get("priority"),
			status: "pending",
			time: formData.get("time"),
			index: length,
		});

		const savedTask = await taskToAdd.save();
		console.log(savedTask);
		return JSON.stringify(savedTask);
	} catch (error) {
		console.error("Error creating new task:", error);
		throw new Error("Failed to create new task");
	}
};
