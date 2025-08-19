const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, getUserByCompanyId, createUser, updateUser, deleteUser } = require('../controllers/userController');

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.get('/company/:id', getUserByCompanyId);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
