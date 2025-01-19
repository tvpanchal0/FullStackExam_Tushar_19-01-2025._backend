const sequelize = require('../config/database/sql');
const Product = require('../models/mongo/Product');

const dailyRevenue = async (req, res) => {
    try {
        // Query to get daily revenue for the last 7 days
        const revenue = await sequelize.query(
            `SELECT DATE(created_at) as date, SUM(totalPrice) as revenue 
            FROM orders 
            GROUP BY DATE(created_at) 
            ORDER BY date DESC 
            LIMIT 7`,
            { type: sequelize.QueryTypes.SELECT }
        );
        
        // Return the result as a JSON response
        res.json(revenue);
    } catch (error) {
        // Return an error response if something goes wrong
        console.error(error); // Logging error for debugging purposes
        res.status(500).json({ message: 'Error fetching reports', error: error.message });
    }
};

const salesByCategory = async (req, res) => {
    try {
        const sales = await Product.aggregate([
            { $group: { _id: '$category', totalSales: { $sum: '$sales' } } }
        ]);
        res.json(sales);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sales data', error });
    }
};


module.exports = { dailyRevenue, salesByCategory };
