"use client";
import { getTasks } from "@/app/actions";
import { borderColor, colorStatus, colorStatusTextMap } from "@/app/const";
import type { IStatusMap, ITaskStatusCard } from "@/app/interfaces";
import { useTaskStore } from "@/app/store/tasks";
import { Droppable } from "@hello-pangea/dnd";
import React, { useEffect } from "react";
import CardTask from "./CardTask";

interface IProps {
	data: ITaskStatusCard;
}

const StatusContainerTasks = ({ data }: IProps) => {
	const { tasks, setTasks } = useTaskStore((state) => ({
		tasks: state.tasks,
		setTasks: state.setTasks,
	}));

	const getAllTasks = async () => {
		const tasksDb = await getTasks();
		setTasks(tasksDb);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getAllTasks();
	}, []);

	const { text, value } = data;
	const bgColor = colorStatus[value];

	const filteredTask = tasks
		?.filter((task) => task.status === value)
		.sort((a, b) => a.index - b.index);
	const totalStatusTask = filteredTask.length;
	return (
		<Droppable droppableId={value}>
			{(droppableProvided, droppableSnapshot) => (
				<div
					className={`flex flex-col w-full h-[100vh] bg-gray-50 p-3 rounded-lg  ${droppableSnapshot.isDraggingOver ? `  border-2 ${borderColor[value]} ` : ""}`}
					{...droppableProvided.droppableProps}
					ref={droppableProvided.innerRef}
				>
					<div className="flex">
						<div
							className={`w-full ${bgColor} rounded-lg flex items-center p-2 mb-1`}
						>
							<h2 className="flex-1 font-semibold text-white">{text}</h2>
							<p
								className={`mr-1 rounded-full w-5 h-5 flex items-center justify-center bg-white ${colorStatusTextMap[value]} font-semibold`}
							>
								{totalStatusTask}
							</p>
						</div>
					</div>

					{filteredTask.map((task, index: number) => (
						<CardTask key={task.id} task={task} index={index} />
					))}
					{droppableProvided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

export default StatusContainerTasks;
