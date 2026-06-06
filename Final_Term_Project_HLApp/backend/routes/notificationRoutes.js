const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getUserNotifications, markAsRead } = require('../controllers/notificationController');

// Add app.use('/api/notifications', require('./routes/notificationRoutes')); to server.js
router.get('/', authMiddleware, getUserNotifications);
router.put('/:id/read', authMiddleware, markAsRead);

module.exports = router;