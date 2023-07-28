// routers/paymentRouter.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paypal.controller');
const paymentValidator = require('../validations/payment.validator');

router.post('/payment', paymentValidator.createValidator ,paymentController.createPayment);
router.get('/execute', paymentController.executePayment);
router.get('/cancel', paymentController.cancelPayment);

module.exports = router;
