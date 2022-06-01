const jwt = require('jsonwebtoken')
 const bcrypt = require('bcryptjs')
 const Product = require('../models/product')
 const Order = require('../models/order')



const API_SECRET = ""


exports.signup = async (req, res)=>{
  try{
    const{first_name,last_name,email,password,location,contact, role} = req.body
  if(!email&&password&&first_name&&last_name&&location&&contact){
    res.send('All input is required')
  }
  const oldUser = await Order.findOne({email})
  if(oldUser){
    res.send("User already exist. Please login")
    res.redirect('/login')
  }
  const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt) 
 const user = new Order({
   first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    location: req.body.location,
    contact: req.body.contact,
     role:  req.body.role,
    password:hashedPassword })
 const token = jwt.sign({user_id: user._id, role}, API_SECRET, {expiresIn:"3d"})
    user.token = token
    user.save();
    res.redirect('/')
  }
  catch(err){console.log(err)}
}

exports.signin = async (req, res, next)=>{
  
  try{
    const{email, password} = req.body;
    if(!email && password){
      res.send('All input is required')
    }
    const user = await Order.findOne({email})
    if(user&&(await bcrypt.compare(password, user.password))){
     const accessToken = jwt.sign({user_id: user._id, role: user.role}, API_SECRET, {expiresIn:"3d"})
    
// res.cookie('x-access-token', accessToken, {secure: false, httpOnly: true})
     
       
     //res.redirect('/product')
     //res.json(user.role)
     
    
}


   /*   if(user.role=="admin"){
        res.send('fine')
      }else{
        res.redirect('/product')
      }*/
    else{
    // res.send('Invalid Credentials')
    res.redirect('/order/register')
       
    }
   }
  catch(err){
    console.log(err)
  }
 
  } 
  

 
 
