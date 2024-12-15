import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('industrial_plant', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

export default sequelize;
