import Consumption from '../model/consumptionModel.js';
import Machine from '../model/machineModel.js';
import { Sequelize } from 'sequelize';

export const getConsumptionTrends = async (req, res) => {
    try {
        const trends = await Consumption.findAll({
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
        const distribution = await Consumption.findAll({
            attributes: [
                'machine_id',
                [Sequelize.fn('SUM', Sequelize.col('energy_consumption')), 'total_energy'],
            ],
            group: ['machine_id'],
            include: {
                model: Machine,
                attributes: ['category'],
            },
        });

        res.status(200).json(distribution);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching distribution', error });
    }
};
