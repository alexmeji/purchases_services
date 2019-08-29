'use strict';
module.exports = (sequelize, DataTypes) => {
  const Purchases = sequelize.define('Purchases', {
    provider: DataTypes.INTEGER,
    company: DataTypes.INTEGER,
    total: DataTypes.FLOAT
  }, {});
  Purchases.associate = function(models) {
    // associations can be defined here
    Purchases.hasMany(models.PurchasesDetail, {
      foreignKey: {
        name:"purchasesId",
        field: "purchasesId",
        allowNull: true
      }
    });
  };
  return Purchases;
};
