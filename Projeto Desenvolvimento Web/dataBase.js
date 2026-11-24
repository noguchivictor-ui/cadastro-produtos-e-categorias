const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './dados.sqlite',
    logging: false
});

module.exports = sequelize;