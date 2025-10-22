const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware.js');
const projectController = require('../controllers/projectController.js');

// Create a new project (no files created here)
router.post('/create', authMiddleware, projectController.createProject);

// Get all projects of the logged-in user
router.get('/get', authMiddleware, projectController.getUserProjects);

// Update project info (name, description, settings)
router.put('/update/:projectId', authMiddleware, projectController.updateProject);

// Delete project along with all its files
router.delete('/delete/:projectId', authMiddleware, projectController.deleteProject);



module.exports = router;