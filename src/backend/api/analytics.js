import express from 'express';
import { getConsumptionTrends, getCategoryDistribution } from '../controller/analyticsController.js';

const router = express.Router();

router.get('/trends', getConsumptionTrends);
router.get('/distribution', getCategoryDistribution);

export default router;
