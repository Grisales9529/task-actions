import type { ObjectId } from "mongoose";

export type TStatusType = "pending" | "in-progress" | "done";

export type TPriorityType = "low" | "medium" | "high";

export interface ITaskStatusCard {
	text: string;
	value: TStatusType;
}

export interface IStatusMap {
	pending: string;
	"in-progress": string;
	done: string;
}

export interface IPriorityMap {
	low: string;
	medium: string;
	high: string;
}

export interface ITask {
	_id?: ObjectId;
	id: string;
	title: string;
	description: string;
	status: TStatusType;
	priority: TPriorityType;
	index: number;
	time?: number;
}

export interface INewTask {
	title: string;
	description: string;
	priority: TPriorityType;
}
