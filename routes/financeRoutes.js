const express = require('express');
const router = express.Router();
const { getAllFinances, getProFinancesById, createProFinances, updateProFinances, deleteProFinances } = require('../controllers/financeController');

router.get('/', getAllFinances);
router.get('/:id', getProFinancesById);
router.post('/', createProFinances);
router.put('/:id', updateProFinances);
router.delete('/:id', deleteProFinances);

module.exports = router;
