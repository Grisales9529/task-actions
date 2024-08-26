"use client";
import { useTaskStore } from "@/app/store/tasks";
import React from "react";

const TotalTask = () => {
	const { tasks } = useTaskStore((state) => ({
		tasks: state.tasks,
	}));

	const totalTime = tasks.reduce((sum, task) => {
		const time = task.time ? task.time : 0;
		return sum + time;
	}, 0);
	return (
		<div>
			<p> Tareas totales : {tasks.length}</p>
			<p>Tiempo total: {totalTime} hrs</p>
		</div>
	);
};

export default TotalTask;
