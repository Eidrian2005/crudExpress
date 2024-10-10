const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController")

router.get("/", productsController.getAllProducts)
router.post("/", productsController.postAllProducts)
router.delete("/:id", productsController.deleteProducts)
router.put("/:id", productsController.updateProducts)

module.exports = router;