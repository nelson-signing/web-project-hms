const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/booking.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware);

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a booking (client or staff)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/BookingClient'
 *               - $ref: '#/components/schemas/BookingStaff'
 *     responses:
 *       201:
 *         description: Booking created
 */
router.post('/', bookingController.createBooking);

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get all bookings (user or staff)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bookings
 */
router.get('/', bookingController.getBookings);

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     summary: Get booking by ID
 *     tags: [Bookings]
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
 *         description: Booking found
 */
router.get('/:id', bookingController.getBookingById);

/**
 * @swagger
 * /api/bookings/{id}/cancel:
 *   patch:
 *     summary: Cancel a booking
 *     tags: [Bookings]
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
 *         description: Booking cancelled
 */
router.patch('/:id/cancel', bookingController.cancelBooking);

module.exports = router;