import { Request, Response } from "express";
import { userService } from "./user.service";
import { JwtPayload } from "jsonwebtoken";

const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUser();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows,
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "failed all user data",
        });
    };
};

const updateUser = async (req: Request, res: Response) => {
    try {
        const loggedInUser = req.user;
        const { userId } = req.params;
        //  customer update only own profile

        if (
            (loggedInUser as JwtPayload).role === "customer" &&
            String((loggedInUser as JwtPayload).id) !== userId
        ) {
            return res.status(403).json({
                success: false,
                message: "You can not see  other user details",
            });
        }
        // prevent role update to customer
        if ((loggedInUser as JwtPayload).role !== "admin") {
            delete req.body.role;
        }

        if (isNaN(Number(userId))) {
            res.status(400).json({
                message: "please provide a valid user id",
            });
        };

        const singleUserUpdate = await userService.updateUser(
            req.body,
            userId as string
        );
        if (singleUserUpdate.rowCount === 0) {
            res.status(404).json({
                message: "user not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: singleUserUpdate.rows[0],
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Not found user",
            error: error?.message,
        });
    }
};

const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if (isNaN(Number(userId))) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid user ID",
            });
        }

        // 1. Check if user exists
        const user = await userService.getUserById(userId as string);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // 2. Check if user has active bookings
        const activeBookings = await userService.getActiveBookingByUser(
            userId as string
        );

        if (activeBookings.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Cannot delete user with active bookings",
            });
        }

        // 3. Delete user
        await userService.deleteUser(userId as string);

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    };
};

export const userController = {
    getAllUser,
    updateUser,
    deleteUser,
};
