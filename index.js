require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan'); // For request logging
const cors = require('cors'); // For handling CORS
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reportRoutes = require('./routes/reportRoutes');

// Database connections
require('./config/database/sql');

require('./config/database/mongodb');

const app = express();

// Middlewares
app.use(cors());  // Enable CORS for cross-origin requests
app.use(morgan('dev'));  // Log requests in 'dev' format
app.use(bodyParser.json());  // Parse JSON request bodies

// Route Middleware
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reports', reportRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
