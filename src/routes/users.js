const express = require("express")
const controller = require("../controller/users")
const Route = express.Router()

Route.get("/", controller.getAll)
Route.get("/name", controller.getByUser)
Route.get("/:id", controller.getById)
Route.post("/", controller.addUsers)
Route.delete("/rm/:id", controller.delUsers)

module.exports = Route