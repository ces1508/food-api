const mongoose = require('mongoose')
const { encrypt } = require('../lib')

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  address: String,
  phoneNumber: String,
  password: String,
  createdAt: { type: String, default: new Date() },
  updatedAt: { type: String, default: new Date() }
})

UserSchema.methods.validatePassword = async unsecurePassword => {
  let { salt, password } = this
  let securePassword = await encrypt(salt, unsecurePassword)
  if (securePassword === password) {
    return true
  }
  return false
}

UserSchema.pre('save', next => {
  this.updatedAt = new Date()
  next()
})

module.exports = mongoose.model('User', UserSchema)
