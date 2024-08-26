import { getTasks } from "@/app/actions";

export const GET = async (req: Request) => {
	const allTask = await getTasks();
	return Response.json(allTask);
};
