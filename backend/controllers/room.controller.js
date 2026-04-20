const fs = require('fs');
const path = require('path');
const roomService = require('../services/room.service');

exports.getRooms = async (req, res, next) => {
    try {
        const rooms = await roomService.getAllRooms(req.query);
        res.status(200).json(rooms);
    } catch (error) {
        next(error);
    }
};

exports.addRoom = async (req, res, next) => {
    try {
        const roomData = { ...req.body };
        if (req.file) {
            roomData.image_url = `/uploads/rooms/${req.file.filename}`;
        }
        const newRoom = await roomService.createRoom(roomData);
        res.status(201).json({
            message: "Room added successfully",
            userId: newRoom.id_room
        });
    } catch (error) {
        next(error);
    }
};

exports.getRoomById = async (req, res, next) => {
    try {
        const room = await roomService.getRoomById(req.params.id);
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
};

exports.updateRoom = async (req, res, next) => {
    try {
        const updateData = { ...req.body };
        if (req.file) {
            updateData.image_url = `/uploads/rooms/${req.file.filename}`;
        }
        const updatedRoom = await roomService.updateRoom(req.params.id, updateData);
        res.status(200).json({
            message: "Room updated successfully",
            room: updatedRoom
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteRoom = async (req, res, next) => {
    try {
        await roomService.deleteRoom(req.params.id);
        res.status(200).json({ message: "Room  deleted successfully" });
    } catch (error) {
        next(error);
    }
};