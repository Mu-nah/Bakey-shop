
const stripeSecretKey = ''
const stripePublicKey = ''

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const path = require('path')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const stripe = require('stripe')(stripeSecretKey)
const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')
const Product = require('./models/product') 
const Order = require('./models/order') 

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static('public'))
app.use(express.static('uploads'))
app.use(express.static(path.join(__dirname, "views")))
app.use('/uploads', express.static('uploads')) 

const dbURI=''

mongoose.connect(dbURI, {
  useNewUrlParser: true, useUnifiedTopology: true 
})
.then( app.listen(3000, ()=>{
  console.log('connected to db and running')}))
.catch((err) => console.log(err));

const API_SECRET = "am_just_trying"


app.post('/purchase', async (req, res) => {
  await Product.find()
  .then((data)=>{
    const itemsArray = data
       let total = 0
      req.body.items.forEach(function(item) {
        const itemJson = itemsArray.find(function(i) {
          return i.id == item.id
        })
        total = total + itemJson.price * item.quantity
      }) 

      stripe.charges.create({
        amount: total,
        source: req.body.stripeTokenId,
        currency: 'usd'
      }).then(function() {
        console.log('Charge Successful')
      //  res.json({ message: 'Successfully purchased items' })
       res.json({message:'okay' } )
      
      }).catch(function() {
        console.log('Charge Fail')
        res.status(500).end()
      })
  })
  .catch((err)=>{
  //  console.log(err)
    console.log('error o')
  })
  
})

app.use('/', productRoute)
app.use('/order', orderRoute)