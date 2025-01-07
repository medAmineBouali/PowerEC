import MachineData from '../model/MachineDataModel.js';
import { Sequelize } from 'sequelize';

export const getConsumptionTrends = async (req, res) => {
    try {
        const trends = await MachineData.findAll({
            attributes: [
                [Sequelize.fn('DATE_FORMAT', Sequelize.col('timestamp'), '%Y-%m'), 'month'],
                [Sequelize.fn('SUM', Sequelize.col('energy_consumption')), 'total_energy'],
            ],
            group: [Sequelize.fn('DATE_FORMAT', Sequelize.col('timestamp'), '%Y-%m')],
        });

        res.status(200).json(trends);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching trends', error });
    }
};

export const getCategoryDistribution = async (req, res) => {
    try {
        const distribution = await MachineData.findAll({
            attributes: [
                'location',
                [Sequelize.fn('SUM', Sequelize.col('energy_consumption')), 'total_energy'],
            ],
            group: ['location'],
        });

        res.status(200).json(distribution);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching distribution', error });
    }
};

export const getScatterPlotData = async (req, res) => {
    const { category } = req.query;
    try {
        const filters = {};
        if (category) filters.category = category;

        const scatterData = await MachineData.findAll({
            attributes: ['voltage', 'current'],
            where: filters,
        });

        res.status(200).json(scatterData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching scatter plot data', details: error });
    }
};

export const getDualAxisTrendData = async (req, res) => {
    const { plant, category } = req.query;
    try {
        const filters = {};
        if (plant) filters.plant = plant;
        if (category) filters.category = category;

        const trendData = await MachineData.findAll({
            attributes: [
                'timestamp',
                [Sequelize.fn('SUM', Sequelize.col('power')), 'total_power'],
                [Sequelize.fn('SUM', Sequelize.col('energy_consumption')), 'total_energy'],
            ],
            where: filters,
            group: ['timestamp'],
            order: [['timestamp', 'ASC']],
        });

        res.status(200).json(trendData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching dual axis trend data', details: error });
    }
};

export const getBoxPlotData = async (req, res) => {
    const { plant } = req.query;
    try {
        const filters = {};
        if (plant) filters.plant = plant;

        const boxPlotData = await MachineData.findAll({
            attributes: ['power_factor', 'plant'],
            where: filters,
        });

        res.status(200).json(boxPlotData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching box plot data', details: error });
    }
};

export const getClusteredBarChartData = async (req, res) => {
    const { plant, category } = req.query;
    try {
        const filters = {};
        if (plant) filters.plant = plant;
        if (category) filters.category = category;

        const barChartData = await MachineData.findAll({
            attributes: [
                'category',
                [Sequelize.fn('SUM', Sequelize.col('energy_consumption')), 'total_energy'],
                'plant',
            ],
            where: filters,
            group: ['category', 'plant'],
        });

        res.status(200).json(barChartData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching clustered bar chart data', details: error });
    }
};

