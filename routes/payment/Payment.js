const express = require('express');
const router = express.Router();
const Stripe = require('stripe');

// router endpoints
// router.post('/intents', async (req, res) => {
//   try {
//     // create a PaymentIntent
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: req.body.amount, // Integer, usd -> pennies, eur -> cents
//       currency: 'usd',
//       payment_method_types: ['card'],
//     });
//     // Return the secret
//     res.json({ paymentIntent: paymentIntent.client_secret });
//   } catch (e) {
//     res.status(400).json({
//       error: e.message,
//     });
//   }
// });

router.post('/pay', async (req, res) => {
  const stripe = new Stripe('sk_test_51OJWPDSEbk55e6mZY62chpzR9YxAVe2iOyq039apKIIzS8wUD0K51ZJZD51bsJfch2TVq5e9ao0GBiUuNM108KLE00qgfQli9u');

  const { email } = req.body; // Extract email from the request body
  const customer = await stripe.customers.create({ email }); // Create the customer
  const customers = await stripe.customers.list();
  if (!customers.data[0]) {
    res.status(400).json({
      error: 'No customer found',
    });
  }
  const customerID = customers.data[0].id;
  const emphemeralKey = await stripe.ephemeralKeys.create(
    { customer: customerID },
    { apiVersion: '2023-10-16' }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount * 100,
    currency: 'usd',
    customer: customerID,
  });
  res.json({
    customer: customerID,
    ephemeralKey: emphemeralKey.secret,
    paymentIntent: paymentIntent.client_secret,
  });
})

module.exports = router;