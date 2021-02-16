
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/routes')
const securedRoute = require('./routes/secure-route')
const db = require('./connection')
const passport = require('passport');
require('./auth/auth')

const app = express()
const port = 8080

app.use(cors())
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use('/', router)

// adding middleware to restrict access to some route only to user with token
app.use('/user', passport.authenticate('jwt', { session: false }), securedRoute);

db();

app.get('/', (req, res) => {
  res.send('Welcome to shop api!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

process.on('uncaughtException', err => {
  console.log(`Uncaught Exception: ${err.message}`)
  process.exit(1)
})