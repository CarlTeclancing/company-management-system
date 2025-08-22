const express = require('express');
const { createCategory, getAllCategory, getCategoryById, updateCategory, deleteCategory, getCategoryByCompanyId } = require('../controllers/categoryController');
const router = express.Router();

router.route("/")
.post(createCategory)
.get(getAllCategory)

router.route("/:id")
.get(getCategoryById)
.put(updateCategory)
.delete(deleteCategory)

router.get("/company/:company_id" ,getCategoryByCompanyId)

module.exports = router;
