const express = require('express');
const router = express.Router();

const roomController = require('../controllers/room.controller');
const upload = require('../middlewares/upload.middleware')
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: Create a room (staff only)
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       201:
 *         description: Room created
 */
router.post('/', authMiddleware, roleMiddleware('staff'), upload.single('image'),roomController.addRoom);

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Get all rooms with optional filters
 *     tags: [Rooms]
 *     parameters:
 *       - in: query
 *         name: type
 *         required: false
 *         schema:
 *           type: string
 *           example: double
 *         description: Filter rooms by type
 *
 *       - in: query
 *         name: minPrice
 *         required: false
 *         schema:
 *           type: number
 *           example: 100
 *         description: Minimum price per night
 *
 *       - in: query
 *         name: maxPrice
 *         required: false
 *         schema:
 *           type: number
 *           example: 300
 *         description: Maximum price per night
 *
 *       - in: query
 *         name: is_available
 *         required: false
 *         schema:
 *           type: boolean
 *           example: true
 *         description: Filter available rooms
 *
 *     responses:
 *       200:
 *         description: List of rooms
 */
router.get('/', roomController.getRooms);

/**
 * @swagger
 * /api/rooms/{id}:
 *   get:
 *     summary: Get room by ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Room found
 */
router.get('/:id', roomController.getRoomById);

/**
 * @swagger
 * /api/rooms/{id}:
 *   put:
 *     summary: Update a room (staff only)
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       200:
 *         description: Room updated
 */
router.put('/:id', authMiddleware, roleMiddleware('staff'), upload.single('image'),roomController.updateRoom);

/**
 * @swagger
 * /api/rooms/{id}:
 *   delete:
 *     summary: Delete a room (staff only)
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Room deleted
 */
router.delete('/:id', authMiddleware, roleMiddleware('staff'), roomController.deleteRoom);

module.exports = router;