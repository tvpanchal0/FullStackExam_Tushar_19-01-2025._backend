const express = require('express');
const { listProducts, createProduct } = require('../controllers/ProductController');
const router = express.Router();

router.get('/', listProducts);
router.post('/', createProduct);

module.exports = router;
