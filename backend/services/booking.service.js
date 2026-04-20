const { Op } = require('sequelize');
const { Booking, Room, Client, User } = require('../models');

exports.createBooking = async (bookingData) => {
    const { id_client, id_room, start_date, end_date } = bookingData;

    const room = await Room.findByPk(id_room);
    if (!room) {
        const error = new Error('Room not found');
        error.statusCode = 404;
        throw error;
    }

    const start = new Date(start_date);
    const end = new Date(end_date);

    if (end <= start) {
        const error = new Error('End date must be after start date');
        error.statusCode = 400;
        throw error;
    }

    const existingBooking = await Booking.findOne({
        where: {
            id_room: id_room,
            status: 'confirmed',
            [Op.and]: [
                { start_date: { [Op.lt]: end } },
                { end_date: { [Op.gt]: start } }
            ]
        }
    });

    if (existingBooking) {
        const error = new Error('Room is already booked for these dates');
        error.statusCode = 400;
        throw error;
    }

    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const total_price = diffDays * room.price_per_night;

    await room.update({ is_available: false });

    return await Booking.create({
        id_client,
        id_room,
        start_date,
        end_date,
        total_price,
        status: 'confirmed'
    });
};

exports.getAllBookings = async (queryParams) => {
    const { id_client, status, id_room, start_date } = queryParams;
    const whereConditions = {};

    if (id_client) whereConditions.id_client = id_client;
    if (status) whereConditions.status = status;
    if (id_room) whereConditions.id_room = id_room;
    if (start_date) whereConditions.start_date = { [Op.gte]: new Date(start_date) };

    return await Booking.findAll({
        where: whereConditions,
        include: [
            {
                model: Client,
                include: [{ model: User, attributes: ['first_name', 'last_name', 'email'] }]
            },
            { model: Room }
        ],
        order: [['start_date', 'DESC']]
    });
};

exports.getBookingById = async (id) => {
    return await Booking.findByPk(id, {
        include: [
            { model: Client, include: [User] },
            { model: Room }
        ]
    });
};

exports.cancelBooking = async (bookingId, clientId, userRole) => {
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
        const error = new Error('Booking not found');
        error.statusCode = 404;
        throw error;
    }

    if (userRole === 'client' && booking.id_client !== clientId) {
        const error = new Error('Unauthorized');
        error.statusCode = 403;
        throw error;
    }

    return await booking.update({ status: 'cancelled' });
};