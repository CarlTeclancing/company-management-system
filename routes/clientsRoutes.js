const express = require('express');
const router = express.Router();
const { getAllClients, getClientById, createClient, updateClient, deleteClient, getClientByCompanyId } = require('../controllers/clientsController');

router.get('/', getAllClients);
router.get('/:id', getClientById);
router.post('/', createClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

router.get("/company/:id" ,getClientByCompanyId)

module.exports = router;
