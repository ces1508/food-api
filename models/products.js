const mongoose = require('mongoose')
const Product = new mongoose.Schema('Product', {
  name: String,
  price: Number,
  pictures: Array
})

module.exports = mongoose.model('Product', Product)
