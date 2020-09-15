const express = require("express")
const product = require('./Routes/product')
const history = require('./Routes/history')
const users = require('./routes/users')
const auth = require("./routes/auth")
const Routes = express.Router()

Routes.use("/product", product)
Routes.use("/history", history)
Routes.use("/users", users)
Routes.use("/auth", auth)


module.exports = Routes