require('dotenv').config()
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      ac = require('./controllers/authController'),
      pc = require('./controllers/productController'),
      app = express(),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;


//middleware
app.use(express.json())
app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: SESSION_SECRET
    })
)
massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('DB conncected')
    app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`))
})

//endpoints
//auth
app.post('/auth/register', ac.register)
app.post('/auth/login', ac.login)
app.post('/auth/logout', ac.logout)
app.get('/auth/user', ac.getUser)
//products
app.get('/api/cart/:id', pc.getCart)

