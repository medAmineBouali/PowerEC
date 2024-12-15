import { DataTypes } from 'sequelize';
import sequelize from '../api/db.js';

const Machine = sequelize.define('Machine', {
    machine_id: { // Match the column name in the DB
        type: DataTypes.STRING,
        primaryKey: true,
    },
    location: { // This matches your table
        type: DataTypes.STRING,
    },
}, {
    tableName: 'machines', // Explicitly specify the table name
    timestamps: false, // Disable timestamps if not used in the DB
});

export default Machine;
