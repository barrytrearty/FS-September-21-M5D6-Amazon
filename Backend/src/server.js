import express from "express"
import productsRouter from "./data/products.js"
const server = express()

const port = 3001


const loggerMiddleware = (req, res, next) => {
    console.log(`Request method ${req.method} -- Request URL ${req.url}`)
    next()
  }
  server.use(loggerMiddleware)
  server.use(productsRouter)
server.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
  