require('dotenv/config')
const express = require('express')
const corss = require('cors')
const server = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require("./src/main")
const database = require("./src/config/database")
const redis = require('./src/config/redis')

const port = 9000

server.use(corss())
server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())
server.use(morgan("dev"))

server.use(routes)

database
    .connect()
    .then((result) => {
        console.log("Database connected")
    })
    .catch((err) => {
        console.log("Database not connected")
    })

redis.redisChek()
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })

server.listen(port, () => {
    console.log(`Service running on port ${port}`)
})

