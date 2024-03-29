const express = require("express");
const router = express.Router();

const categoryController = require("../controller/CategoryController");

router.get("/maxidmed", categoryController.getMaxIdMed);
router.get("/maxidgr", categoryController.getMaxIdGr);
router.get("/maxidunit", categoryController.getMaxIdUnit);

// /category/medicine/group
router.get("/medicinegroup/*", categoryController.getGrMedCurr);
router.get("/medicine/group", categoryController.getGroupMed);
router.post("/medicine/group/add", categoryController.addGroupMed);
router.delete(
  "/medicine/group/harddelete/:id",
  categoryController.hardDeleteGr
);
router.put("/medicine/group/update/:id", categoryController.updateGroupMed);

router.put("/medicine/group/restore/:id", categoryController.resGroupMed);
router.put("/medicine/group/softdelete", categoryController.softDeleteGrMed);
router.put(
  "/medicine/group/multisoftdelete",
  categoryController.softDelMultiGrMed
);

// / category/medicine/

router.get("/getallmed/*", categoryController.getAllMedCurr);
router.get("/medicine/search/*", categoryController.getSearchImport);

router.get("/medicinecurrent", categoryController.getAllMedCurrent);
router.get("/medicine", categoryController.getAllMedicine);
router.post("/medicine/add", categoryController.createMedicine);

router.delete("/medicine/delete/:id", categoryController.deleteMedicine);

router.get("/warehouse/sellsearch/*", categoryController.getSearchSell);

// router.get("/warehouse*", categoryController.getCheckWh);

router.get("/medicine/expand/:id", categoryController.getMedicineById);

router.put(
  "/medicine/update/softdelete/",
  categoryController.softDeleteMedicine
);
router.put("/medicine/update/:id", categoryController.updateMedicine);

router.put("/medicine/update/restore/:id", categoryController.restoreMed);

// /category/supplier
router.get("/supplierall", categoryController.getAllNameSup);
router.get("/supplier/*", categoryController.getAllSup);

router.post("/supplier/add", categoryController.createSupplier);

router.put("/supplier/update/:id", categoryController.updateSupplier);
router.put("/supplier/softdelete", categoryController.softDelSupplier);
router.put("/supplier/multisoftdelete", categoryController.softDelMultiSup);

router.put("/supplier/restore/:id", categoryController.restoreSupplier);

router.delete("/supplier/harddelete/:id", categoryController.hardDelSupplier);

//category/user
// router.delete("/users/delete/:id", categoryController.deleteUserById);
router.put("/users/softdelete/:id", categoryController.softDeleteUserById);

router.get("/users", categoryController.getAllUser);
router.get("/roles", categoryController.getAllRole);
router.put("/updateuser", categoryController.updateUser);
router.post("/adduser", categoryController.addUser);

//category/unitmed

router.post("/medicine/unit/add", categoryController.addUnitMed);
router.put("/medicine/unit/update/:id", categoryController.updateUnitMed);
router.put("/medicine/unit/restore/:id", categoryController.resUnitMed);
router.put("/medicine/unit/softdelete", categoryController.softDeleteUnitMed);
router.put(
  "/medicine/unit/multisoftdelete",
  categoryController.softDelMultiUnitMed
);

router.delete(
  "/medicine/unit/harddelete/:id",
  categoryController.hardDelUnitMed
);

router.get("/medicineunit", categoryController.getUnitMed);
router.get("/medicineunitall", categoryController.getUnitAll);

module.exports = router;
