const bookingService = require('../services/booking.service');

exports.createBooking = async (req, res, next) => {
    try {
        let id_client;
        if (req.user.role === 'client') {
            id_client = req.user.id_user;
        } else if (req.user.role === 'staff') {
            id_client = req.body.id_client;
            if (!id_client) {
                const error = new Error("Staff must provide a valid Client ID");
                error.statusCode = 400;
                return next(error);
            }
        }
        const newBooking = await bookingService.createBooking({
            ...req.body,
            id_client: id_client
        });
        res.status(201).json(newBooking);
    } catch (error) {
        next(error);
    }
};

exports.getBookings = async (req, res, next) => {
    try {
        let filters;
        if (req.user.role === 'staff') {
            filters = req.query;
        } else {
            filters = { id_client: req.user.id_user };
        }
        const bookings = await bookingService.getAllBookings(filters);
        res.status(200).json(bookings);
    } catch (error) {
        next(error);
    }
};

exports.getBookingById = async (req, res, next) => {
    try {
        const booking = await bookingService.getBookingById(req.params.id);
        if (!booking) {
            const error = new Error("Booking not found");
            error.statusCode = 404;
            return next(error);
        }
        if (req.user.role === 'client' && booking.id_client !== req.user.id_user) {
            const error = new Error("Access denied");
            error.statusCode = 403;
            return next(error);
        }
        res.status(200).json(booking);
    } catch (error) {
        next(error);
    }
};

exports.cancelBooking = async (req, res, next) => {
    try {
        const cancelledBooking = await bookingService.cancelBooking(
            req.params.id,
            req.user.id_user,
            req.user.role
        );
        res.status(200).json({
            message: `Booking has been successfully canceled.`
        });
    } catch (error) {
        next(error);
    }
};