import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
    flightNumber: { type: String, required: true, unique: true },
    airline: { type: String, required: true },
    departureCity: { type: String, required: true },
    arrivalCity: { type: String, required: true },
    departureDate: { type: Date, required: true },
    arrivalDate: { type: Date, required: true },
    price: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    flightClass: { 
        type: String, 
        enum: ['Economy', 'Business', 'First Class'], 
        default: 'Economy' 
    },
    image: { type: String }, // Airline logo URL
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
}, { timestamps: true });

const Flight = mongoose.model('Flight', flightSchema);
export default Flight;