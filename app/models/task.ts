import mongoose, { Schema } from "mongoose";

const TaskSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		status: { type: String, required: true },
		priority: { type: String, required: true },
		index: { type: Number, required: true },
		time: { type: Number },
	},
	{ collection: "all-tasks" },
);

const Task = mongoose.model("Tasks") || mongoose.model("Tasks", TaskSchema);

export default Task;
