const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new client
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterClient'
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/auth/internal/setup-staff:
 *   post:
 *     summary: Register staff
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterStaff'
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/internal/setup-staff', authController.registerStaff);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login to get access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', authController.login);

module.exports = router;