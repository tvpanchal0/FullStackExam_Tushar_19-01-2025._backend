const Cart = require('../models/mongo/Cart');

// Add item to cart
const addToCart = async (req, res) => {
    try {
        // Validate if all required fields are in the request body
        const { productId, name, price, quantity } = req.body;
        if (!productId || !name || !price || !quantity) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        console.log('req.user.id ',req.user )
        // Add the item to the cart
        const cart = await Cart.findOneAndUpdate(
            { userId: req.user.id },
            { $push: { items: { productId, name, price, quantity } } },
            { upsert: true, new: true }
        );

        // Recalculate total price after adding the item
        cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        await cart.save();

        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding to cart', error });
    }
};

// Get user's cart
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        res.json(cart || { items: [], totalPrice: 0 });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching cart', error });
    }
};

module.exports = { addToCart, getCart };
