const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const Client = sequelize.define('Client', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'user',
            key: 'id_user'
        }
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'client'
});

module.exports = Client;