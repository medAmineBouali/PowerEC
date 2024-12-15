import express from 'express';
import Machine from '../model/machineModel.js';
import Consumption from '../model/consumptionModel.js';

const router = express.Router();

router.get('/health', async (req, res) => {
    try {
        const machineCount = await Machine.count();
        const consumptionCount = await Consumption.count();
        res.status(200).json({
            status: 'OK',
            machineCount,
            consumptionCount,
        });
    } catch (error) {
        console.error('Health Check Error:', error);
        res.status(500).json({ status: 'Error', message: error.message });
    }
});

export default router;
