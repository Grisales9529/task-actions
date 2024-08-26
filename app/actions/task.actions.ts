"use server";
import { allTaskAdapter } from "../adapters";
import connectToDatabase from "../lib/mongoose";
import Task from "../models/task";

export const getTasks = async () => {
	await connectToDatabase();
	const tasksFromDB = await Task.find({}).exec();
	const tasks = allTaskAdapter(tasksFromDB);
	return tasks;
};

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
