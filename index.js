const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const PORT = process.env.PORT || 3000
const passport = require('passport')
const { strategy } = require('./lib')

passport.use(strategy)

const authentication = require('./controllers/auth')
const app = express()

app.use(bodyParser.json())
app.use(morgan('combined'))

app.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send(req.user)
})

app.get('/token', authentication.create)

app.listen(PORT, err => {
  if (err) {
    console.log(`error running server ${err.stack}`)
  }
  console.log(`server running in port ${PORT}`)
})
