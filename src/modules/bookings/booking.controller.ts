import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { bookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.createBooking(req.body);
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error?.message,
    });
  }
};

const getAllBooking = async (req: Request, res: Response) => {
  try {
    const loggedInUser = req.user as JwtPayload;
    let result;

    if (loggedInUser.role === "admin") {
      result = await bookingService.getAllBooking();
    } else {
      result = await bookingService.getBookingByCustomerId(
        loggedInUser.id as string
      );
    }

    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};

const updateBookingByStatus = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;
    const loggedInUser = req.user as JwtPayload;

    // Fetch existing booking
    const booking = await bookingService.getBookingById(Number(bookingId));
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const now = new Date();

    // Customer Updating Booking

    if (loggedInUser.role === "customer") {
      if (loggedInUser.id !== booking.customer_id) {
        return res.status(403).json({
          success: false,
          message: "You can only update your own bookings",
        });
      }

      if (status !== "cancelled") {
        return res.status(400).json({
          success: false,
          message: "Customers can only cancel bookings",
        });
      }

      if (now >= new Date(booking.rent_start_date)) {
        return res.status(400).json({
          success: false,
          message: "Cannot cancel after the rental has started",
        });
      }

      const updated = await bookingService.updateBookingStatus(
        bookingId as string,
        "cancelled"
      );

      return res.status(200).json({
        success: true,
        message: "Booking cancelled successfully",
        data: updated,
      });
    }

    // Admin Updating Booking

    if (loggedInUser.role === "admin") {
      if (status !== "returned") {
        return res.status(400).json({
          success: false,
          message: "Admins can only mark bookings as returned",
        });
      }

      // Mark booking returned
      const updated = await bookingService.updateBookingStatus(
        bookingId as string,
        "returned"
      );

      // Update vehicle availability
      await bookingService.updateVehicleAvailability(
        booking.vehicle_id,
        "available"
      );

      return res.status(200).json({
        success: true,
        message: "Booking marked as returned. Vehicle is now available",
        data: {
          ...updated,
          vehicle: { availability_status: "available" },
        },
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const bookingController = {
  createBooking,
  getAllBooking,
  updateBookingByStatus,
};
