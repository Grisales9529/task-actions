import React from "react";
import ReactConfetti from "react-confetti";

const Confetti = () => {
	return (
		<ReactConfetti
			width={window.innerWidth - 50}
			gravity={0.3}
			numberOfPieces={100}
		/>
	);
};

export default Confetti;
