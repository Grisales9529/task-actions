import { borderColor, colorPriority, textColorMap } from "@/src/entities/task";
import type { ITask } from "@/src/entities/task";
import { deleteTaskDbById } from "@/src/features/task/delete-task";
import { useTaskStore } from "@/src/shared/api";
import { Draggable } from "@hello-pangea/dnd";
import React, { useState } from "react";
import { toast } from "sonner";
import ModalTask from "./ModalTask";

interface IProps {
	task: ITask;
	index: number;
}

const CardTask = ({ task, index }: IProps) => {
	const { title, description, priority, status, time } = task;
	const [isOpenModal, setIsOpenModal] = useState(false);
	const { deleteTaskById } = useTaskStore((state) => ({
		deleteTaskById: state.deleteTaskById,
	}));

	const mapPriorityText = {
		low: "Low 😁 ",
		medium: "Medium 😐",
		high: "High 😱",
	};

	const handleDeleteTask = async (taskId: string) => {
		try {
			await deleteTaskDbById(taskId);
			deleteTaskById(taskId);
			toast.success("Tarea eliminada con éxito");
		} catch (error) {
			return error;
		}
	};

	const closeModal = () => {
		setIsOpenModal(false);
	};

	const bgPriority = colorPriority[priority];
	return (
		<>
			{isOpenModal && <ModalTask onCloseModal={closeModal} taskToEdit={task} />}
			<Draggable draggableId={task.id} index={index}>
				{(draggableProvided, draggableSnapshot) => (
					<div
						className={`w-full p-4 bg-white rounded-lg shadow-md border-2 ${borderColor[status]} my-2 cursor-grab`}
						ref={draggableProvided.innerRef}
						{...draggableProvided.draggableProps}
						{...draggableProvided.dragHandleProps}
					>
						<div className="flex items-center">
							<h2 className="text-xl font-semibold mb-2 flex-1">{title}</h2>
							<button
								type="button"
								className="mb-4 text-md mr-2"
								onClick={() => setIsOpenModal(true)}
							>
								✏️
							</button>
							<button
								type="button"
								className="mb-4 text-md"
								onClick={() => handleDeleteTask(task.id)}
							>
								🗑️
							</button>
						</div>
						<p className="text-gray-600 mb-2">{description}</p>

						<div className="flex items-center">
							<div className="flex-1">
								<span
									className={`px-2 py-1 rounded-md font-semibold ${bgPriority} ${textColorMap[priority]}`}
								>
									{mapPriorityText[priority]}
								</span>
							</div>
							{time && <p className="text-end font-semibold">{time} hrs</p>}
						</div>
					</div>
				)}
			</Draggable>
		</>
	);
};

export default CardTask;
