"use client";
import React, { useState } from "react";
import ModalTask from "./ModalTask";

const NewTask = () => {
	const [isOpenModal, setIsOpenModal] = useState(false);

	const closeModal = () => {
		setIsOpenModal(false);
	};

	const openModal = () => {
		setIsOpenModal(true);
	};

	return (
		<div className="text-end flex-1">
			{isOpenModal && <ModalTask onCloseModal={closeModal} />}
			<button
				className="bg-blue-500 p-2 text-white rounded-lg my-2 h-12 lg:w-1/12"
				type="button"
				onClick={openModal}
			>
				New +
			</button>
		</div>
	);
};

export default NewTask;
