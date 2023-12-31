var Sell = require("../model/sell.model");

class SellController {
  // /sell/list
  getAllInvoiceSale(req, res) {
    Sell.get_all((data) => {
      res.json(data);
    });
  }

  getByDate(req, res) {
    Sell.getByDate(dataReq, (response) => {
      res.json(response);
    });
  }

  deleteInvoice(req, res) {
    Sell.delete(req.params.id, (response) => {
      res.json(response);
    });
  }

  // /sell/create
  getListUnitByID(req, res) {
    Sell.getListUnitByID(req.params.id, (data) => {
      res.json(data);
    });
  }
}

module.exports = new SellController();
