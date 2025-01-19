const mongoose = require('mongoose');
const Order = require('../models/sql/Order');
const OrderItem = require('../models/sql/OrderItem');
const Product = require('../models/mongo/Product');
const Cart = require('../models/mongo/Cart');
const placeOrder = async (req, res) => {
    try {
        const { cartItems, shippingAddress } = req.body;

        // Check if cartItems is provided and is an array
        if (!Array.isArray(cartItems) || cartItems.length === 0) {
            return res.status(400).json({ message: 'cartItems array is missing or empty' });
        }

        console.log('req.user.id ', req.user.id);
        console.log('cartItems ', req.body);

        // Calculate the total price by summing up the price * quantity of each item
        const totalPrice = cartItems.reduce((acc, item) => {
            if (item.price && item.quantity) {
                return acc + (item.price * item.quantity);
            }
            return acc;
        }, 0);

        if (totalPrice === 0) {
            return res.status(400).json({ message: 'Total price cannot be zero' });
        }

        // Create the order with the calculated totalPrice and shippingAddress
        const order = await Order.create({ 
            userId: req.user.id, 
            totalPrice, 
            shippingAddress 
        });

        // Prepare order items
        const orderItems = cartItems.map(item => ({ orderId: order.id, ...item }));

        // Bulk create order items
        await OrderItem.bulkCreate(orderItems);

        // Update product sales for each cart item
        for (const item of cartItems) {
            await Product.findByIdAndUpdate(
                item.productId, 
                { $inc: { sales: item.quantity } },
                { new: true }
            );
        }
        await Cart.deleteMany({ userId: req.user.id });
        // Send response
        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error placing order', error });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.findOne({ userId: req.user.id });
        res.json(orders);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};



module.exports = { placeOrder,getOrders };
