'use strict';
module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define('Inventory', {
    product: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    minimun: DataTypes.INTEGER,
    company: DataTypes.INTEGER
  }, {});
  Inventory.associate = function(models) {
    // associations can be defined here
  };
  return Inventory;
};
