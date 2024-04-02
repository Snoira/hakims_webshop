const express = require('express');
const { urlencoded } = require('express');
const productsRouter = require('./routes/product.route.js')

const app = express()

app.use(urlencoded({ extended: true }))
app.use(express.json())


app.use('/products', productsRouter)

app.get('/', (req, res) => res.send('Hello World!'))


module.exports = app