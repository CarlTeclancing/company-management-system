const express = require('express')
const { addQty, removeQty, addInventory, getAllInventory, getInventoryById, updateInventory, deleteInventory, getInventoryByCompanyId } = require('../controllers/inventoryController')
const router = express.Router()

router.route("/")
.post(addInventory)
.get(getAllInventory)

router.get("/company/id" ,getInventoryByCompanyId)

router.route("/:id")
.get(getInventoryById)
.put(updateInventory)
.delete(deleteInventory)

router.post("/add-qty" ,addQty)
router.post("/reduce-qty" ,removeQty)

module.exports = router