import type { ITask, TStatusType } from "@/src/entities/task";
import { create } from "zustand";

export interface ITaskSlice {
	tasks: ITask[];

	setTasks: (tasks: ITask[]) => void;
	setNewTask: (task: ITask) => void;
	deleteTaskById: (taskId: string) => void;
	updateTask: (task: ITask) => void;
}

export const useTaskStore = create<ITaskSlice>((set) => ({
	tasks: [],

	setTasks: (tasks) => set(() => ({ tasks })),
	setNewTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),
	deleteTaskById: (taskId) =>
		set((state) => ({
			tasks: state.tasks.filter((task) => task.id !== taskId),
		})),
	updateTask: (updatedTask) =>
		set((state) => ({
			tasks: state.tasks.map((task) =>
				task.id === updatedTask.id ? updatedTask : task,
			),
		})),
}));
