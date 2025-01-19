const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.SQL_DATABASE, process.env.SQL_USER, process.env.SQL_PASSWORD, {
    host: process.env.SQL_HOST,
    dialectModule: require('mysql2')
});

sequelize.authenticate()
    .then(() => console.log('SQL Database connected!'))
    .catch(err => console.error('SQL Database connection error:', err));

module.exports = sequelize;
