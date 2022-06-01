const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Order = require('../models/order') 
//const verifyAdmin = require('../middlewares/authA.js')
const  {signup, signin} = require('../controllers/auth.controllers.js')


router.get('/', (req, res) => {
  res.render()
})
  
  
router.get('/register', async (req, res) => {
res.render('order.ejs',{title: "register"})
})

router.post('/register', signup, (req, res) => {
  
})

router.post('/login', signin, (req, res) => {
  res.send('okay')
})

router.get('/login', (req, res) => {
    res.render('./user/signIn.ejs',{title: "cakelaw"})
})

router.get('/admin',  (req, res) =>{
    res.render('./user/signIn.ejs',{title: "cakelaw"})
})

router.post('/admin', signin,  (req, res, next) =>{
  
})




module.exports = router