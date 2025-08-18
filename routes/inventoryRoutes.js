const express = require('express')
const { addQty, removeQty } = require('../controllers/inventoryController')
const router = express.Router()

router.route("/")
.post()
.get()

router.route("/:id")
.get()
.put()
.delete()

router.post("/add-qty" ,addQty)
router.post("/remove-qty" ,removeQty)

module.exports = router