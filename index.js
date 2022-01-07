require("dotenv").config();

const morganBody = require("morgan-body");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const port = process.env.PORT || 3001;
const stripe = require("stripe")(process.env.SECRET_KEY);

const router = express.Router();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

morganBody(app);

app.post("/create-payment-intent", async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1400,
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.post("/webhook", (req, res) => {
  res.send('{"response": "ok"}\n');
});

app.listen(port, function () {
  console.log("astripeapi running on port: " + port);
});

module.exports = app;
