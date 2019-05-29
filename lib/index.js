const crypto = require('crypto')
const util = require('util')

const pbkdf2 = util.promisify(crypto.pbkdf2)

const encrypt = async (text, salt = null) => {
  if (!salt) {
    salt = crypto.randomBytes(20).toString('hex')
  }
  try {
    let secureText = await pbkdf2(text, 512, 512, 'sha512')
    return { salt, secureText }
  } catch (e) {
    return new Error(e.message)
  }
}

module.exports = {
  encrypt
}
