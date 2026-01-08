import Booking from '../models/Booking.js';
import Flight from '../models/Flight.js';


export const createBooking = async (req, res) => {
    const { flightId, passengers } = req.body;

    try {
        const flight = await Flight.findById(flightId);

        if (!flight) {
            return res.status(404).json({ message: 'Flight not found' });
        }

        // 1. Check seat availability
        if (flight.availableSeats < passengers.length) {
            return res.status(400).json({ message: 'Not enough seats available' });
        }

        // 2. Calculate total price
        const totalPrice = flight.price * passengers.length;

        // 3. Create the booking
        const booking = new Booking({
            user: req.user._id,
            flight: flightId,
            passengers,
            totalPrice
        });

        const createdBooking = await booking.save();

        // 4. Update available seats in the Flight model
        flight.availableSeats -= passengers.length;
        await flight.save();

        res.status(201).json(createdBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
export const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id }).populate('flight');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Request booking cancellation
// @route   PUT /api/bookings/:id/cancel-request
// @access  Private
export const requestCancellation = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (booking && booking.user.toString() === req.user._id.toString()) {
            booking.cancellationRequested = true;
            await booking.save();
            res.json({ message: 'Cancellation request sent to admin' });
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};