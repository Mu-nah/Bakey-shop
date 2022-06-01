const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Product = require('../models/product') 
//const User = require('../model/user') 
const multer = require('multer')
//const upload = multer({dest: 'uploads/'});
//const  {signup, signin, addToCart} = require('../controllers/auth.controllers.js')
/*
const {verifyToken} = require('../middlewares/auth.js') 
const {authPage} = require('../middlewares/authA.js')*/ 
const stripeSecretKey = ''
const stripePublicKey =''





const Storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }  
  
});
  
 const upload = multer({storage: Storage}).single('image')
 
 
 
 
 router.get('/', (req, res) => {
   
   Product.find().sort({createdAt:-1})
  .then((result)=>{
res.render('store', {products: result, stripePublicKey: stripePublicKey})
  })
  .catch((err)=>{
    console.log(err)
  })
    })


 




 
router.post('/', upload, (req, res) => {
  const products = new Product({
  image: req.file.path,
  title: req.body.title,
  description: req.body.description,
  price: req.body.price,
  qty: req.body.qty
    });
  products.save()
  .then((result) => {
    res.redirect('/')
    console.log(JSON.stringify(req.file))
  })
  .catch((err)=> {
    console.log(err)
  })
})

router.get('/create', (req,res)=>{
  res.render('./admin/create', {title: 'addproduct'})
  
})


module.exports = router