import { DataTypes } from 'sequelize';
import sequelize from '../api/db.js';

const MachineDataModel = sequelize.define('MachineData', {
    machine_id: {
        type: DataTypes.STRING, // Matches VARCHAR(50)
        allowNull: false,
        primaryKey: true,
    },
    timestamp: {
        type: DataTypes.DATE, // Matches TIMESTAMP
        allowNull: false,
        primaryKey: true,
    },
    plant: {
        type: DataTypes.STRING, // Matches VARCHAR(100)
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING, // Matches VARCHAR(100)
        allowNull: false,
    },
    voltage: {
        type: DataTypes.DECIMAL(10, 2),
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
    status: {
        type: DataTypes.STRING, // Matches VARCHAR
    },
    high_power: {
        type: DataTypes.TINYINT,
    },
    low_power_factor: {
        type: DataTypes.TINYINT,
    },
}, {
    tableName: 'machines_data', // Explicitly map to 'machines_data' table
    timestamps: false,         // Disable createdAt and updatedAt columns
});

export default MachineDataModel;
