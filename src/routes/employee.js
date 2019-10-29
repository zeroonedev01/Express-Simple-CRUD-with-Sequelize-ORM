const express = require("express")
const Route = express.Router()
const ctrlEmployee = require("../controllers/employee")

Route.get("/", ctrlEmployee.findAll)
  .get("/:id", ctrlEmployee.findById)
  .post("/", ctrlEmployee.create)
  .patch("/:id", ctrlEmployee.update)
  .delete("/:id", ctrlEmployee.destroy)

module.exports = Route
