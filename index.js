const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const paypalRouter = require('./routers/paypal.router')

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000

const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: process.env.PAYPAL_MODE, // 'sandbox' or 'live' depending on your environment
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_SECRET,
});


app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(bodyParser.json());
app.use('/paypal', paypalRouter);

app.listen(PORT, () => {
  console.log(`server started at port ${process.env.BASE_URL || 'localhost:3000'}`);
});