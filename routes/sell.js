const express = require("express");
const router = express.Router();

const sellController = require("../controller/SellController");

router.get("/getmaxid", sellController.getMaxIdIv);

// /sell/
router.post("/ivdetail/create", sellController.createSaleDetail);
router.post("/ivcreate", sellController.createInvoice);

router.get("/ivlist/*", sellController.getListIv); //co phan trang (ca deleted va khong deleted)
router.get("/allivlist", sellController.getAllListIv); //get tat ca
router.get("/ivdetailcurr/*", sellController.getSaleDetailByIvCode);
router.get("/ivdetail*", sellController.getSaleDetail); //co pagination

router.put("/ivlist/softdelete", sellController.softDelSaleIv);
router.put("/ivlist/restore", sellController.restoreSaleIv);
router.delete("/ivlist/harddelete/:id", sellController.hardDelSaleIv);

// /sell/createinvoice

module.exports = router;
