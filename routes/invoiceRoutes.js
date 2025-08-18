const express = require('express')
const { createInvoice, getAllInvoice, getInvoiceById, deleteInvoice, updateInvoice } = require('../controllers/invoiceController')
const router = express.Router()


router.route("/")
.post(createInvoice)
.get(getAllInvoice)

router.route("/:id")
.put(updateInvoice)
.delete(deleteInvoice)
.get(getInvoiceById)


module.exports = router