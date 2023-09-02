const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const routes = require("./Routes/Router")



const server = express()

server.use(express.json())
server.use(morgan('dev'))
server.use(cors())
server.use("/", routes)

module.exports = server