import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import flightRoutes from './routes/flightRoutes.js';
import path from 'path';
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests
app.use(morgan('dev'));
app.use(cookieParser());  // Logs requests to terminal

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/bookings', bookingRoutes);


const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


// Basic Route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});

export default app;