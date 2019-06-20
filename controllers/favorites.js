const Product = require('../models/products')
const Favorite = require('../models/favorities')

const create = async (req, res, next) => {
  try {
    let data = req.data
    let product = await Product.findOne({ id: data.productId })
    if (!product) return res.status(400).json({ error: true, message: 'is not exist product' })
    await Favorite.create(data)
    res.status(201).json({ status: 'ok', message: 'As añadido un producto a tus favorites' })
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message })
  }
}

const get = async (req, res) => {
  try {
    let { id } = req.params
    let favorite = await Favorite.findOne({ id })
    /* populate --traer datas del producto */
    if (favorite) return res.json(favorite)
    res.status(20)
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message })
  }
}

const destroy = async (req, res) => {
  try {
    let { id } = req.params
    await Favorite.findOneAndDelete({ userId: req.user.id, id })
    res.json({ status: 'ok', message: 'favorite product has be deleted' })
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message })
  }
}

const all = async (req, res) => {
  try {
    let favorite = await Favorite.find({ userId: req.user.id, status: 'active' })
    res.status(200).json(favorite)
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
