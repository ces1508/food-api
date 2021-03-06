const mongoose = require('mongoose')

const ShoppingCartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, default: 'new' }
})

module.exports = mongoose.model('Order', ShoppingCartSchema)
