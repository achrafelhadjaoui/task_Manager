import prisma from "../../lib/db.js";
import bcrypt from "bcrypt";
import { BadRequestError } from "../../errors/index.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

const userSignin = async (req, res) => { 
    try {
        const { email, password } = req.body;

        if (!email || !password) { 
            throw new BadRequestError("please fill all the fields");
        }

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new BadRequestError("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new BadRequestError("Invalid email or password");
        }

        const tokenData = {
            id: user.id,
            email: user.email,
        };

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1h' });

        const tokenOption = {
            httpOnly: true,
            secure: true
        }

        res.cookie("token", token, tokenOption,)
            .status(StatusCodes.OK).json({ success: true, message: 'User signed in successfully', token , data: user});
        
    } catch (error) {
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error.message || 'Internal Server Error';
        res.status(statusCode).json({ success: false, message });
    }
}

export default userSignin;