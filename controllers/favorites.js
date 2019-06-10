const Product = require('../models/products')
const Categoty = require('../models/categories')
const Favorite= require('../models/favorities')

const create = async (req, res, next) => {
  try {
    let data = req.data
    Favorite.new(data)
    await Favorite.save()
    return res.status(201).json({ status: 'ok', message: 'As añadido un producto a tus favorites' })
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message })
  }
}

const get = async (req, res) => {
  try {
    let { id } = req.params
    let Favorite = await Favorite.findOne({ id: id })
    if (Favorite) return res.json(Favorite)
    res.status(20)
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message })
  }
}

const destroy = async (req, res) => {
  try {
    let { id } = req.params
    await Favorite.findOneAndDelete({ id })
    res.json({ status: 'ok', message: 'favorite product has be deleted' })
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message })
  }
}

const all = async (req, res) => {
  try {
    let Favorite = await Favorite.find({ status: 'active' })
    res.status(200).json(Favorite)
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
