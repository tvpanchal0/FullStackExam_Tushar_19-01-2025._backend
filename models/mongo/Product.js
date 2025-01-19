const mongoose = require ('mongoose');
const {Schema} = mongoose;

const ProductSchema = new Schema (
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    sales: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model ('Product', ProductSchema);

module.exports = Product;
