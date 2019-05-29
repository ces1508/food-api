const mongoose = require('mongoose')

const CarItemSchema = mongoose.Schema({
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShoppingCart' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  description: String
})

module.exports = mongoose.model('CarItem', CarItemSchema)
