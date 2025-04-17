const express = require('express');
const router = express.Router();
const { createTaskByUser, getTasksByUser, getAllTasksByAdmin} = require('../controllers/taskController');
const auth = require('../middleware/authMiddleware');
const restrictTo = require('../middleware/roleMiddleware');

// User routes
router.post('/', auth, restrictTo('user'), createTaskByUser);
router.get('/user/dashboard', auth, restrictTo('user'), getTasksByUser);

// Admin routes
router.get('/admin/dashboard', auth, restrictTo('admin'), getAllTasksByAdmin);

module.exports = router;