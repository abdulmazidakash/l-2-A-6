import { Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const result = await authService.signInUser(email, password);
        res.status(201).json({
            success: true,
            message: "Login successful",
            data: result,
        });
    } catch (error: any) {
        res.status(401).json({
            success: false,
            message: "Login failed",
            error: error?.message,
        });
    }
};

const createUser = async (req: Request, res: Response) => {
    const { name, email, password, phone, role } = req.body;
    try {
        if (!name || !email || !password || !phone || !role) {
            res.status(400).json({
                message: "All Fields required ",
            });
        }
        const result = await authService.createUser(req.body);

        console.log({ result: result });
        if (result.rowCount === 0) {
            return res.status(401).json({
                message: "User already exists",
            });
        }
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result?.rows[0],
        });

    } catch (error: any) {
        if (error.code === "23505") {
            res.status(401).json({
                error: error.detail,
                message: "Another email Try, this account already exists.",
            });
        }
        res.status(401).json({
            success: false,
            message: "User not created successfully",
            error: error?.message,
        });
    }
};

export const authController = { loginUser, createUser };
