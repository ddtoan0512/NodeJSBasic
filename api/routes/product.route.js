var express = require('express');

var controller = require('../controllers/product.controller');
var authMiddleware = require('../../middlewares/auth.middleware');

var router = express.Router();
router.get('/', controller.index);

router.post('/', controller.create);
module.exports = router;