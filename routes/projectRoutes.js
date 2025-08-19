const express = require('express');
const router = express.Router();
const { getAllProjects, getProjectById, createProject, updateProject, deleteProject, changeStatus } = require('../controllers/projectController');

router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

router.post("/change-status" ,changeStatus)

module.exports = router;
