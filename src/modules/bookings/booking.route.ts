import { Router } from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middleware/authVerify";

const router = Router();

router.post("/", auth("admin", "customer"), bookingController.createBooking);
router.get("/", auth("admin", "customer"), bookingController.getAllBooking);
router.put("/:bookingId", auth("admin", "customer"), bookingController.updateBookingByStatus);

export const bookingsRouter = router;
