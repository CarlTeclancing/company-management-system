const express = require('express')
const { addItem, getItemById, getInvoiceItem, getAllItem, updateItem, deleteItem } = require('../controllers/itemController')
const router = express.Router()

router.route("/")
.post(addItem)
.get(getAllItem)

router.get("/invoice/:invoice_id" ,getInvoiceItem)

router.route("/:id")
.get(getItemById)
.put(updateItem)
.delete(deleteItem)


module.exports = router