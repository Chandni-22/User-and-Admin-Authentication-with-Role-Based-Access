const express = require('express');
const router = express.Router();
const { createTaskByUser, getTasksByUser, getAllTasksByAdmin} = require('../controllers/taskController');
const auth = require('../middleware/authMiddleware');
const restrict = require('../middleware/roleMiddleware');

// User routes
router.post('/', auth, restrict('user'), createTaskByUser);
router.get('/user/dashboard', auth, restrict('user'), getTasksByUser);

// Admin routes
router.get('/admin/dashboard', auth, restrict('admin'), getAllTasksByAdmin);

module.exports = router;