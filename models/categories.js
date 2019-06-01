const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
  name: String,
  icon: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
})

export default mongoose.model('Category', CategorySchema)
