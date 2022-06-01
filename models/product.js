const mongoose = require('mongoose')
const proSchema = new mongoose.Schema({
  
  image:{ type: String, required: false},
  title: {type: String, required: true},
  description: {type: String, required: true},
    price: {type: Number, required: true},
    qty : {type: Number, required: true},
}, {timestamps: true})


module.exports = mongoose.model('Product', proSchema);