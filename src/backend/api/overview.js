import express from 'express';
import { getOverviewMetrics ,getLastMonthMetricsByDay ,getPlantConsumptionLastMonth } from '../controller/overviewController.js';

const router = express.Router();

router.get('/metrics', getOverviewMetrics);
router.get('/metrics/last-month', getLastMonthMetricsByDay);
router.get('/metrics/plants-last-month', getPlantConsumptionLastMonth);


export default router;
