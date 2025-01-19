const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    items: [
        {
            productId: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
    totalPrice: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

CartSchema.pre('save', function (next) {
    this.totalPrice = this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    next();
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
