import mongoose from "mongoose";

const mongoUri =
	"mongodb+srv://grisales95:HfaGCXNNcy6kJEGA@cluster-task.fgvrp.mongodb.net/tasks";

let isConnected = false;

const connectToDatabase = async () => {
	if (isConnected) return;
	try {
		await mongoose.connect(mongoUri);
		isConnected = true;
	} catch (error) {
		console.error("Failed to connect to database:", error);
		throw new Error("Failed to connect to database");
	}
};

export default connectToDatabase;
