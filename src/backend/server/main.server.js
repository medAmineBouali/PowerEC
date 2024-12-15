import express from 'express';
import bodyParser from 'body-parser';
import overviewRoutes from '../api/overview.js';
import analyticsRoutes from '../api/analytics.js';
import healthRoutes from '../api/health.js';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api/overview', overviewRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/health', healthRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
