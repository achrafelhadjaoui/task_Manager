import { StatusCodes } from "http-status-codes";
import { NotFoundError, BadRequestError } from "../../errors/index.js";
import prisma from "../../lib/db.js"; 

const userDetailsController = async (req, res) => {
  try {
    const { id } = req.user;

    if (!id) {
      throw new BadRequestError("User not authenticated");
    }

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || "Internal Server Error";

    res.status(statusCode).json({
      success: false,
      message,
    });
  }
};

export default userDetailsController;
