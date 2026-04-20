const { Sequelize } = require('sequelize');
const sequelize = require('../configs/database');

const User = require('./user.model');
const Client = require('./client.model');
const Staff = require('./staff.model');
const Room = require('./room.model');
const Booking = require('./booking.model');

User.hasOne(Client, { foreignKey: 'id_user', onDelete: 'CASCADE' });
Client.belongsTo(User, { foreignKey: 'id_user' });

User.hasOne(Staff, { foreignKey: 'id_user', onDelete: 'CASCADE' });
Staff.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(Booking, { foreignKey: 'id_client', onDelete: 'CASCADE' });
Booking.belongsTo(Client, { foreignKey: 'id_client' });

Room.hasMany(Booking, { foreignKey: 'id_room', onDelete: 'RESTRICT' });
Booking.belongsTo(Room, { foreignKey: 'id_room', onDelete: 'RESTRICT' });

const db = {
    sequelize,
    Sequelize,
    User,
    Client,
    Staff,
    Room,
    Booking
};

module.exports = db;