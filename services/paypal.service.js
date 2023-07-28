const paypal = require('paypal-rest-sdk');
const validationRequest = require('../helpers/validationRequest');
const createPayment = async (req) => {
  
  validationRequest(req);
  const {amount, currency} = req.body;
  const payment = await new Promise((resolve, reject) => {
    const paymentData = {
      "intent": "sale",
      "payer": {
        "payment_method": "paypal"
      },
      "redirect_urls": {
        "return_url": process.env.PAYPAL_RETURN_URL,
        "cancel_url": process.env.PAYPAL_CANCEL_URL
      },
      "transactions": [{
        "amount": {
          "currency": currency,
          "total": amount
        },
      }]
    };
    
    paypal.payment.create(paymentData, (error, payment) => {
      if (error) {
        reject(error);
      } else {
        const approvalUrl = payment.links.find(
          (link) => link.rel === 'approval_url',
        ).href;
        resolve(approvalUrl);
      }
    });
  });
  return  payment;
};

const executePayment = async (paymentId, payerId) => {
  return new Promise((resolve, reject) => {
    const executePayment = {
      payer_id: payerId,
    };
    
    paypal.payment.execute(paymentId, executePayment, (error, payment) => {
      if (error) {
        reject(error);
      } else {
        resolve(payment);
      }
    });
  });
};

module.exports = {
  createPayment,
  executePayment,
};
