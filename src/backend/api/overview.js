import express from 'express';
import { getGlobalMetrics, getMachineHealth, getCostInsights, getOverviewMetrics, getLastMonthMetricsByDay, getPlantConsumptionLastMonth } from '../controller/overviewController.js';

const router = express.Router();

router.get('/global-metrics', getGlobalMetrics);
router.get('/machine-health', getMachineHealth);
router.get('/cost-insights', getCostInsights);
router.get('/overview-metrics', getOverviewMetrics);
router.get('/last-month-metrics', getLastMonthMetricsByDay);
router.get('/plant-consumption-last-month', getPlantConsumptionLastMonth);

export default router;