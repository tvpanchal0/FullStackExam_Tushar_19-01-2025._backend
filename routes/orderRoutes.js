const express = require('express');
const { placeOrder } = require('../controllers/OrderController');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/',authenticate, placeOrder);

module.exports = router;
