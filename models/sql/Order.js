const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database/sql');
const User = require('./User');

const Order = sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
    totalPrice: { type: DataTypes.FLOAT, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'Pending' },
}, {
    tableName: 'orders',
    timestamps: false, // Disable automatic timestamps
});

module.exports = Order;
