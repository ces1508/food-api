const mongoose = require('mongoose')

const CarItemSchema = new mongoose.Schema({
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShoppingCart' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  description: String,
  createdAt: { type: Date, default: new Date() }
})

module.exports = mongoose.model('OrderItem', CarItemSchema)
