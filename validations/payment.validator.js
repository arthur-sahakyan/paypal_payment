const {check} = require("express-validator");


module.exports = {
  createValidator: [
    check('amount').notEmpty().withMessage('Amount is required.').isFloat({min: 0.01}).withMessage('Amount must be a positive number.'),
    check('currency').notEmpty().withMessage('Currency is required.').isIn(['USD']).withMessage('Invalid currency. Only USD is allowed.'),
  ]
};