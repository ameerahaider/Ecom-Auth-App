const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Ecommerce', 'postgres', '123456', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
  });
// Export the sequelize instance to be used in models and elsewhere
module.exports = sequelize;
