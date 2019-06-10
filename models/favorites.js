const mongoose = require('mongoose')

const Favorites = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  PropuctId: { ype: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  status: { type: String, default: 'Active' },
  date: { type: Date }
})

module.exports = mongoose.model('Favorite', ShoppingCartSchema)
