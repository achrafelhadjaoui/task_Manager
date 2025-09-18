import { StatusCodes } from "http-status-codes";
import prisma from "../../lib/db.js";
import bcrypt from "bcrypt";
import { BadRequestError } from "../../errors/index.js";

const userSignup = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) { 
            throw new BadRequestError("please fill all the fields");
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new BadRequestError("User already exists with this email");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if (!hashedPassword) {
            throw new BadRequestError("Error occurred while creating user");
        }

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                email,
                password : hashedPassword,
                name,
            },
        });

        res.status(StatusCodes.CREATED).json({ success: true, message: 'User created successfully', userId: newUser.id });
        
    } catch (error) {
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error.message || 'Internal Server Error';
        res.status(statusCode).json({ success: false, message });
    }
}

export default userSignup;