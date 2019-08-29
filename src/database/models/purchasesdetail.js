'use strict';
module.exports = (sequelize, DataTypes) => {
  const PurchasesDetail = sequelize.define('PurchasesDetail', {
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    subtotal: DataTypes.FLOAT,
    productId: DataTypes.INTEGER,
    purchasesId: DataTypes.INTEGER
  }, {});
  PurchasesDetail.associate = function(models) {
    // associations can be defined here
    PurchasesDetail.belongsTo(models.Purchases, { as: "purchase", foreignKey: { name:"purchasesId", field: "purchasesId", allowNull: true }});
  };
  return PurchasesDetail;
};
