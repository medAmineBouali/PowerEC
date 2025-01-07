import express from 'express';
import MachineData from '../model/MachineDataModel.js'; // Replace with the correct unified model file path

const router = express.Router();

router.get('/health', async (req, res) => {
    try {
        // Count distinct machines
        const machineCount = await MachineData.count({ distinct: 'machine_id' });
        // Count total records (representing all consumption and status data)
        const recordCount = await MachineData.count();

        res.status(200).json({
            status: 'OK',
            machineCount,
            recordCount,
        });
    } catch (error) {
        console.error('Health Check Error:', error);
        res.status(500).json({ status: 'Error', message: error.message });
    }
});

export default router;
