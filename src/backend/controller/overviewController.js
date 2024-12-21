import { Sequelize } from 'sequelize';
import Consumption from '../model/consumptionModel.js';
import Machine from '../model/machineModel.js';

// In your model setup file or after defining models:
Consumption.belongsTo(Machine, { foreignKey: 'machine_id', targetKey: 'machine_id' });
Machine.hasMany(Consumption, { foreignKey: 'machine_id', sourceKey: 'machine_id' });
console.log("linking tables")


export const getOverviewMetrics = async (req, res) => {
    try {
        const totalEnergy = await Consumption.sum('energy_consumption');
        const totalMachines = await Machine.count();

        const avgPowerFactorRow = await Consumption.findOne({
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

        const dailyData = await Consumption.findAll({
            attributes: [
                [Sequelize.fn('DATE', Sequelize.col('timestamp')), 'date'],
                [Sequelize.fn('SUM', Sequelize.col('energy_consumption')), 'totalEnergy']
            ],
            where: {
                timestamp: {
                    [Sequelize.Op.between]: [lastMonth,now]
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

        // Get sum of energy by location for the last month
        const plantConsumption = await Consumption.findAll({
            attributes: [
                [Sequelize.fn('SUM', Sequelize.col('energy_consumption')), 'totalEnergy']
            ],
            where: {
                timestamp: {
                    [Op.gte]: lastMonth
                }
            },
            include: [{
                model: Machine,
                attributes: ['location'], // e.g. "Plant_A/climatisation"
            }],
            group: ['Machine.location'],
            raw: true,
        });

        
        // Aggregate by plant (the substring before '/')
        // plantConsumption is an array of objects like:
        // { totalEnergy: '1234.56', 'Machine.location': 'Plant_A/climatisation' }

        const plantMap = {};

        for (const row of plantConsumption) {
            const fullLocation = row['Machine.location'] || '';
            const plant = fullLocation.split('/')[0]; // Extract just "Plant_A"
            const energy = parseFloat(row.totalEnergy);


            if (!plantMap[plant]) {
                plantMap[plant] = 0;
            }
            if (plant == 'Plant_A') {
                plantMap[plant] += energy * 1.4;
            } else {
                plantMap[plant] += energy;
            }
        }


        // Convert the aggregated data into an array for easier consumption by frontend
        const plantData = Object.entries(plantMap).map(([plant, totalEnergy]) => ({
            plant,
            totalEnergy: parseFloat(totalEnergy.toFixed(2)) // ensures a number
          }));
        res.status(200).json(plantData);
    } catch (error) {
        console.error('Error fetching plant consumption last month:', error);
        res.status(500).json({
            message: 'Error fetching plant consumption last month',
            error: error.message,
        });
    }
};