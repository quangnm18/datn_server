const express = require("express");
const router = express.Router();

const whController = require("../controller/WarehouseController");

// /warehouse
router.get("/removed", whController.getRemovedWh);

router.get("/exportall", whController.getAllInventoryWh);
router.get("/", whController.getInventoryWh);

module.exports = router;
