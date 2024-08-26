const express = require('express');
const sequelize = require('./config/database');
require('dotenv').config();

const app = express();

app.use(express.json());

sequelize.authenticate()
  .then(() => console.log('Conexão com o banco de dados estabelecida.'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

module.exports = app;
