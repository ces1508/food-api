const User = require('../models/user')
const { encrypt } = require('../lib')

const create = async (req, res) => {
  try {
    let user = req.body
    let { salt, secureText } = await encrypt(user.password)
    user.password = secureText
    user.salt = salt
    await User.create(user)
    res.status(201).json({ status: 'ok', message: 'user has be created' })
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
