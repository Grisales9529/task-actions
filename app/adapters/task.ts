import type { ITask } from "../interfaces";

const adaptTaskProperties = (task: ITask): ITask => ({
	id: task._id ? task._id.toString() : "",
	title: task.title,
	description: task.description,
	status: task.status,
	priority: task.priority,
	index: task.index,
	time: task.time,
});

export const allTaskAdapter = (tasks: ITask[]): ITask[] =>
	tasks.map(adaptTaskProperties);

export const taskAdapter = (task: ITask): ITask => adaptTaskProperties(task);
