const OrderItem = require('../models/orderItems')
const Order = require('../models/orders')
const Product = require('../models/products')

const add = async (req, res) => {
  try {
    let user = req.user
    let { productId, quantity, desciption } = req.body
    let order = await Order.findOne({ userId: user.id, status: 'new' })
    let product = await Product.findById(productId)
    if (!product) return res.status(404).json({ error: true, message: 'cant not load user' })
    let item = OrderItem.new({ productId, quantity, desciption, orderId: order.id })
    await item.save()
    res.status(201).json({ status: 'ok', message: 'item added' })
  } catch (e) {
    res.status(500).json({ error: true, message: e.message })
  }
}

const remove = async (req, res) => {
  try {
    let user = req.user
    let { id } = req.params
    let item = OrderItem.findById(id).populate('Order')
    if (item.order.userId === user.id) {
      await item.remove()
      return res.json({ status: 'ok', message: 'item has be removed' })
    }
    res.status(403).json({ error: true, message: 'unAuthorizade' })
  } catch (e) {
    res.status(500).json({ error: true, message: e.messag
  }
}

module.exports = {
  add,
  remove
}
