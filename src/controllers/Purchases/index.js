const boom = require('boom');
const purchasesRepository = require('../../repositories/purchases-repository');

class PurchasesController {
  constructor(router) {
    this.router = router;
    this.router.get('/purchases', this.getAllPurchases);
    this.router.get('/purchasesByCompany', this.getPurchasesByCompany);
    this.router.get('/purchases/:id', this.getOnePurchases);
    this.router.post('/purchases', this.storePurchases);
  }

  async getAllPurchases(req, res, next) {
    try {
      const list = await purchasesRepository.all();
      res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async getPurchasesByCompany(req, res, next) {
    try {
      const { company } = req.query;
      const list = await purchasesRepository.byCompany(company);
      res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async getOnePurchases(req, res, next) {
    try {
      const { id } = req.params;
      const item = await purchasesRepository.one(id);
      if (item) res.send(item);
      else return next(boom.notFound());
    } catch (error) {
      next(error);
    }
  }

  async storePurchases(req, res, next) {
    try {
      const { body } = req;
      const item = await purchasesRepository.store(body);
      res.json(item);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = PurchasesController;
