const { generateToken, encrypt } = require('../lib/index')
const User = require('../models/user')
const Order = require('../models/orders')

const create = async (req, res) => {
  try {
    let data = req.body
    let { salt, secureText } = await encrypt(data.password)
    data.password = secureText
    data.salt = salt
    let validateUser = await User.findOne({ email: data.email })
    if (validateUser) return res.status(400).json({ error: true, message: 'user already in database' })
    let user = await User.create(data)
    if (user) {
      let token = await generateToken({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email })
      await Order.create({ userId: user.id, status: 'new' })
      return res.status(201).json({ token, status: 'ok', message: 'user has be created' })
    }
    res.status(400).json({ error: true })
  } catch (e) {
    res.status(500).json({ error: true, message: e.message })
  }
}

module.exports = {
  create
}
