const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const PORT = process.env.PORT || 3000
const passport = require('passport')
const { strategy } = require('./lib')
const moongose = require('mongoose')
const { create } = require('./controllers/user')

moongose.connect('mongodb://localhost:27017/foods', { useNewUrlParser: true },err => {
  if(err){
    console.log(err.stack)
    return process.exit(0)
  }
  console.log('database conected')
} )

passport.use(strategy)

const authentication = require('./controllers/auth')
const app = express()

app.use(bodyParser.json())
app.use(morgan('combined'))

app.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send(req.user)
})

app.post('/user', create )

app.get('/token', authentication.create)

app.listen(PORT, err => {
  if (err) {
    console.log(`error running server ${err.stack}`)
  }
  console.log(`server running in port ${PORT}`)
})
