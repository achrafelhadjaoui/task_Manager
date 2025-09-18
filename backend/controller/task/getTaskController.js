import { NotFoundError, ForbiddenError, BadRequestError } from "../../errors/index.js";
import prisma from "../../lib/db.js";
import { StatusCodes } from "http-status-codes";

async function getTaskController(req, res) {
  try {
    const { id } = req.params; // Task ID from params
    const userId = req.user?.id; // Extracted from auth middleware

    if (!userId) {
      throw new BadRequestError("User not authenticated");
    }

    // Verify that the user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Fetch task by id
    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    });

    if (!task) {
      throw new NotFoundError("Task not found");
    }

    // Ensure that the task belongs to the logged-in user
    if (task.userId !== userId) {
      throw new ForbiddenError("You are not allowed to view this task");
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Task fetched successfully",
      task,
    });
  } catch (error) {
    console.error("Error fetching task:", error);
    const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || "Internal Server Error";
    res.status(statusCode).json({ success: false, message });
  }
}

export default getTaskController;
