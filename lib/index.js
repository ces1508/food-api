const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const util = require('util')
const JWT_SECRET = process.env.JWT_SECRET || '123456ABC'
const pbkdf2 = util.promisify(crypto.pbkdf2)
const passportJwt = require('passport-jwt')

const { ExtractJwt, Strategy } = passportJwt
let opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = JWT_SECRET
opts.ignoreExpiration = false

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

const strategy = new Strategy(opts, (payload, done) => {
  console.log(payload)
  if (payload.data.id === 1) {
    return done(null, { id: 1, name: 'christan' })
  }
  done(new Error('UnAuthorizade'), null)
})

const generateToken = payload => {
  let token = jwt.sign({
    data: payload
  }, JWT_SECRET, {
    expiresIn: '5m',
    audience: 'app',
    issuer: 'auth.example'
  })
  return token
}

module.exports = {
  encrypt,
  generateToken,
  strategy
}
