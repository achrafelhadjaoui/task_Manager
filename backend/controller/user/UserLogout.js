import { StatusCodes } from "http-status-codes";

async function userLogoutController(req, res) {
    try {
        res.clearCookie("token")

        res.status(StatusCodes.OK).json({
            message: "Logged out succefully",
            success: true,
            data: []
        })
    } catch (error) {
        const status = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error.message || "Internal Server Error";
        res.status(status).json({
            message,
            success: false,
        })
    }
}

export default userLogoutController;