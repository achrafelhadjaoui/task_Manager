import { NotFoundError, ForbiddenError, BadRequestError } from "../../errors/index.js";
import prisma from "../../lib/db.js";
import { StatusCodes } from "http-status-codes";

async function deleteTaskController(req, res) {
  try {
    const { id } = req.params; // Task ID
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
    const task = await prisma.task.findUnique({ where: { id: Number(id) } });
    if (!task) {
      throw new NotFoundError("Task not found");
    }

    // Ensure that the task belongs to the logged-in user
    if (task.userId !== userId) {
      throw new ForbiddenError("You are not allowed to delete this task");
    }

    // Delete the task
    await prisma.task.delete({ where: { id: Number(id) } });

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || "Internal Server Error";
    res.status(statusCode).json({ success: false, message });
  }
}

export default deleteTaskController;
