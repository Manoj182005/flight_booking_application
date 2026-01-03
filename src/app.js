import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; // Add this
import authRoutes from './routes/authRoutes.js'; // Add this

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests
app.use(morgan('dev'));
app.use(cookieParser());  // Logs requests to terminal

// Routes
app.use('/api/auth', authRoutes);

// Basic Route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});

export default app;