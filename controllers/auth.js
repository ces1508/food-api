const { generateToken } = require('../lib/index')

const create = async (req, res) => {
  let payload = {
    id: 1,
    name: 'christian segura',
    isAdmin: false
  }
  let token = await generateToken(payload)
  res.status(201).json({ token })
}

module.exports = {
  create
}
