import { DataTypes } from 'sequelize';
import sequelize from '../api/db.js';

const Consumption = sequelize.define('PowerData', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true, // Since it's likely auto-incremented
    },
    machine_id: {
        type: DataTypes.STRING, // Matches VARCHAR(50) in the DB schema
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE, // Matches TIMESTAMP
        allowNull: false,
    },
    voltage: {
        type: DataTypes.DECIMAL(10, 2), // Matches DECIMAL(10,2)
    },
    current: {
        type: DataTypes.DECIMAL(10, 2),
    },
    power: {
        type: DataTypes.DECIMAL(10, 2),
    },
    energy_consumption: {
        type: DataTypes.DECIMAL(10, 2),
    },
    power_factor: {
        type: DataTypes.DECIMAL(5, 2),
    },
}, {
    tableName: 'power_data', // Explicitly map to the 'power_data' table
    timestamps: false, // Disable createdAt and updatedAt columns
});

export default Consumption;
