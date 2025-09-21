import { NotFoundError, ForbiddenError, BadRequestError } from "../../errors/index.js";
import prisma from "../../lib/db.js";
import { StatusCodes } from "http-status-codes";

async function updateTaskController(req, res) {
  try {
    const { id } = req.params; // Task ID
    const { title, description, status } = req.body;
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
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundError("Task not found");
    }

    // Ensure that the task belongs to the logged-in user
    if (task.userId !== userId) {
      throw new ForbiddenError("You are not allowed to update this task");
    }

    
    // Update the task
    const updatedTask = await prisma.task.update({
      where: { id},
      data: {
        title: title || task.title,
        description: description || task.description,
        status: status || task.status,
      },
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || "Internal Server Error";
    res.status(statusCode).json({ success: false, message });
  }
}

export default updateTaskController;
