const express = require('express')
const { createInvoice, getAllInvoice, getInvoiceById, deleteInvoice, updateInvoice, getInvoiceByCompanyId } = require('../controllers/invoiceController')
const router = express.Router()


router.route("/")
.post(createInvoice)
.get(getAllInvoice)

router.get("/company/:id" ,getInvoiceByCompanyId)

router.route("/:id")
.put(updateInvoice)
.delete(deleteInvoice)
.get(getInvoiceById)


module.exports = router