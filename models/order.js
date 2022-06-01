 const mongoose = require("mongoose")
 
const orderSchema = mongoose.Schema({
  image: {
    data: Buffer,
    contentType: String
  },
  
  first_name: {
    type: String, 
    required: true},
    
  last_name: {
    type: String, 
    required: true},
    
  email: {
    type: String, 
    required: true, 
    unique: [true, 'Email has been used!'],
    lowercase: true,
  validator: function(v) {
   return /^[\s@]+@[^\s@]+\.[^\s@]+$/}
  },
  
  location: {
    type: String,
    required: true
  },
  contact: {
    type: Number,
    required: true
  },
  role: {
    type: String,
     enum: ['customer', 'admin'],
    //value: "admin"||"customer", 
    required: true
  },
  password: {
    type: String, 
    required: true},

created:{
  type: Date, 
  default: Date.now}, 
token: {
  type: String}, 

})

module.exports = mongoose.model('order', orderSchema);