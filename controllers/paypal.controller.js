// controllers/paymentController.js
const paymentService = require('../services/paypal.service');
const {CatchError} = require("../Errors");
/**
 * Create Payment
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const createPayment = async (req, res) => {
  console.log('Create Payment Controller -> Create Payment');
  try {
    const payment = await paymentService.createPayment(req);
    return res.send(payment);
  } catch (error) {
    console.log('error ------>', error)
    CatchError(error, res);
  }
};

/**
 * This url works when user opened page with return url and did payment
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const executePayment = async (req, res) => {
  console.log('Execute Payment Controller -> Execute Payment');
  try {
    const paymentId = req.query.paymentId;
    const payerId = req.query.PayerID;
    const payment = await paymentService.executePayment(paymentId, payerId);
    
    return res.send(payment);
  } catch (error) {
    CatchError(error, res);
    
  }
};

const cancelPayment = async (req, res) => {
  console.log('Cancel Payment Controller -> Cancel Payment');
  try {
    res.send("Payment Cancelled");
  } catch (error) {
    CatchError(error, res);
  }
}

module.exports = {
  createPayment,
  executePayment,
  cancelPayment
};
