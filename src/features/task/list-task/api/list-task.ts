"use server";
import { Task } from "@/src/entities/task/api/task";
import { allTaskAdapter } from "@/src/features/task/list-task/lib/adapter";
import { connectToDatabase } from "@/src/shared/api";

export const getTasks = async () => {
	await connectToDatabase();
	const tasksFromDB = await Task.find({}).exec();
	const tasks = allTaskAdapter(tasksFromDB);
	return tasks;
};
