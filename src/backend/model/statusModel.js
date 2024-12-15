import { DataTypes } from 'sequelize';
import sequelize from '../api/db.js'; // Import your database connection

const StatusModel = sequelize.define('Status', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true, // Assuming id is auto-incremented
    },
    machine_id: {
        type: DataTypes.STRING, // Matches VARCHAR
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE, // Matches TIMESTAMP
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING, // Matches VARCHAR
        allowNull: false,
    },
    high_power: {
        type: DataTypes.TINYINT, // Matches TINYINT
        allowNull: false,
        defaultValue: 0,
    },
    low_power_factor: {
        type: DataTypes.TINYINT, // Matches TINYINT
        allowNull: false,
        defaultValue: 0,
    },
}, {
    tableName: 'status', // Explicitly map to 'status' table
    timestamps: false,   // Disable Sequelize's default timestamps
});

export default StatusModel;
