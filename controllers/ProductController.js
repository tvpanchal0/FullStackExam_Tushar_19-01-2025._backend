const Product = require('../models/mongo/Product');

// List products with pagination
const listProducts = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query; // Set default values for page and limit
        const skip = (page - 1) * limit;

        // Fetch products with pagination
        const products = await Product.find()
            .skip(skip)
            .limit(limit)
            .exec();

        const totalProducts = await Product.countDocuments(); // Get the total number of products

        res.json({
            products,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, description, category, price, stock, image } = req.body;

        // Validate required fields
        if (!name || !category || !price || !stock) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create the product
        const product = new Product({
            name,
            description,
            category,
            price,
            stock,
            image,
        });

        await product.save();

        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating product', error });
    }
};

module.exports = { listProducts, createProduct };
