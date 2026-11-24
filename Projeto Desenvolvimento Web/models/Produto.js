const {DataTypes} = require('sequelize');
const sequelize = require('../dataBase');

const Produto = sequelize.define('Produto',{
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

module.exports = Produto;
