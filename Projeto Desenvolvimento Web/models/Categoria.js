const {DataTypes} = require('sequelize');
const sequelize = require('../dataBase');

const Categoria = sequelize.define('Categoria',{
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Categoria;