import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    flight: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Flight', 
        required: true 
    },
    passengers: [{
        name: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String, required: true }
    }],
    totalPrice: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['confirmed', 'cancelled', 'pending'], 
        default: 'confirmed' 
    },
    cancellationRequested: { type: Boolean, default: false }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;