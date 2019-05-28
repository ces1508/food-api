const Category = require('../models/categories')
const Product = require('../models/products')

const create = async (req, res) => {
  try {
    let data = req.body
    let category = Category.new(data)
    await category.save()
    res.status(201).json({ status: 'ok', message: 'category has be created' })
  } catch (e) {
    res.status(500).json({ error: true, message: e.message })
  }
}

const update = async (req, res) => {
  try {
    let { id } = req.params
    let data = req.body
    let category = await Category.findOne({ id })
    if (!category) {
      return res.status(404).json({ error: true, message: 'can not get category' })
    }
    category.update(data)
    await category.save()
  } catch (e) {
    res.status(500).json({ error: true, message: e.message })
  }
}

const destroy = async (req, res) => {
  try {
    let { id } = req.params
    await Category.findOneAndDelete({ id })
    let products = await Product.find({ categoryId: id })
    if (products.length > 0) {
      await products.delete()
    }
  } catch (e) {
    res.status(500).json({ error: true, message: e.message })
  }
}

module.exports = {
  create,
  update,
  destroy
}
