const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const PORT = process.env.PORT

const app = express()

app.use(bodyParser.json())
app.use(morgan('combined'))

app.get('/', (req, res) => {
  res.send('send ')
})

app.listen(PORT, err => {
  if (err) {
    console.log(`error running server ${err.stack}`)
  }
  console.log(`server running in port ${PORT}`)
})
