require('dotenv').config()
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      stripe = require('stripe')()
      ac = require('./controllers/authController'),
      pc = require('./controllers/productController'),
      adminc = require('./controllers/adminController'),
      app = express(),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, STRIPE_PUBLISHABLE_KEY} = process.env;


//middleware
app.use(express.json())
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: SESSION_SECRET
    })
)
massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('DB conncected')
    app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`))
})

app.post('/api/payment', function(req, res, next){
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
  
    const charge = stripe.charges.create({
    amount: convertedAmt, // amount in cents, again
    currency: 'usd',
    source: req.body.token.id,
    description: 'Test charge from react app'
  }, function(err, charge) {
      if (err) return res.sendStatus(500)
      return res.sendStatus(200);
    // if (err && err.type === 'StripeCardError') {
    //   // The card has been declined
    // }
  });
  });

//endpoints
//auth
app.post('/auth/register', ac.register)
app.post('/auth/login', ac.login)
app.post('/auth/logout', ac.logout)
// app.get('/auth/user', ac.getUser)
//products
app.get('/api/cart/:id', pc.getCart)
app.post('/api/cart', pc.addToCart)
app.get('/api/products', pc.getProducts)
app.delete('/api/cart/:id', pc.removeItem)
app.get('/api/product/:id', pc.getProduct)
//admin
app.post('/auth/adminregister', adminc.registerAdmin)
app.post('/auth/adminlogin', adminc.loginAdmin)
app.post('/auth/adminlogout', adminc.logoutAdmin)
app.get('/auth/admin', adminc.getAdmin)


