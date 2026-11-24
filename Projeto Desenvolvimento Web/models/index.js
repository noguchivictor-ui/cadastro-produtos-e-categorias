const Categoria = require('./Categoria');
const Produto = require('./Produto');

Categoria.hasMany(Produto, {as: 'produtos', foreignKey: {name: 'categoriasId', allowNull: false}});
Produto.belongsTo(Categoria, {as: 'categoria', foreignKey: {name: 'categoriasId', allowNull: false}});

module.exports = {Categoria,Produto};