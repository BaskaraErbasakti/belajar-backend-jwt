const express = require("express")
const controller = require("../Controller/product")
const validate = require("../middleware/validate")
const admin = require("../middleware/admin")
const chache = require("../middleware/chace")
const upload = require("../middleware/upload")
const Route = express.Router()

Route.get("/", validate, chache, controller.all)
Route.post("/", admin, upload.single("images"), controller.add)
Route.put("/", admin, controller.edit)
Route.delete("/", admin, controller.delete)
Route.get("/search", controller.search)
Route.get("/:sort", controller.sort)

module.exports = Route