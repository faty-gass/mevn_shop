
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes')
const db = require('./connection')

const app = express()
const port = 8080

app.use(cors())
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use('/api', router)

db();

app.get('/', (req, res) => {
  res.send('Welcome to shop api!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})