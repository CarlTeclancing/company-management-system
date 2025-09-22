const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Single endpoints
router.get('/projects/:companyId', dashboardController.getProjects);
router.get('/tasks/:companyId', dashboardController.getTasks);
router.get('/meetings/:companyId', dashboardController.getMeetings);
router.get('/finances/:companyId', dashboardController.getFinances);
router.get('/clients/:companyId', dashboardController.getClients);

// Combined endpoint
router.get('/:companyId', dashboardController.getCompanyDashboard);

module.exports = router;
