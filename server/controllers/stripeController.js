stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

module.exports = {
    makePayment: (req, res, next)=> {
        //convert amount to pennies
        const amountArray = req.body.amount.toString().split('');
        const pennies = [];
        for (var i = 0; i < amountArray.length; i++) {
          if(amountArray[i] === ".") {
            if (typeof amountArray[i + 1] === "string") {
              pennies.push(amountArray[i + 1]);
            } else {
              pennies.push("0");
            }
            if (typeof amountArray[i + 2] === "string") {
              pennies.push(amountArray[i + 2]);
            } else {
              pennies.push("0");
            }
              break;
          } else {
              pennies.push(amountArray[i])
          }
        }
        const convertedAmt = parseInt(pennies.join(''));
        console.log(convertedAmt)
        const charge = stripe.charges.create({
        amount: convertedAmt, // amount in cents, again
        currency: 'usd',
        source: req.body.token.id,
        description: 'Test charge from react app'
      }, function(err, charge) {
          console.log(req.session.user)
          if (err) return res.sendStatus(500)
          console.log(charge)
            const {customer_order_id, customer_id} = req.body
            const db = req.app.get('db')
            db.cart.cart_paid(customer_order_id, customer_id).then(cart => {
                req.session.user.customer_order_id = cart[0].customer_order_id
                console.log(req.session.user)
                res.status(200).send(req.session.user)
            })
            .catch(err => res.sendStatus(500))
        // if (err && err.type === 'StripeCardError') {
        //   // The card has been declined
        // }
      });
      }
    }