const { Op } = require('sequelize');
const { Purchases, PurchasesDetail, Inventory } = require('../database/models');

const all = async () => {
  const list = await Purchases.findAll();
  return list;
};

const byCompany = async (company) => {
  const list = await Purchases.findAll({
    where: {
      company,
    },
  });
  return list;
};

const one = async (id) => {
  const item = await Purchases.findOne({
    where: {
      id,
    },
    include: [
      {
        model: PurchasesDetail,
      },
    ],
  });
  return item;
};

const store = async (purchase) => {
  const newPurchase = await Purchases.create({
    provider: purchase.providerId,
    company: purchase.company,
    total: purchase.total,
  });

  const detail = purchase.items.map(item => ({
    quantity: item.quantity,
    price: item.price,
    subtotal: item.subtotal,
    productId: item.product,
    purchasesId: newPurchase.id,
  }));

  await PurchasesDetail.bulkCreate(detail);
  const productsIds = purchase.items.map(item => item.product);
  const inventoryExist = await Inventory.findAll({
    where: {
      company: purchase.company,
      product: {
        [Op.in]: productsIds,
      },
    },
  });

  const promisesForInventory = purchase.items.map((item) => {
    const exist = inventoryExist.find(iv => iv.product === item.product);
    if (exist) {
      return Inventory.update({
        stock: parseInt(exist.stock + item.quantity, 10),
      }, { where: { id: exist.id } });
    }

    return Inventory.create({
      product: item.product,
      stock: item.quantity,
      minimun: 0,
      company: purchase.company,
    });
  });

  await Promise.all(promisesForInventory);

  const purchaseWithDetail = await one(newPurchase.id);

  return purchaseWithDetail;
};

module.exports = {
  all,
  one,
  byCompany,
  store,
};
