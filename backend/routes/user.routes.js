const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

/**
 * @swagger
 * /api/user/clients:
 *   get:
 *     summary: Get all clients
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of clients
 */
router.get('/clients', authMiddleware, roleMiddleware('staff'), userController.getClients);

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile data
 */
router.get('/profile', authMiddleware, userController.getProfile);

/**
 * @swagger
 * /api/user/profile:
 *   put:
 *     summary: Update current user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfile'
 *     responses:
 *       200:
 *         description: Profile updated
 */
router.put('/profile', authMiddleware, userController.updateMe);

/**
 * @swagger
 * /api/user/profile:
 *   delete:
 *     summary: Delete account
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete('/profile', authMiddleware, userController.deleteMe);

module.exports = router;