import MachineDataModel from '../model/MachineDataModel.js';
import sequelize from '../api/db.js';
import { Sequelize } from 'sequelize';

export const getGlobalMetrics = async (req, res) => {
    const { plant, category } = req.query;
    try {
        const filters = {};
        if (plant) filters.plant = plant;
        if (category) filters.category = category;

        const aggregateConsumption = await MachineDataModel.findAll({
            attributes: ['plant', [sequelize.fn('SUM', sequelize.col('energy_consumption')), 'total_consumption']],
            where: filters,
            group: ['plant'],
        });

        const categoryDistribution = await MachineDataModel.findAll({
            attributes: ['category', [sequelize.fn('COUNT', sequelize.col('category')), 'count']],
            where: filters,
            group: ['category'],
        });

        const consumptionTrend = await MachineDataModel.findAll({
            attributes: ['timestamp', [sequelize.fn('SUM', sequelize.col('power')), 'total_power']],
            where: filters,
            order: [['timestamp', 'ASC']],
        });

        res.json({ aggregateConsumption, categoryDistribution, consumptionTrend });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching global metrics', details: error });
    }
};

export const getMachineHealth = async (req, res) => {
    const { plant, category } = req.query;
    try {
        const filters = {};
        if (plant) filters.plant = plant;
        if (category) filters.category = category;

        const powerFactorHeatmap = await MachineDataModel.findAll({
            attributes: ['timestamp', 'machine_id', 'power_factor'],
            where: filters,
            order: [['timestamp', 'ASC']],
        });

        const highLowPowerStats = await MachineDataModel.findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('high_power')), 'high_power_count'],
                [sequelize.fn('SUM', sequelize.col('low_power_factor')), 'low_power_factor_count'],
            ],
            where: filters,
        });

        res.json({ powerFactorHeatmap, highLowPowerStats });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching machine health', details: error });
    }
};

export const getCostInsights = async (req, res) => {
    const { plant, category, index } = req.query;
    try {
        const filters = {};
        if (plant) filters.plant = plant;
        if (category) filters.category = category;

        const costIndexData = await MachineDataModel.findAll({
            attributes: [
                'timestamp',
                [sequelize.fn('SUM', sequelize.col(index === 'cost' ? 'cost' : 'energy_consumption')), 'value'],
            ],
            where: filters,
            order: [['timestamp', 'ASC']],
        });

        res.json({ costIndexData });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching cost insights', details: error });
    }
};

export const getOverviewMetrics = async (req, res) => {
    try {
        const totalEnergy = await MachineDataModel.sum('energy_consumption');
        const totalMachines = await MachineDataModel.count({ distinct: 'machine_id' });

        const avgPowerFactorRow = await MachineDataModel.findOne({
            attributes: [
                [Sequelize.fn('AVG', Sequelize.col('power_factor')), 'avgPowerFactor']
            ],
            raw: true,
        });

        const avgPowerFactor = avgPowerFactorRow ? parseFloat(avgPowerFactorRow.avgPowerFactor).toFixed(2) : null;

        res.status(200).json({
            totalEnergy,
            totalMachines,
            avgPowerFactor,
        });
    } catch (error) {
        console.error('Error fetching overview metrics:', error);
        res.status(500).json({
            message: 'Error fetching metrics',
            error: error.message,
        });
    }
};

export const getLastMonthMetricsByDay = async (req, res) => {
    try {
        const now = new Date();
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);

        const dailyData = await MachineDataModel.findAll({
            attributes: [
                [Sequelize.fn('DATE', Sequelize.col('timestamp')), 'date'],
                [Sequelize.fn('SUM', Sequelize.col('energy_consumption')), 'totalEnergy']
            ],
            where: {
                timestamp: {
                    [Sequelize.Op.between]: [lastMonth, now]
                }
            },
            group: [Sequelize.fn('DATE', Sequelize.col('timestamp'))],
            order: [[Sequelize.fn('DATE', Sequelize.col('timestamp')), 'ASC']],
            raw: true,
        });

        const costPerKwh = 0.09;
        const dailyDataWithCost = dailyData.map(entry => ({
            ...entry,
            totalEnergy: parseFloat(entry.totalEnergy).toFixed(2),
            cost: (parseFloat(entry.totalEnergy) * costPerKwh).toFixed(2)
        }));

        res.status(200).json(dailyDataWithCost);
    } catch (error) {
        console.error('Error fetching last month daily metrics:', error);
        res.status(500).json({
            message: 'Error fetching last month daily metrics',
            error: error.message,
        });
    }
};

export const getPlantConsumptionLastMonth = async (req, res) => {
    try {
        const { Op } = Sequelize;
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);

        const plantConsumption = await MachineDataModel.findAll({
            attributes: [
                [Sequelize.fn('SUM', Sequelize.col('energy_consumption')), 'totalEnergy'],
                'plant'
            ],
            where: {
                timestamp: {
                    [Op.gte]: lastMonth
                }
            },
            group: ['plant'],
            raw: true,
        });

        const formattedData = plantConsumption.map(row => ({
            plant: row.plant,
            totalEnergy: parseFloat(row.totalEnergy).toFixed(2),
        }));

        res.status(200).json(formattedData);
    } catch (error) {
        console.error('Error fetching plant consumption for last month:', error);
        res.status(500).json({
            message: 'Error fetching plant consumption for last month',
            error: error.message,
        });
    }
};