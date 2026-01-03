import express from 'express';
import { 
    createBooking, 
    getMyBookings, 
    requestCancellation 
} from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, createBooking)
    .get(protect, getMyBookings);

router.put('/:id/cancel-request', protect, requestCancellation);

export default router;