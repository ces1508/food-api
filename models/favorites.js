const mongoose = require('mongoose')

const Favorites = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ProductId: { ype: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  status: { type: String, default: 'active' },
  date: { type: Date, default: new Date() }
})

module.exports = mongoose.model('Favorite', Favorites)
