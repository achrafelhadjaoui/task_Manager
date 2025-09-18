import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { UnauthorizedError, ForbiddenError } from "../errors/index.js";

const authToken = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      throw new UnauthorizedError("Access token is missing");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("Error in token verification:", err);
        throw new ForbiddenError("Invalid or expired token");
      }

      req.user = {
        id: decoded?.id,
        email: decoded?.email,
      };

      next();
    });
  } catch (error) {
    const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || "Internal Server Error";
    res.status(statusCode).json({ success: false, message });
  }
};

export default authToken;
