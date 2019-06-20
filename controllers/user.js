/*
const User = require('../models/user')
const Order = require('../models/orders')
const { encrypt } = require('../lib')

const create = async (req, res) => {
  try {
    let user = req.body
    let { salt, secureText } = await encrypt(user.password)
    user.password = secureText
    user.salt = salt
    
    await User.create(user)
    await Order.create({ userId: user.id  })
    res.status(201).json({ status: 'ok', message: 'user has be created' })
  } catch (e) {
    res.status(500).json({ error: true, message: e.message })
  }
}
*/
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

const updatePassword = async (req, res) => {
  let currentUser = req.user
  let { currentPassword, newPassword } = req.body
  try {
    let user = await User.findOne({ email: currentUser.email })
    let isValid = await user.validatePassword(currentPassword)
    if (isValid) {
      let { salt, secureText } = await encrypt(newPassword)
      user.password = secureText
      user.salt = salt
      await user.save()
      return res.json({ status: 'ok', message: 'the password has be changed' })
    }
    res.status(403).json({ error: true, message: 'UnAuthorizade' })
  } catch (e) {
    res.status(500).json({ error: true, message: e.message })
  }
}

module.exports = {
  create,
  updatePassword
}
