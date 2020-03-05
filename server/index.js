require('dotenv').config()
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      ac = require('./controllers/authController'),
      pc = require('./controllers/productController'),
      adminc = require('./controllers/adminController'),
      sc = require('./controllers/stripeController'),
      app = express(),
      path = require('path'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;


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
    })
    
    
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
    app.delete('/api/product/:id', pc.soldItem)
    app.post('/api/product', pc.addProperty)
    app.put('/api/product/:id', pc.editProperty)
    //admin
    app.post('/auth/adminregister', adminc.registerAdmin)
    app.post('/auth/adminlogin', adminc.loginAdmin)
    app.post('/auth/adminlogout', adminc.logoutAdmin)
    app.get('/auth/admin', adminc.getAdmin)
    // stripe
    app.post('/api/payment', sc.makePayment)
    
    app.use(express.static(__dirname + '/../build'))
    app.get('*', (req,res)=> {
        res.sendFile(path.join(__dirname, '../build/index.html'))
    })
    
    app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`))