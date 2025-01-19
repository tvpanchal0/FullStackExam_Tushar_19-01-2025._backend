const express = require('express');
const { dailyRevenue, salesByCategory } = require('../controllers/ReportController');
const router = express.Router();

router.get('/daily-revenue', dailyRevenue);
router.get('/sales-by-category', salesByCategory);

module.exports = router;
