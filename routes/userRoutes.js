const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, getUsersByCompanyId, createUser, updateUser, deleteUser } = require('../controllers/userController');

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.get('/company/:id', getUsersByCompanyId);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
