const fs = require('fs');
const path = require('path');

const { Room } = require('../models');
const { Op } = require('sequelize');

exports.getAllRooms = async (filters) => {
    const { type, maxPrice, minPrice, is_available } = filters;
    const whereConditions = {};

    if (type) {
        whereConditions.type = type;
    }

    if (is_available !== undefined) {
        whereConditions.is_available = (is_available === 'true');
    }

    if (minPrice || maxPrice) {
        whereConditions.price_per_night = {};
        if (minPrice) whereConditions.price_per_night[Op.gte] = parseFloat(minPrice);
        if (maxPrice) whereConditions.price_per_night[Op.lte] = parseFloat(maxPrice);
    }

    return await Room.findAll({
        where: whereConditions,
        order: [['price_per_night', 'ASC']]
    });
};

exports.createRoom = async (roomData) => {
    return await Room.create(roomData);
};

exports.getRoomById = async (roomId) => {
    const room = await Room.findByPk(roomId);

    if (!room) throw new Error('Room not found');

    return room;
};

exports.updateRoom = async (roomId, roomData) => {
    const room = await Room.findByPk(roomId);
    if (!room) throw new Error('Room not found');

    return await room.update(roomData);
};

exports.deleteRoom = async (roomId) => {
    const room = await Room.findByPk(roomId);

    if (!room) {
        const error = new Error('Room not found');
        error.statusCode = 404;
        throw error;
    }

    const defaultImage = '/uploads/rooms/default.jpg';

    if (room.image_url && room.image_url !== defaultImage) {
        const filePath = path.join(__dirname, '../public', room.image_url);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }

    return await room.destroy();
};