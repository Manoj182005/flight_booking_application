import express from 'express';
import { createFlight, getFlights, getFlightById } from '../controllers/flightController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import upload from '../config/multer.js';

const router = express.Router();

router.route('/')
    .get(getFlights) 
    .post(protect, admin, upload.single('image'), createFlight); // Admin only + image upload

router.get('/:id', getFlightById); 

export default router;