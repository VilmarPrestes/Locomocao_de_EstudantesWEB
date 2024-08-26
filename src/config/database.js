require('dotenv').config(); // Certifique-se de que dotenv está sendo importado

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // just for SQL
});

module.exports = sequelize;
