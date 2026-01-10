import express from 'express';
import { getAllBookings, updateBookingStatus } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply protect AND admin to all routes in this file
router.use(protect);
router.use(admin);

router.route('/bookings').get(getAllBookings);
router.route('/bookings/:id').put(updateBookingStatus);

export default router;