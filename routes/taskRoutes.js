const express = require('express');
const router = express.Router();
const { getAllTask, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/taskController');

router.get('/', getAllTask);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
