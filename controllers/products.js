const Product = require('../models/products')

const create = async (req, res, next) => {
  try {
    let data = req.data
    Product.new(data)
    await Product.save()
    return res.status(201).json({ status: 'ok', message: 'products has be created' })
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message })
  }
}

const get = async (req, res) => {
  try {
    let { id } = req.params
    let product = await Product.findOne({ id: id, status: 'active' })
    if (product) return res.json(product)
    res.status(20)
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message })
  }
}

const destroy = async (req, res) => {
  try {
    let { id } = req.params
    await Product.findOneAndDelete({ id })
    res.json({ status: 'ok', message: 'product has be deleted' })
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message })
  }
}

const all = async (req, res) => {
  try {
    let products = await Product.find({ status: 'active' })
    res.status(200).json(products)
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message })
  }
}

module.exports = {
  create,
  get,
  destroy,
  all
}
