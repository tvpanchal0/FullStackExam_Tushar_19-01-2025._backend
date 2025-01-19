const express = require('express');
const { addToCart, getCart } = require('../controllers/CartController');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/',authenticate,addToCart);
router.get('/', authenticate,getCart);

module.exports = router;
