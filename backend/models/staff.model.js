const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const Staff = sequelize.define('Staff', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'user',
            key: 'id_user'
        }
    }
}, {
    tableName: 'staff'
});

module.exports = Staff;