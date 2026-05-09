const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const Room = sequelize.define('Room', {
    id_room: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    type: {
        type: DataTypes.ENUM('single', 'double', 'suite', 'deluxe', 'family'),
        allowNull: false
    },
    price_per_night: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '/uploads/rooms/default.jpg'
    }
}, {
    tableName: 'room'
});

module.exports = Room;