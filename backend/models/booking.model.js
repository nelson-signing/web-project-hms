const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const Booking = sequelize.define('Booking', {
    id_booking: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('confirmed', 'cancelled'),
        defaultValue: 'confirmed'
    }
}, {
    tableName: 'booking',
    underscored: true
});

module.exports = Booking;