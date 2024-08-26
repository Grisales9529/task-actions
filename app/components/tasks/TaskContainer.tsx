"use client";
import { updateTaskStatusDb } from "@/app/actions";
import { statusCard } from "@/app/const";
import type { TStatusType } from "@/app/interfaces";
import { useTaskStore } from "@/app/store/tasks";
import { playSound } from "@/app/utils/playSound";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import React, { useState } from "react";
import { toast } from "sonner";
import Confetti from "../common/Confetti"; // Asegúrate de tener un componente de confetti adecuado
import StatusContainerTasks from "./StatusContainerTasks";

const TaskContainer = () => {
	const { setTasks, tasks } = useTaskStore((state) => ({
		setTasks: state.setTasks,
		tasks: state.tasks,
	}));
	const [showConfetti, setShowConfetti] = useState(false);

	const onDragEnd = async (result: DropResult) => {
		const { draggableId, destination, source } = result;

		if (destination && source) {
			const status = destination.droppableId as TStatusType;
			const items = Array.from(tasks);
			const updateItems = items.map((item) =>
				item.id === draggableId
					? { ...item, status: status, index: destination.index }
					: item,
			);

			setTasks(updateItems);

			await updateTaskStatusDb(draggableId, status, destination.index);
			if (destination.droppableId !== source.droppableId) {
				if (status === "done") {
					setShowConfetti(true);
					toast.success("Felicidades, haz completado una tarea 🥳🥳🥳");
					playSound("/sounds/celebration.mp3");
					setTimeout(() => setShowConfetti(false), 4000);
				}
			}

			return;
		}
	};

	return (
		<div className=" grid lg:grid-cols-3 gap-3 mt-10 w-full">
			<DragDropContext onDragEnd={onDragEnd}>
				{statusCard.map((status) => (
					<StatusContainerTasks key={status.value} data={status} />
				))}
			</DragDropContext>
			{showConfetti && <Confetti />}
		</div>
	);
};

export default TaskContainer;
