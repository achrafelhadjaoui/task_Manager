import prisma from "../../lib/db.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError, BadRequestError } from "../../errors/index.js";

async function getTasksController(req, res) {
  try {
    const userId = req.user.id;

    if (!userId) {
      throw new BadRequestError("User not authenticated");
    }

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Fetch all tasks for this user
    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Tasks fetched successfully",
      tasks,
    });
  } catch (error) {
    const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || "Internal Server Error";
    res.status(statusCode).json({ success: false, message });
  }
}

export default getTasksController;
