// controller/task/createTaskController.js
import prisma from "../../lib/db.js";
import { BadRequestError, UnauthorizedError } from "../../errors/index.js";

async function createTaskController(req, res) {
  try {
    const { title, description, status } = req.body;
    const userId = req.user; // from middleware

    if (!title || !description || !status) {
      throw new BadRequestError("Please fill all the fields");
    }

    if (!userId) {
      throw new UnauthorizedError("User not authenticated");
    }

    // ✅ Verify user exists in DB
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedError("User does not exist");
    }

    // ✅ Create task
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        userId,
      },
    });

    res
      .status(201)
      .json({
        success: true,
        message: "Task created successfully",
        task: newTask,
      });
  } catch (error) {
    console.error("Error creating task:", error);
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    res.status(statusCode).json({ success: false, message });
  }
}

export default createTaskController;
