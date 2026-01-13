import Booking from '../models/Booking.js';
import Flight from '../models/Flight.js';

// @desc    Get all bookings (Admin Only)
// @route   GET /api/admin/bookings
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('user', 'name email').populate('flight');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update booking status / Finalize cancellation (Admin Only)
// @route   PUT /api/admin/bookings/:id
export const updateBookingStatus = async (req, res) => {
    const { status } = req.body; 

    try {
        const booking = await Booking.findById(req.params.id).populate('flight');

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // If admin is cancelling the booking, return 
        if (status === 'cancelled' && booking.status !== 'cancelled') {
            const flight = await Flight.findById(booking.flight._id);
            if (flight) {
                flight.availableSeats += booking.passengers.length;
                await flight.save();
            }
        }

        booking.status = status || booking.status;
        const updatedBooking = await booking.save();

        res.json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};