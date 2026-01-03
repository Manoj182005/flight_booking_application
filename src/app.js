import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests
app.use(morgan('dev'));  // Logs requests to terminal

// Basic Route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});

export default app;