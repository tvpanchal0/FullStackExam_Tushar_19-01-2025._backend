const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database/sql');
const Order = require('./Order');

const OrderItem = sequelize.define('OrderItem', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    orderId: { type: DataTypes.INTEGER, references: { model: Order, key: 'id' } },
    productId: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
});

module.exports = OrderItem;
