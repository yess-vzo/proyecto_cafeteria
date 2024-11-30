const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/', cartController.addItemToCart);

// Ruta para obtener el contenido del carrito y el total
router.get('/', cartController.getCart);

module.exports = router;
