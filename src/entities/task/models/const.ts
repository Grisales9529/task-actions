import type { IPriorityMap, IStatusMap, ITaskStatusCard } from "./types";

export const statusCard: ITaskStatusCard[] = [
	{
		text: "Pending",
		value: "pending",
	},
	{
		text: "In progress",
		value: "in-progress",
	},
	{
		text: "Done",
		value: "done",
	},
];

export const colorStatus: IStatusMap = {
	pending: "bg-red-500",
	"in-progress": "bg-orange-500",
	done: "bg-green-500",
};

export const colorStatusTextMap: IStatusMap = {
	pending: "text-red-500",
	"in-progress": "text-orange-500",
	done: "text-green-500",
};

export const colorPriority: IPriorityMap = {
	low: "bg-green-200",
	medium: "bg-orange-100",
	high: "bg-red-100",
};

export const textColorMap: IPriorityMap = {
	low: "text-green-600",
	medium: "text-orange-500",
	high: "text-red-500",
};

export const borderColor: IStatusMap = {
	pending: "border-red-500",
	"in-progress": "border-orange-500",
	done: "border-green-500",
};
