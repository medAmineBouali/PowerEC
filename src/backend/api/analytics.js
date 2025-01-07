import express from 'express';
import { getConsumptionTrends, getCategoryDistribution ,getScatterPlotData,
    getDualAxisTrendData,
    getBoxPlotData,
    getClusteredBarChartData} from '../controller/analyticsController.js';

const router = express.Router();

router.get('/trends', getConsumptionTrends);
router.get('/distribution', getCategoryDistribution);
router.get('/scatter-plot', getScatterPlotData);
router.get('/dual-axis-trend', getDualAxisTrendData);
router.get('/box-plot', getBoxPlotData);
router.get('/clustered-bar-chart', getClusteredBarChartData);

export default router;
