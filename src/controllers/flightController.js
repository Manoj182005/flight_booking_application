import Flight from '../models/Flight.js';

// @desc    Create a new flight (Admin Only)
// @route   POST /api/flights
export const createFlight = async (req, res) => {
    try {
        const flightData = {
            ...req.body,
           image: req.file ? req.file.path.replace(/\\/g, "/") : ""
, // Save the file path
            createdBy: req.user._id // Link to the admin who created it
        };

        const flight = await Flight.create(flightData);
        res.status(201).json(flight);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all flights with search/filters
// @route   GET /api/flights
export const getFlights = async (req, res) => {
    const { departureCity, arrivalCity, flightClass, minPrice, maxPrice } = req.query;

    let query = {};

    if (departureCity) query.departureCity = new RegExp(departureCity, 'i');
    if (arrivalCity) query.arrivalCity = new RegExp(arrivalCity, 'i');
    if (flightClass) query.flightClass = flightClass;
    if (minPrice || maxPrice) {
        query.price = { 
            ...(minPrice && { $gte: Number(minPrice) }), 
            ...(maxPrice && { $lte: Number(maxPrice) }) 
        };
    }

    try {
        const flights = await Flight.find(query);
        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get flight by ID
// @route   GET /api/flights/:id
export const getFlightById = async (req, res) => {
    const flight = await Flight.findById(req.params.id);
    if (flight) res.json(flight);
    else res.status(404).json({ message: 'Flight not found' });
};