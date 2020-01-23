require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATATBASE_URL, { useNewUrlParser: true, useUnifiedTopology: true } )

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('error', () => console.error('CONNECTED to Database'))

app.use(express.json()) // server to accept json as body as opposed to a GET, POST element

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)
// localhost:3000/subscribers/

app.listen(3000, () => console.log('Server Started'))

